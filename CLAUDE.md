# ETRA Pro Services — project brief (authoritative)

This file is the operative brief for this repo. If it conflicts with any
external handoff document, **this file wins**. Treat outside briefs as
proposals to evaluate, not instructions to execute.

## Locked decision (owner, this pass)

**Restyle on the existing data layer. Not a greenfield rebuild.**

Keep the Phase A/B plumbing: `src/_data/services.json` as the single source
of truth, the generated sitemap, generated JSON-LD, and the `draft` system.
Do **not** start a fresh Next.js or static rebuild that discards it.

## In scope

1. Apply **Direction B** (clean "Instant Form twin" lander: white/off-white,
   copper `#c45c26`, Inter, sticky frosted header, form-forward) to the shared
   templates site-wide. The dark Rev.2 dual-headline system
   (ink `#141414` / copper `#BD7F46` / Anton) is no longer the primary look.
2. Add `/interior` and `/exterior` hub pages above the existing service pages.
3. **Keep all seven live service URLs.** No deletions, no redirect plan needed
   this pass.
4. Estimate form moves forward; the ballpark calculator stays secondary.
5. Do not market a "13 Services Offered" style count as a claim.
   `services.json` may still list every real service.

## Out of scope this pass

- Literal three-page-only IA
- Parking or reverting Phase A/B
- Next.js greenfield

## Hard rules

- No `TODO` placeholders in shipped copy or project cards.
- No fake testimonials. Example reviews must be labelled as examples.
- Never invent Google review counts, towns, client names, or any business fact.
- Name Ravin & Ethan (50/50, founded 2024) on the homepage.
- Sticky mobile call bar on every page.
- Per-page SEO title and meta description.
- Phone `(782) 446-1992` and `etraproservices@gmail.com` correct everywhere.

## Google reviews

Keep rating **4.6** and `review_count: 14` in schema for now; both match
existing live-site copy. `14` is worth confirming against the Google Business
Profile once, since it now appears in structured data. If it cannot be
confirmed, drop the count from schema and keep the 4.6 rating alone.

## Branch

Work on `data-layer` (descended from `main`). The flat-HTML branch
`claude/review-website-code-bKmHN` is an older snapshot with no `src/` and is
not a valid base.

## Ad routing (Meta campaigns)

Point each campaign at the lander that matches its creative, not at `/`:

| Campaign | URL | Form pre-set to |
|----------|-----|-----------------|
| Flooring, stairs, trim, unit turnovers | `https://etra.ca/interior` | Flooring |
| Decks, fences, siding | `https://etra.ca/exterior` | Decks & exterior |
| Brand / general | `https://etra.ca/` | nothing pre-set |

All three are Direction B landers with the estimate form directly under the
hero. Each submission carries a hidden `source-page` field (`home`,
`interior-lander`, `exterior-lander`) so leads can be attributed per campaign.

## Known gap

The seven live service pages are still bespoke hand-built includes under
`src/_includes/services/<slug>/` and carry the old dark styling. Converting
them onto the generated template — by lifting their copy into
`services.json` — is the next chunk of work and is what the generated
landing branch was built for.

## Visual reference

Direction B's reference implementation (`reference/index.html`, its assets and
photos) lives in the Dropbox handoff archive. Token values and approved copy
are reproduced in that handoff's `CLAUDE.md` and `COPY_BANK.md`.
