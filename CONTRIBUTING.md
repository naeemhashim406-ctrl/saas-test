# Contributing to VisaFlow

Thank you for contributing! Please follow these guidelines to help us review and land your work quickly.

Getting started
- Fork the repository and create a branch from `main`.
- Install dependencies: `npm ci`.
- Run dev server: `npm run dev`.
- Run tests: `npm test` or `npx vitest`.

Branch naming
- Use descriptive branch names, e.g., `feature/onboarding-auth`, `fix/invite-flow`.

Commit messages
- Follow conventional commits: `feat:`, `fix:`, `chore:`, `docs:`.
- Include a short description and, where useful, a longer body.

Pull requests
- Open a PR against `main` and fill the PR template.
- Keep PRs focused and small. Provide screenshots/recordings for UI changes.

Coding style
- TypeScript strict mode preferred.
- Use feature-based folder structure under `src/features/`.
- Add tests for new behavior and run the test suite before opening a PR.

CI
- CI runs on push/PR to `main`. Ensure your branch passes tests before requesting review.

Security
- Never commit secrets. Use environment variables and secret stores (GitHub secrets, Supabase secrets).

Thanks for making VisaFlow better!