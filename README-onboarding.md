Onboarding & Invites — VisaFlow

1) Database
- Run db/schema/module1_invites.sql to add invitations table and helper function create_org_with_defaults.

2) Edge Functions
- Deploy supabase_functions/create-org.ts and create-invite.ts as Supabase Edge Functions or serverless endpoints. Configure env vars:
  - SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
  - SENDGRID_API_KEY (or use other mail provider)
  - APP_URL (frontend URL)

3) Frontend
- Use routes: /onboarding/create (CreateOrg), /onboarding/invite (Invite), /onboarding/accept (AcceptInvite)
- Replace fetch paths (/api/*) with deployed function URLs or proxied endpoints.

4) Security
- Use service role key only in server-side functions.
- Validate tokens server-side and expire invites after configured time.
- Enforce RLS on invitations and organizations.

5) UX
- Invites show tasteful toasts. Accept-invite redirects to sign-in if not authenticated.

Notes
- This implements a secure, production-ready invite flow: create invites server-side, send email via SendGrid, accept invites with token, and create orgs with default roles using a server-side helper function.
