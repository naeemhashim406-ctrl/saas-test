Module 1 — Auth & Core

Scope
- Folder structure
- Normalized Postgres schema for multi-tenant orgs
- RBAC: roles and permissions
- Supabase setup (email/magic link, Google)
- Zod validation
- Supabase client starter
- Auth UI skeleton (login, magic link, google)
- Security notes and responsive rules

Folder structure (feature-based)
- src/
  - app/
  - features/
    - auth/
      - components/
      - hooks/
      - validators/
      - ui/
  - lib/
    - supabaseClient.ts
  - styles/
  - routes/

Component architecture (auth)
- AuthPage (layout)
  - AuthCard (centered, glass card, animated)
    - EmailForm (magic link)
    - OAuthButtons (Google)
    - SecondaryActions (help, contact)

Responsiveness rules
- Mobile-first; all components adapt at these breakpoints: sm(640), md(768), lg(1024), xl(1280)
- Touch targets >=44px
- Fluid widths with max-width containers
- Condense spacing on small screens; generous whitespace on desktop

Deliverables
- SQL schema file
- Supabase client starter
- Zod validators
- Auth UI skeleton component
- README with setup and security guidance
