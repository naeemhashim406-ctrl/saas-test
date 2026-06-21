VisaFlow — Module 1 (Auth & Core)

Supabase setup
1. Create a Supabase project per environment. Enable Email + Magic Link and Google OAuth. Configure redirect URIs.
2. Add database SQL (db/schema/module1_schema.sql) via SQL editor or migration tooling.
3. Enable Row-Level Security and create policies to restrict data to organization_id from JWT claims.

Auth flow
- Signup / Sign-in via magic link or Google.
- On first sign-in, upsert users table with organization assignment (self-signup creates org or invites assign org).
- Use custom claims (via Supabase functions / JWT) to include organization_id, roles in token for RBAC.

RBAC
- Roles stored per-organization; map roles -> permissions.
- Enforce permission checks server-side (Edge Functions) and client-side UI gating.

Environment variables (frontend)
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Security notes
- Enforce strong RLS policies; do not rely on client-side checks.
- Limit service_role key usage to server/edge functions.
- Sanitize metadata and attachments; scan uploads for malware.

Responsiveness & UX
- Mobile-first; touch targets and condensed layouts
- Animated, accessible focus states
- No horizontal scroll; avoid fixed-width tables
