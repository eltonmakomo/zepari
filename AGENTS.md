<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All site content (people, themes, publications, articles, events, media) lives as typed records in `src/content/` and links by slug/id; pages derive related content via `src/content/queries.ts` so nothing is entered twice. Why: CMS-ready single source of truth.
- Paid items must never carry a public file URL; entitlement logic is isolated in `src/lib/purchases.ts` (currently a demo adapter) so it can be swapped for server-verified payments. Why: protected files must not leak.
- Content imported from the live zepari.co.zw site lives in `src/content/live.ts` (generated, editable); `data.ts` merges it with curated records, curated entries win on title match. Why: keeps live content complete without duplicate entry.
- Shared PageHeader imagery uses bundled panoramas and matching portrait sources for people scenes; mobile portraits occupy a fixed-height upper image band with reserved text space. Why: changing header height must not crop faces or alter actual content photography.
