# V3 UI/UX Audit & Rework

Audit run against the built V3 site, then applied. Measurements were taken in
the browser (computed styles, WCAG contrast maths, painted section area), not
by eye.

---

## 1. Contrast / visibility

Text was failing WCAG AA in seven places. All fixed; the site now measures
**0 contrast failures across all 8 pages** (114+ text nodes checked per page).

| Element | Was | Ratio | Now | Ratio |
|---|---|---|---|---|
| Body & secondary text `--mid-gray` | `#767676` | 4.29 ✗ | `#5E5E5E` | 5.9 ✓ |
| `.eyebrow` (every section label) | red `#D10B20` | 3.56 ✗ | graphite `#2F2F2F` + red rule | 12.6 ✓ |
| `.count` "7 institutions" | `#767676` on soft | 3.97 ✗ | `#5E5E5E` | 5.5 ✓ |
| CTA band body copy | `rgba(255,255,255,.86)` | 4.34 ✗ | `#fff` | 5.3 ✓ |
| Card sequence numerals `.num` | `#EBC3C8` | 1.59 ✗ | `--red-dark` / white | 6.4 ✓ |
| Mobile menu primary button | dark text on red | 2.41 ✗ | white on red | 4.6 ✓ |

Two of these were genuine bugs rather than weak choices:

- **Mobile menu CTA** — `.mobile-menu a` (0,2,0) beat `.btn-primary` (0,1,0),
  so the button rendered dark-grey text on red. Fixed with `a:not(.btn)`.
- **Text over photography** had no guaranteed floor at all. The hero used a
  single left-to-right gradient, so the headline sat on bright bookshelves and
  the red sub-line was close to unreadable. Replaced with a two-layer scrim
  (vertical + horizontal) plus text-shadow. Destination card labels got the
  same treatment — their scrim only darkened the very bottom, leaving
  "RECRUITMENT PARTNERSHIPS" on bright sky.

Red is no longer used for small text anywhere. At 13px on cream it cannot pass
AA, so it now appears as rules, fills, dots and buttons only.

---

## 2. The 60 / 30 / 10 rule

Before: red was doing far too many jobs — eyebrows, dots, numerals, icon
badges, hero sub-line, watermarks, buttons and a full-bleed CTA band. Measured
area was only ~5%, but 55 separate elements carried red, so it read as
everywhere and stopped functioning as an accent.

Roles are now explicit and enforced in the stylesheet:

- **60 — neutral ground:** `--cream` / `--soft`
- **30 — structure:** `--ink` dark bands, footer, photography
- **10 — accent:** `--red`, reserved for primary buttons, the single CTA band, and small marks

Measured after rework (painted section area per page):

| Page | Neutral | Structure | Accent |
|---|---|---|---|
| Home | 57% | 37% | 7% |
| About | 54% | 40% | 6% |
| Student Services | 69% | 23% | 7% |
| Study Destinations | 48% | 43% | 9% |
| University Partnerships | 54% | 38% | 8% |
| Success Stories | 45% | 42% | 13% |
| Resources | 50% | 37% | 13% |
| Contact | 66% | 33% | 0%* |

\* Contact has no CTA band; its red is in buttons and field focus only. The two
13% pages are short pages where the fixed-height CTA band takes a bigger share —
acceptable.

---

## 3. Things that were hard to look at

- **The dark-section watermark.** `rg-mark-red.png` at 34% width / .20 opacity
  rendered as a large dark-red blob straddling the copy. Removed entirely and
  replaced with a soft radial glow via `::before`. Same treatment on the page
  hero and footer.
- **Anton everywhere.** Anton is a display face; using it for `h3`/`h4` at
  16–22px made card titles dense and muddy. Anton is now restricted to `h1`/`h2`
  and stat numerals; `h3`/`h4` use Poppins 600. This is the single biggest
  legibility gain on cards and lists.
- **Nav CTA overflowed the header.** "Start Your Journey" wrapped onto three
  lines and pushed a red block out of the header bar at 1440px. Fixed with
  `white-space:nowrap`, tighter spacing, and a burger breakpoint at 1120px.

---

## 4. Menu / information architecture

