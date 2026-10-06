/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http'
import { createHash } from 'crypto'

const DEFAULT_SUPABASE_URL = 'https://rrbvtgqhzqqzzkwphpqd.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_0nUgFj3g_kBj-tgxPVFmeQ_lEq0y53A'

function getHeader(req: IncomingMessage, name: string): string {
  const val = req.headers[name.toLowerCase()]
  if (Array.isArray(val)) return val[0] || ''
  return val || ''
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // CORS & Preflight
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end('ok')
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    return
  }

  // Parse Body
  let body: any = {}
  try {
    const buffers: Buffer[] = []
    for await (const chunk of req) {
      buffers.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    }
    const raw = Buffer.concat(buffers).toString('utf8')
    if (raw) {
      body = JSON.parse(raw)
    }
  } catch (err) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid JSON body' }))
    return
  }

  const eventType = body.event_type || body.event || 'page_view'
  const path = body.path || '/'
  const referrer = body.referrer || ''
  const campaignRef = body.campaign_ref || 'direct'
  const metadata = body.metadata || {}

  // Geo headers provided automatically by Vercel Edge network
  const vercelCity = getHeader(req, 'x-vercel-ip-city')
  const vercelCountry = getHeader(req, 'x-vercel-ip-country')
  const clientIp = getHeader(req, 'x-forwarded-for')?.split(',')[0]?.trim() || ''

  // Anonymized hash for unique visitor metrics without storing raw PII
  const ipHash = clientIp ? createHash('sha256').update(clientIp + 'sqg_salt').digest('hex').substring(0, 16) : null

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

  const record = {
    event_type: eventType,
    path,
    referrer,
    campaign_ref: campaignRef,
    city: vercelCity ? decodeURIComponent(vercelCity) : (body.city || null),
    country: vercelCountry || body.country || null,
    ip_hash: ipHash,
    user_agent: getHeader(req, 'user-agent') || null,
    metadata,
    created_at: new Date().toISOString(),
  }

  try {
    const dbRes = await fetch(`${supabaseUrl}/rest/v1/sqg_telemetry_events`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(record),
    })

    if (!dbRes.ok) {
      const errTxt = await dbRes.text()
      console.warn('[sqg_telemetry] Supabase insert note:', dbRes.status, errTxt)
    }
  } catch (err: any) {
    console.warn('[sqg_telemetry] Ingest caught error (non-fatal):', err?.message || err)
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: true, timestamp: record.created_at }))
}
