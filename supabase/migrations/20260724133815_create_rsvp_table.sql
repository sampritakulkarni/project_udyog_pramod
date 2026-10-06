/*
# Create RSVP table for wedding invitation

1. New Tables
- `rsvp`
  - `id` (uuid, primary key)
  - `name` (text, not null) - guest name
  - `email` (text) - optional contact email
  - `attending` (text, not null) - "yes" / "no" / "maybe"
  - `guests_count` (integer, default 1) - number of people attending
  - `events` (text[]) - which events they plan to attend
  - `message` (text) - optional blessing/message to the couple
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `rsvp`.
- This is a public wedding invitation (no sign-in), so allow anon + authenticated
  to submit RSVPs and read the list of RSVPs. The data is intentionally public/shared.
*/

CREATE TABLE IF NOT EXISTS rsvp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  attending text NOT NULL CHECK (attending IN ('yes', 'no', 'maybe')),
  guests_count integer NOT NULL DEFAULT 1,
  events text[] NOT NULL DEFAULT '{}',
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_rsvp" ON rsvp;
CREATE POLICY "anon_select_rsvp" ON rsvp FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_rsvp" ON rsvp;
CREATE POLICY "anon_insert_rsvp" ON rsvp FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_rsvp" ON rsvp;
CREATE POLICY "anon_update_rsvp" ON rsvp FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_rsvp" ON rsvp;
CREATE POLICY "anon_delete_rsvp" ON rsvp FOR DELETE
  TO anon, authenticated USING (true);
