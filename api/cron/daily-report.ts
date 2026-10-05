/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http'

const DEFAULT_SUPABASE_URL = 'https://rrbvtgqhzqqzzkwphpqd.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_0nUgFj3g_kBj-tgxPVFmeQ_lEq0y53A'

const RECIPIENT_PRIMARY = 'darwinscerca@gmail.com'
const RECIPIENT_CC = 'qr4luv@gmail.com'

function getQueryParam(url: string | undefined, param: string): string | null {
  if (!url) return null
  const parsed = new URL(url, 'https://scanqrglobal.ai')
  return parsed.searchParams.get(param)
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // CORS for test calls from dashboard
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end('ok')
    return
  }

  // Verify Cron Secret if configured in Vercel environment, with bypass for ?test=true
  const isTest = getQueryParam(req.url, 'test') === 'true'
  const cronSecret = process.env.CRON_SECRET
  const authHeader = req.headers['authorization']

  if (cronSecret && !isTest) {
    if (authHeader !== `Bearer ${cronSecret}`) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Unauthorized: Invalid Cron Secret' }))
      return
    }
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

  try {
    // Invoke the deployed Supabase Edge Function which has Resend API key baked into its backend vault
    const edgeRes = await fetch(`${supabaseUrl}/functions/v1/send-daily-telemetry-report`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await edgeRes.json()
    res.statusCode = edgeRes.status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  } catch (err: any) {
    console.error('[daily-report] Error dispatching edge report:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: false, error: err?.message || 'Failed to dispatch report' }))
  }
}
