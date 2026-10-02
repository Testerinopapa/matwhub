-- ==============================================================================
-- MATW ONE TEAM HUB - LOVABLE CLOUD SUPABASE RELATIONAL SCHEMA
-- Migration: 20261001_initial_schema.sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE user_role_enum AS ENUM ('EMPLOYEE', 'CONTENT_EDITOR', 'ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE post_type_enum AS ENUM ('social', 'news', 'announcement', 'leadership', 'impact_story', 'recognition');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE rsvp_status_enum AS ENUM ('going', 'maybe', 'declined');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES / USERS
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role user_role_enum DEFAULT 'EMPLOYEE',
  title TEXT,
  department TEXT,
  country TEXT DEFAULT 'Australia',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. POSTS / CONTENT ENGINE (UNIFIED CONTENT MODEL)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type post_type_enum DEFAULT 'social',
  title TEXT,
  body TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  category TEXT DEFAULT 'general',
  audience TEXT DEFAULT 'all',
  featured BOOLEAN DEFAULT FALSE,
  pinned BOOLEAN DEFAULT FALSE,
  poll_data JSONB, -- { question: text, options: [{ id: text, label: text, votes: number }], user_voted_option_id: text }
  recognition_details JSONB, -- { recipient_id: text, badge_title: text, achievement: text }
  reactions_summary JSONB DEFAULT '{"heart": 0, "clap": 0, "prayer": 0, "fire": 0}'::JSONB,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. POST REACTIONS
CREATE TABLE IF NOT EXISTS public.post_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('heart', 'clap', 'prayer', 'fire')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- 6. POST COMMENTS
CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EVENTS & TOWN HALLS
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('virtual', 'in-person', 'hybrid')),
  location_name TEXT NOT NULL,
  meeting_url TEXT,
  category TEXT NOT NULL DEFAULT 'Town Hall',
  featured BOOLEAN DEFAULT FALSE,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rsvp_going_count INTEGER DEFAULT 0,
  rsvp_maybe_count INTEGER DEFAULT 0,
  rsvp_declined_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EVENT RSVPS
CREATE TABLE IF NOT EXISTS public.event_rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status rsvp_status_enum NOT NULL DEFAULT 'going',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- 9. RESOURCE CENTRE & BRAND ASSETS
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('brand', 'employee')),
  subcategory TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size TEXT NOT NULL,
  file_type TEXT NOT NULL,
  download_url TEXT NOT NULL,
  version TEXT DEFAULT 'v1.0',
  is_featured BOOLEAN DEFAULT FALSE,
  audience TEXT DEFAULT 'all',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. IMPACT METRICS (LIVE CMS CONTROLLABLE)
CREATE TABLE IF NOT EXISTS public.impact_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_key TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  numeric_value BIGINT NOT NULL,
  unit TEXT DEFAULT '',
  category TEXT NOT NULL,
  period TEXT DEFAULT 'Lifetime',
  is_verified BOOLEAN DEFAULT TRUE,
  last_verified TIMESTAMPTZ DEFAULT NOW(),
  trend TEXT DEFAULT '+14% YoY',
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ACTIVE FIELD DEPLOYMENTS & STATIONS
CREATE TABLE IF NOT EXISTS public.field_deployments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country TEXT NOT NULL,
  teams INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL,
  badge_color TEXT NOT NULL,
  focus TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_deployments ENABLE ROW LEVEL SECURITY;

-- Read policies: Open to all authenticated/portal users
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public read reactions" ON public.post_reactions FOR SELECT USING (true);
CREATE POLICY "Public read comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read rsvps" ON public.event_rsvps FOR SELECT USING (true);
CREATE POLICY "Public read resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Public read impact_metrics" ON public.impact_metrics FOR SELECT USING (true);
CREATE POLICY "Public read field_deployments" ON public.field_deployments FOR SELECT USING (true);

-- Write policies: Allow insert/update for application operations
CREATE POLICY "Allow authenticated insert posts" ON public.posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update posts" ON public.posts FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete posts" ON public.posts FOR DELETE USING (true);

CREATE POLICY "Allow manage reactions" ON public.post_reactions FOR ALL USING (true);
CREATE POLICY "Allow manage comments" ON public.post_comments FOR ALL USING (true);
CREATE POLICY "Allow manage rsvps" ON public.event_rsvps FOR ALL USING (true);
CREATE POLICY "Allow manage resources" ON public.resources FOR ALL USING (true);
CREATE POLICY "Allow manage impact_metrics" ON public.impact_metrics FOR ALL USING (true);

-- 13. SEED INITIAL VERIFIED IMPACT METRICS
INSERT INTO public.impact_metrics (metric_key, label, value, numeric_value, unit, category, period, is_verified, sort_order)
VALUES
  ('total_lives', 'Lives Supported Globally', '59,449,628+', 59449628, '+', 'General', 'Since 2015', true, 1),
  ('meals_water', 'Emergency Meals & Safe Water', '22,019,410+', 22019410, 'Packets', 'Nutrition', 'Lifetime', true, 2),
  ('medical_aids', 'Medical Treatments & Health', '4,890,210+', 4890210, 'Patients', 'Healthcare', 'Lifetime', true, 3),
  ('orphans_shelters', 'Orphan Care & Warm Shelters', '1,450,890+', 1450890, 'Children', 'Shelter & Orphans', 'Lifetime', true, 4)
ON CONFLICT (metric_key) DO UPDATE SET
  value = EXCLUDED.value,
  numeric_value = EXCLUDED.numeric_value,
  updated_at = NOW();

-- 14. SEED ACTIVE FIELD STATIONS
INSERT INTO public.field_deployments (country, teams, status, badge_color, focus, sort_order)
VALUES
  ('Gaza & Rafah Border', 18, 'Emergency Phase 3', 'bg-rose-500', 'Winterisation, Flour & Clean Water Tankers', 1),
  ('Southern Lebanon', 9, 'Active Deployment', 'bg-amber-500', 'Medical Kits, Fuel & Trauma Response', 2),
  ('Yemen (Sanaa & Aden)', 8, 'Ongoing Mission', 'bg-emerald-500', 'Cholera Clinics & Desalination Units', 3),
  ('Bangladesh (Rohingya Camp)', 6, 'Sustained Operations', 'bg-sky-500', 'Education, Orphan Village & Food Aid', 4)
ON CONFLICT DO NOTHING;
