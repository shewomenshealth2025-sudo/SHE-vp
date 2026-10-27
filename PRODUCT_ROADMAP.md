# SHE Health product roadmap

SHE is a women's health navigation platform, not a diagnostic tool. This roadmap improves the existing Vite/React MVP incrementally and keeps the deployed product stable.

## Phase 1 — Product shell and navigation
- Establish the SHE pillar names across desktop and mobile navigation.
- Add branded routes: `/helps`, `/finds`, `/map`, `/facts`, and `/my-she`.
- Keep existing URLs working for bookmarks and shared links.
- Confirm mobile navigation remains usable at narrow widths.

## Phase 2 — Core journeys and content integrity
- Audit each current route and document what is live, local-only, mocked, or incomplete.
- Make the core journey work end-to-end: find a topic, understand it, explore relevant products, and locate appropriate services.
- Ensure health information carries source links and review dates where available.
- Check empty, error, loading, and small-screen states.

## Phase 3 — SHE Helps navigation
- Build guided topic → symptoms/concerns → relevant information and next-step resources.
- Clearly separate general information from urgent escalation guidance.
- Do not present the flow as diagnosis or a substitute for professional care.

## Phase 4 — SHE Asks and SHE Tells
- Define community and expert-contribution workflows before opening posting.
- Add moderation/reporting, community rules, consent, and privacy controls before public user-generated content.
- Avoid anonymous health posts in the first release unless the privacy and safeguarding model is explicitly designed.

## Phase 5 — My SHE and personalisation
- Define what is useful without collecting unnecessary sensitive health data.
- Separate local preferences from any account-backed data.
- Make saved items, plans, and deletion/export behaviour explicit before introducing accounts.

## Phase 6 — Quality, safety, and release
- Run production build, lint, and the existing knowledge/chat/services/plans/reviews/products validation scripts.
- Test key journeys on mobile and desktop.
- Review accessibility, GDPR obligations, clinical safety, source provenance, and moderation with appropriate experts.
- Deploy only after checks pass; keep a rollback path.

## Current implementation status
- Phase 1 navigation and route aliases are being introduced on a dedicated feature branch.
- This roadmap is a plan, not a claim that later phases are already implemented.
