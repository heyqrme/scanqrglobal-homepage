-- ==============================================================================
-- SCANQR GLOBAL: TELEMETRY & TRAFFIC EVENT SCHEMA
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/rrbvtgqhzqqzzkwphpqd/sql)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.sqg_telemetry_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,         -- 'page_view', 'route_cerca', 'host_dossier_open', 'classified_click', etc.
    path TEXT,                        -- URL path visited (e.g. '/', '/#classifieds')
    city TEXT,                        -- Geolocation city identified via Vercel Edge
    country TEXT,                     -- Geolocation country (e.g. 'US', 'TH', 'BR', 'CO')
    campaign_ref TEXT DEFAULT 'direct',-- UTM or referral parameter (e.g. 'tiktok', 'qr', 'instagram')
    referrer TEXT,                    -- Referring URL
    ip_hash TEXT,                     -- Anonymized SHA-256 slice for unique visitor counts
    user_agent TEXT,                  -- Client browser user agent
    metadata JSONB DEFAULT '{}'::jsonb,-- Any custom context (action, item ID, host ID)
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexing for fast 24h rolling report queries
CREATE INDEX IF NOT EXISTS idx_sqg_telemetry_created_at ON public.sqg_telemetry_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sqg_telemetry_event_type ON public.sqg_telemetry_events (event_type);

-- Enable Row Level Security (RLS)
ALTER TABLE public.sqg_telemetry_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from scanqrglobal.ai via anon key
DROP POLICY IF EXISTS "Allow anonymous telemetry inserts" ON public.sqg_telemetry_events;
CREATE POLICY "Allow anonymous telemetry inserts"
    ON public.sqg_telemetry_events
    FOR INSERT
    WITH CHECK (true);

-- Allow reads for telemetry reports (cron job)
DROP POLICY IF EXISTS "Allow public read for daily reporting" ON public.sqg_telemetry_events;
CREATE POLICY "Allow public read for daily reporting"
    ON public.sqg_telemetry_events
    FOR SELECT
    USING (true);