The old nav had 7 top-level items plus a CTA and did not fit. The new structure
is audience-led, mirroring the split the source document itself makes between
"For Universities" and "For Future Graduates":

```
Home
About Us
Study Abroad  ▾   Student Services · Study Destinations · Partner Universities · Success Stories
Partner With Us   → the institution-facing partnership page
Resources
```

Six top-level items. A student and a university partner each have one obvious
entry point, which suits a recruitment business better than a flat list of
page names.

The five empty Resources sections (Events, Scholarships, News, FAQ, Blog) were
removed from the dropdown — advertising five dead ends in the nav is worse than
listing them on the Resources page with an honest status.

---

## 5. Duplication ("same thing shown different ways")

Checked structurally, not just by sentence. Findings and resolutions:

| Content block | Was on | Now |
|---|---|---|
| Direct-collaboration institution list | Home, Universities, University Partnerships (3×) | **University Partnerships only** (Home shows counts) |
| 8 destination cards | Home, Study Destinations (2×) | Study Destinations owns the grid; **Home shows a chip row** |
| Global recruitment list | Home, Study Destinations, Partnerships (3×) | **University Partnerships only** |
| 10-step journey | Home, Student Services (2×) | Student Services owns the detail; **Home shows 4 phases** |
| For Universities / Future Graduates | Home, About, Partnerships (3×) | **Home only** (it is the audience router) |
| 4 testimonial categories | Home, Success Stories (2×) | **Success Stories only** |
| "Global Reach" paragraph | 3 pages | **Study Destinations only** |

**`universities.html` was deleted.** It was 37% byte-identical to
`university-partnerships.html` and carried no unique content — the same
institution list under a different page name. The source document has one
"University Partnerships" section; the separate Universities page was invented
by the earlier sitemap. Merged.

Home is now genuinely a summary layer (counts, chips, phases) that routes into
detail pages, rather than a page that repeats every list verbatim.

---

## 6. Motion

Added, all gated behind `prefers-reduced-motion`:

- Brand page loader (logo + indeterminate bar), with a 4s failsafe so the page
  can never be trapped behind it
- Staggered hero entrance (eyebrow → headline → sub → copy → buttons)
- Slow hero background zoom
- Scroll reveals with per-child stagger on grids
- Card hover lift, button hover lift, submenu slide, nav shadow on scroll
- Bobbing scroll cue in the hero

Reveal animation is **opt-in via JS** (`body.js-reveal`): if JS fails, content
is visible by default rather than stuck at `opacity:0`.

---

## 7. Build note

All 8 pages are generated from one script so the header, nav, and footer cannot
drift. Editing a page by hand will be overwritten on the next build — change the
generator instead.


---

## 8. Menu naming — second pass

The first pass used the source document's own audience split as nav labels:
`For Students` / `For Universities`. Both were wrong for different reasons.

**"For Universities" was ambiguous.** It reads as a noun ("here are the
universities") far more naturally than as an audience ("the section addressed to
universities"). On a study-abroad site the great majority of visitors are
students, so the label invited the wrong click from almost everyone — and the
page behind it opened with a B2B hero written for institutions.

**The page was doing two jobs.** The institution list (a student question) sat
below a partnership pitch (an institution question), and it was the only place
those eleven institutions appeared anywhere on the site.

**"For Students › Student Services"** repeated the same word in one path, and
`For Students` was a dropdown while `For Universities` was a plain link — a
matched-looking pair with mismatched behaviour.

Resolved by splitting on **job**, not audience:

| Page | Job | Owns |
|---|---|---|
| `universities.html` — **Partner Universities** | "Which universities can I apply to?" | The institution list, grouped by country |
| `university-partnerships.html` — **Partner With Us** | "Why should our institution work with RGE?" | The five service areas, network counts, recruitment markets |

The B2B page shows *counts* and links to the list rather than repeating it, so
the earlier de-duplication holds: `Global College Malta` now appears on exactly
one page.

Note this reverses part of section 5. Merging the two pages was right on the
evidence at the time — they were 37% identical with no differentiating copy —
but the correct fix was to give each page a distinct job, not to collapse both
into the institution-facing one.

Parent label is now **Study Abroad**: it names what the visitor wants to do
rather than who they are, and removes the "Student › Student" repetition.
