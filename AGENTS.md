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
- Content imported from the live zepari.co.zw site lives in `src/content/live.ts` (generated, editable); document/article archives derive only from these records, with short-slug aliases and featured/related links in `data.ts`. Why: preserve original text, access and file URLs without adding sample content.
- Shared PageHeader imagery uses bundled panoramas and matching portrait sources for people scenes; mobile portraits occupy a fixed-height upper image band with reserved text space. Why: changing header height must not crop faces or alter actual content photography.
- Video cards use the shared VideoPlayer dialog with players mounted only while open. Why: consistent accessible playback across pages and closing stops video/audio.
- Shared navigation defines desktop dropdowns and mobile expandable links together; existing archives are linked with typed filters. Why: keep the live-site menu destinations consistent without duplicating archive pages.
- Client directory, partner narrative and testimonials are typed source records in `src/content/organization.ts`. Why: reuse verified live-site wording without entering it into pages twice.
- Publication archives preserve each live study/brief edition and detail lookups resolve original source slugs as well as short aliases. Why: distinct editions remain complete and old links keep working.
- Read online uses `publicationReadUrl` to open the original free PDF in a new browser tab. Why: readers see the actual document, not an abstract anchor or a fictitious download.
