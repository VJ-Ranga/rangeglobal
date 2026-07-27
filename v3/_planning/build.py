#!/usr/bin/env python3
"""Build the Range Global Education V3 site.

Single source for every page so header/footer/nav can never drift.
Content comes from "RGE Website contents (1).docx" only.
"""
import pathlib, shutil

# site root = the folder containing this _planning/ directory
ROOT = pathlib.Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------- shared data
DESTS = [
    ("Malta", "malta", "Direct collaborations"),
    ("Malaysia", "malaysia", "Direct collaborations"),
    ("Ireland", "ireland", "Recruitment partnerships"),
    ("Netherlands", "netherlands", "Recruitment partnerships"),
    ("United States", "united-states", "Recruitment partnerships"),
    ("New Zealand", "new-zealand", "Direct collaborations"),
    ("Canada", "canada", "Approved destination"),
    ("Georgia", "georgia", "Direct collaborations"),
]

COLLABS = [
    ("Malta", [("Global College Malta","GC"),("Ascencia Malta","AM"),("GBSB Global Business School","GB"),
               ("Learnkey Institute","LK"),("La Vallette Institute","LV"),("Idea College","IC"),
               ("Training Three Sixty","T3")]),
    ("New Zealand", [("NZSE","NZ"),("International College of Auckland","IA")]),
    ("Georgia", [("Alte University","AU")]),
    ("Malaysia", [("INTI International University","IN")]),
]

RECRUIT = ["United States of America", "United Kingdom", "New Zealand", "Netherland", "Ireland"]

STEPS = [
    ("Discover", "The journey begins with understanding individual goals, aspirations, and potential before any programme or destination is discussed."),
    ("Choose Destination", "Applicants compare study destinations against their academic background, career objectives, and preferred environment."),
    ("Select University", "Students are guided towards institutions that best align with their academic background, career objectives, and preferred study destination."),
    ("Prepare Documents", "Document preparation follows an organised process so applicants understand what is required at each stage."),
    ("Submit Application", "Applications are submitted through a structured process supported by direct institutional communication."),
    ("Receive Offer", "We coordinate with the institution and keep applicants informed as the admission decision is issued."),
    ("Visa Guidance", "Our engagement extends beyond the offer letter, continuing through visa preparation."),
    ("Visa Interview Training", "Applicants are prepared for the visa interview stage as part of the wider support process."),
    ("Pre-Departure", "Pre-departure arrangements are supported so students are ready before travel."),
    ("Begin Your Studies", "Students begin their studies with an understanding of each stage they have completed."),
]

# Home shows the ten stages grouped into four phases — same words as the source,
# just organised. The full ten-stage detail lives only on Student Services.
PHASES = [
    ("Discover &amp; decide", ["Discover", "Choose Destination", "Select University"]),
    ("Apply", ["Prepare Documents", "Submit Application", "Receive Offer"]),
    ("Visa", ["Visa Guidance", "Visa Interview Training"]),
    ("Depart", ["Pre-Departure", "Begin Your Studies"]),
]

VALUES = [
    ("Empowerment Through Knowledge", "We believe informed decisions create successful academic journeys. Our approach focuses on equipping with the knowledge, insights, and perspectives needed to navigate global education opportunities."),
    ("Global Connectivity", "We connect applicants, institutions, and world class education systems to create opportunities that expand academic and professional possibilities."),
    ("Purpose-Driven Guidance", "Every student journey begins with understanding individual goals, aspirations, and potential, enabling solutions that align education choices with future ambitions."),
    ("Excellence Through Process", "Our structured systems ensure transparency, accuracy, and efficiency throughout admissions and support processes."),
    ("Continuous Learning &amp; Adaptation", "We embrace change in global education trends, technology, regulations and institutional requirements to remain responsive in a rapidly evolving environment."),
    ("Individual Potential &amp; Diversity", "We recognize that every applicant has a unique background, capability, and vision, and we support opportunities that encourage personal growth and global participation."),
    ("Partnership Beyond Transactions", "We develop meaningful connections with learners, families, and educational institutions by focusing on long-term collaboration and shared growth."),
    ("Education Without Boundaries", "We promote the idea that quality education can open doors across cultures, countries, and communities, creating a more connected world."),
]

WHY = [
    ("Direct University Collaborations", "We work to establish direct partnerships with universities, enabling clear institutional communication and effective student recruitment."),
    ("Academic-Focused Guidance", "Our discussions begin with the student's academic objectives, preferred study destination, and long-term aspirations before exploring programme options."),
    ("Structured Application Management", "From document preparation to application submission, each stage follows an organised process that allows learners to understand their progress throughout their admission journey."),
    ("Multiple Study Destinations", "International applicants can compare programmes and opportunities across Malta, Malaysia, Ireland, the Netherlands, the United States, New Zealand, Canada, and Georgia through a single point of contact."),
    ("University and Student Engagement", "We maintain communication with both institutions and applicants throughout the admission process, supporting information exchange and timely coordination."),
    ("A Partnership Beyond Admission", "Our engagement extends beyond receiving an offer letter. We continue supporting applicants through visa preparation and pre-departure arrangements while maintaining ongoing relationships with our university partners."),
]

TESTI = [
    ("Student stories", "Experiences shared by applicants who have completed the journey with Range Global Education."),
    ("Parent testimonials", "Perspectives from families supporting a study-abroad decision."),
    ("University partner feedback", "Feedback from the institutions we collaborate with directly."),
    ("Video testimonials", "Recorded stories from students and partners."),
]

RES = [
    ("events", "Events &amp; Webinars", "Information sessions and webinars for applicants and university partners.",
     "Event titles, dates, times, speakers, descriptions and registration links"),
    ("scholarships", "Scholarship Opportunities", "Scholarship information for applicants considering our study destinations.",
     "Scholarship names, eligibility criteria, award amounts, deadlines, participating institutions and the application process"),
    ("news", "News &amp; Updates", "Announcements from Range Global Education and our partner institutions.",
     "Article titles, dates, body copy, images and categories"),
    ("faq", "FAQ", "Answers to the questions applicants ask most often.",
     "Questions, answers and approved policy wording"),
    ("blog", "Blog", "Longer-form articles on studying abroad and the admission process.",
     "Blog categories, article topics, article content, author names and publish dates"),
]

ARROW = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">'
         '<path d="M5 12h14M13 6l6 6-6 6"/></svg>')
INFO = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
        '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>')

# ---------------------------------------------------------------- components
def country_blocks(limit=None):
    out = []
    for country, insts in COLLABS:
        show = insts if limit is None else insts[:limit]
        items = "\n".join(
            f'            <li><span class="mark">{ab}</span>{nm}</li>' for nm, ab in show)
        more = ""
        if limit is not None and len(insts) > limit:
            more = f'\n            <li style="color:var(--mid-gray); font-size:13.5px;">+ {len(insts)-limit} more</li>'
        n = len(insts)
        out.append(f'''        <div class="country-block">
          <div class="country-head"><h3>{country}</h3><span class="count">{n} institution{"s" if n != 1 else ""}</span></div>
          <ul class="inst-list">
{items}{more}
          </ul>
        </div>''')
    return "\n".join(out)


def dest_cards(link=None):
    out = []
    for name, slug, meta in DESTS:
        tag, close = (f'<a class="dest-card dest-{slug}" href="{link}">', "</a>") if link else (f'<div class="dest-card dest-{slug}">', "</div>")
        out.append(f'        {tag}<div class="dest-body"><h3>{name}</h3>'
                   f'<div class="dest-meta">{meta}</div></div>{close}')
    return "\n".join(out)


def chips(items):
    return "\n".join(f'          <span class="chip"><span class="dot"></span>{i}</span>' for i in items)


def note(text):
    return (f'      <div class="placeholder-note reveal" style="margin-top:32px;">{INFO}\n'
            f'        <span>{text}</span>\n      </div>')


def cta(heading, body, label, href, second=None):
    extra = ""
    if second:
        extra = f'\n      <a href="{second[1]}" class="btn btn-outline-light">{second[0]}</a>'
    return f'''
  <section class="cta-band">
    <div class="container">
      <div>
        <h2 class="h-lg">{heading}</h2>
        <p>{body}</p>
      </div>
      <div style="display:flex; gap:14px; flex-wrap:wrap;">
        <a href="{href}" class="btn btn-outline-light">{label} {ARROW}</a>{extra}
      </div>
    </div>
  </section>
'''

# ---------------------------------------------------------------- nav / shell
# Audience-led IA, mirroring the source document's own split between
# "For Universities" and "For Future Graduates". Six top-level items.
NAV = [
    ("home",     "Home",              "index.html",                  None),
    ("about",    "About Us",          "about.html",                  None),
    ("students", "For Students",      "student-services.html",
        [("student-services", "Student Services", "student-services.html"),
         ("study-destinations", "Study Destinations", "study-destinations.html"),
         ("success-stories", "Success Stories", "success-stories.html")]),
    ("partners", "For Universities",  "university-partnerships.html", None),
    ("resources","Resources",         "resources.html",              None),
    ("contact",  "Contact",           "contact.html",                None),
]

CARET = ('<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
         'stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>')


def href(target, depth):
    """depth 0 = site root (index.html), depth 1 = /pages/*."""
    if target == "index.html":
        return "index.html" if depth == 0 else "../index.html"
    return ("pages/" + target) if depth == 0 else target


def build_nav(active, depth):
    parts = []
    for key, label, target, kids in NAV:
        is_active = active == key or (kids and any(active == k for k, _, _ in kids))
        cls = ' class="active"' if is_active else ""
        if kids:
            sub = "\n".join(
                f'          <a href="{href(t, depth)}"{" class=\"active\"" if active == k else ""}>{l}</a>'
                for k, l, t in kids)
            parts.append(f'''      <div class="nav-item has-submenu">
        <a href="{href(target, depth)}"{cls}>{label} {CARET}</a>
        <div class="submenu">
{sub}
        </div>
      </div>''')
        else:
            parts.append(f'      <a href="{href(target, depth)}"{cls}>{label}</a>')
    return "\n".join(parts)


def build_mobile(active, depth):
    parts = []
    for key, label, target, kids in NAV:
        is_active = active == key
        cls = ' class="active"' if is_active else ""
        if kids:
            parts.append(f'    <div class="mobile-group">{label}</div>')
            for k, l, t in kids:
                a = ' mobile-sub-link active' if active == k else ' mobile-sub-link'
                parts.append(f'    <a href="{href(t, depth)}" class="{a.strip()}">{l}</a>')
        else:
            parts.append(f'    <a href="{href(target, depth)}"{cls}>{label}</a>')
    return "\n".join(parts)


FOOT_EXPLORE = [("About Us", "about.html"), ("Student Services", "student-services.html"),
                ("Study Destinations", "study-destinations.html"), ("Success Stories", "success-stories.html")]
FOOT_PARTNER = [("University Partnerships", "university-partnerships.html"),
                ("Resources", "resources.html"), ("Contact", "contact.html")]


def shell(slug, active, title, desc, main, depth):
    a = "../" if depth else ""
    nav = build_nav(active, depth)
    mob = build_mobile(active, depth)
    explore = "\n".join(f'          <li><a href="{href(t, depth)}">{l}</a></li>' for l, t in FOOT_EXPLORE)
    partner = "\n".join(f'          <li><a href="{href(t, depth)}">{l}</a></li>' for l, t in FOOT_PARTNER)
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="icon" href="{a}assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="{a}assets/img/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="{a}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{a}assets/css/style.css?v=2">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<div class="loader">
  <img src="{a}assets/img/rg-logo-white.png" alt="Range Global Education">
  <div class="loader-track"><span></span></div>
</div>

<div class="utility-bar">
  <div class="container">
    <div class="utility-left">
      <span class="hide-mobile">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Phone — pending client confirmation
      </span>
      <span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m4 6 8 6 8-6"/></svg>
        Email — pending
      </span>
    </div>
    <div class="utility-right"><a href="{href("contact.html", depth)}">Start Your Journey</a></div>
  </div>
</div>

<header class="nav">
  <div class="container">
    <a href="{href("index.html", depth)}" class="site-logo"><img src="{a}assets/img/rg-logo.png" alt="Range Global Education — home"></a>
    <nav class="nav-links" aria-label="Main">
{nav}
    </nav>
    <div class="nav-right">
      <a href="{href("contact.html", depth)}" class="btn btn-primary btn-sm nav-cta">Start Your Journey</a>
      <button class="nav-burger" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu">
  <div class="container">
{mob}
    <a href="{href("contact.html", depth)}" class="btn btn-primary">Start Your Journey</a>
  </div>
</div>

<main id="main">
{main}</main>

<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo-plate"><img src="{a}assets/img/rg-logo-white.png" alt="Range Global Education"></div>
        <p>Empowering Through Education. We connect institutions with capable applicants through informed representation, structured processes, and dedicated support.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h3>Explore</h3>
        <ul>
{explore}
        </ul>
      </div>
      <div class="footer-col">
        <h3>Partnerships</h3>
        <ul>
{partner}
        </ul>
      </div>
      <div class="footer-col">
        <h3>Contact</h3>
        <ul class="footer-contact">
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span class="footer-pending">Office address — pending client confirmation</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span class="footer-pending">Phone / WhatsApp — pending</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m4 6 8 6 8-6"/></svg><span class="footer-pending">Email address — pending</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Range Global Education (Pvt) Ltd. All rights reserved.</span>
      <span>Demo build — content sourced from the approved website content document.</span>
    </div>
  </div>
</footer>

<a class="wa-float" href="#" aria-label="WhatsApp — number pending">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.17c-.25.69-1.44 1.32-1.99 1.36-.53.05-1.02.24-3.43-.72-2.9-1.14-4.73-4.1-4.87-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.25-.28.55-.35.74-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.84 2.07.91 2.22.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.63-.14.25.09 1.62.76 1.9.9.28.14.46.21.53.32.07.12.07.65-.18 1.34z"/></svg>
</a>
<button class="top-float" aria-label="Back to top">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m18 15-6-6-6 6"/></svg>
</button>

<script src="{a}assets/js/main.js?v=2"></script>
</body>
</html>
'''


def page_hero(eyebrow, h1, lead, crumbs):
    trail = ""
    for label, link in crumbs[:-1]:
        # a crumb with no link is a grouping label, not a page — render as text
        crumb = f'<a href="{link}">{label}</a>' if link else label
        trail += f'{crumb}<span class="sep">/</span>'
    trail += crumbs[-1][0]
    return f'''
  <section class="page-hero">
    <div class="container">
      <div class="eyebrow on-dark">{eyebrow}</div>
      <h1 class="h-xl">{h1}</h1>
      <p>{lead}</p>
      <div class="crumb">{trail}</div>
    </div>
  </section>
'''

# ================================================================ PAGES
PAGES = {}

# ---------------------------------------------------------------- HOME
phase_cards = "\n".join(
    f'''        <div class="card card-accent num-card"><span class="num">{i:02d}</span>
          <h3>{name}</h3>
          <p>{" &middot; ".join(steps)}</p>
        </div>''' for i, (name, steps) in enumerate(PHASES, 1))

PAGES["index"] = dict(slug="index", active="home", depth=0,
  title="Range Global Education (Pvt) Ltd — Empowering Through Education",
  desc="Range Global Education helps students begin their international education journey while building meaningful partnerships with universities across the world.",
  main=f'''
  <section class="hero">
    <div class="hero-panel">
      <div class="hero-bg"></div>
      <div class="hero-scrim"></div>
      <img src="assets/img/world-map-large.svg" alt="" class="hero-map">
      <div class="container hero-inner">
        <div class="eyebrow on-dark">Range Global Education (Pvt) Ltd</div>
        <h1>Empowering Through Education</h1>
        <div class="hero-sub">Education Beyond Borders</div>
        <p class="hero-copy">Education opens doors to opportunities, cultures, careers, and lifelong connections. We help students confidently begin their international education journey while building meaningful partnerships with universities across the world.</p>
        <div class="hero-actions">
          <a href="pages/student-services.html" class="btn btn-primary">Start Your Journey {ARROW}</a>
          <a href="pages/university-partnerships.html" class="btn btn-outline-light">For Universities</a>
        </div>
      </div>
      <div class="hero-scroll">Scroll
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M6 13l6 6 6-6"/></svg>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="split split-wide">
        <div class="reveal" style="position:relative;">
          <div class="image-card img-students" style="width:100%; aspect-ratio:4/5;"></div>
          <div class="stat-plate">
            <div class="stat-num on-dark" style="font-size:32px;" data-count="8">0</div>
            <div class="stat-label on-dark">Approved study destinations</div>
          </div>
        </div>
        <div class="reveal">
          <div class="eyebrow">Who We Are</div>
          <h2 class="h-lg">A university partnership and student pathway organisation</h2>
          <p class="lead" style="margin-top:20px;">We establish direct partnerships with universities while also providing access to a broader network of internationally recognised institutions through authorised recruitment partnerships.</p>
          <p style="margin-top:16px; font-size:15.5px;">Our work is built around structured collaboration between universities and students. Rather than focusing on a single destination, we support academic opportunities across multiple education systems while maintaining a coordinated admission process.</p>
          <a href="pages/about.html" class="btn btn-outline" style="margin-top:30px;">More About Us {ARROW}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section-alt">
    <div class="container">
      <div class="section-head center reveal">
        <div class="eyebrow center">Two Sides Of One Process</div>
        <h2 class="h-lg">Built for universities and future graduates alike</h2>
        <p>Choose the path that applies to you.</p>
      </div>
      <div class="audience reveal">
        <div>
          <div class="aud-head">
            <span class="icon-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg></span>
            <h3>For Universities</h3>
          </div>
          <ul>
            <li>Direct Collaborations</li><li>International Recruitment</li><li>Market Representation</li>
            <li>Student Outreach</li><li>Partnership Development</li>
          </ul>
          <a href="pages/university-partnerships.html" class="btn btn-outline btn-sm" style="margin-top:26px;">University Partnerships {ARROW}</a>
        </div>
        <div>
          <div class="aud-head">
            <span class="icon-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 10-10-5L2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg></span>
            <h3>For Future Graduates</h3>
          </div>
          <ul>
            <li>Destination Selection</li><li>Programme Guidance</li><li>Admission Process</li>
            <li>Visa Support</li><li>Pre-Departure Preparation</li>
          </ul>
          <a href="pages/student-services.html" class="btn btn-outline btn-sm" style="margin-top:26px;">Student Services {ARROW}</a>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-head-row reveal">
        <div class="section-head">
          <div class="eyebrow">Complete Support Services</div>
          <h2 class="h-lg">Four phases, ten stages</h2>
          <p>We support applicants throughout each stage of their international academic journey.</p>
        </div>
        <a href="pages/student-services.html" class="btn btn-outline">See all ten stages {ARROW}</a>
      </div>
      <div class="grid g-4 stagger">
{phase_cards}
      </div>
    </div>
  </section>

  <section class="section-alt">
    <div class="container">
      <div class="section-head-row reveal">
        <div class="section-head">
          <div class="eyebrow">Study Destinations</div>
          <h2 class="h-lg">Eight destinations, one point of contact</h2>
          <p>International applicants can compare programmes and opportunities through a single point of contact.</p>
        </div>
        <a href="pages/study-destinations.html" class="btn btn-outline">View Study Destinations {ARROW}</a>
      </div>
      <div class="chip-row reveal">
{chips(n for n, _, _ in DESTS)}
      </div>
    </div>
  </section>

  <section class="section-dark">
    <div class="container">
      <div class="section-head-row reveal">
        <div class="section-head">
          <div class="eyebrow on-dark">University Partnerships</div>
          <h2 class="h-lg">Eleven direct collaborations, five recruitment markets</h2>
          <p>For universities, we focus on building sustainable recruitment partnerships supported by transparent communication and structured academic engagement.</p>
        </div>
        <a href="pages/university-partnerships.html" class="btn btn-outline-light">View Partnerships {ARROW}</a>
      </div>
      <div class="grid g-4 stagger">
        <div class="card card-dark stat-item"><div class="stat-num on-dark" data-count="7">0</div><div class="stat-label on-dark">Malta</div></div>
        <div class="card card-dark stat-item"><div class="stat-num on-dark" data-count="2">0</div><div class="stat-label on-dark">New Zealand</div></div>
        <div class="card card-dark stat-item"><div class="stat-num on-dark" data-count="1">0</div><div class="stat-label on-dark">Georgia</div></div>
        <div class="card card-dark stat-item"><div class="stat-num on-dark" data-count="1">0</div><div class="stat-label on-dark">Malaysia</div></div>
      </div>
    </div>
  </section>
''' + cta("Ready to begin your international education journey?",
          "Connect with Range Global Education to discuss destinations, programmes and the admission process.",
          "Contact Us", "pages/contact.html"))

# ---------------------------------------------------------------- ABOUT
value_items = "\n".join(
    f'''        <div class="value-item">
          <div class="v-num">{i:02d}</div>
          <div><h3>{t}</h3><p>{d}</p></div>
        </div>''' for i, (t, d) in enumerate(VALUES, 1))

why_cards = "\n".join(
    f'        <div class="card card-dark num-card"><span class="num">{i:02d}</span><h3>{t}</h3><p>{d}</p></div>'
    for i, (t, d) in enumerate(WHY, 1))

PAGES["about"] = dict(slug="about", active="about", depth=1,
  title="About Us — Range Global Education",
  desc="Our vision, mission, core values and philosophies, and why students and universities choose Range Global Education.",
  main=page_hero("About Us", "Empowering Through Education",
    "Education Beyond Borders — we connect institutions with capable applicants through informed representation, structured processes, and dedicated support.",
    [("Home", "../index.html"), ("About Us", None)]) + f'''
  <section>
    <div class="container">
      <div class="split">
        <div class="reveal">
          <div class="eyebrow">Vision</div>
          <h2 class="h-lg">Empowering Through Education</h2>
          <div style="margin-top:40px;">
            <div class="eyebrow">Mission</div>
            <p class="lead">To strengthen global academic collaboration by connecting institutions with capable applicants through informed representation, structured processes, and dedicated support throughout every step of the education journey.</p>
          </div>
          <div style="margin-top:34px; padding:26px 30px; background:var(--ink); color:#fff; border-radius:8px;">
            <div style="font-size:11.5px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.72);">Tagline</div>
            <div style="font-family:var(--display); text-transform:uppercase; font-size:clamp(21px,3vw,30px); color:#fff; margin-top:8px; letter-spacing:.03em;">Education Beyond Borders</div>
          </div>
        </div>
        <div class="reveal"><div class="image-card img-campus" style="width:100%; aspect-ratio:3/4;"></div></div>
      </div>
    </div>
  </section>

  <section class="section-alt">
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">Core Values &amp; Philosophies</div>
        <h2 class="h-lg">What guides every decision we make</h2>
      </div>
      <div class="reveal">
{value_items}
      </div>
    </div>
  </section>

  <section class="section-dark">
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow on-dark">Why Choose Range</div>
        <h2 class="h-lg">Connecting two frameworks through one coordinated process</h2>
        <p>Every student's educational journey is different, and every university has its own admission framework. Our role is to connect both through a structured and well-coordinated process.</p>
      </div>
      <div class="grid g-3 stagger">
{why_cards}
      </div>
    </div>
  </section>
''' + cta("Explore how we support students and institutions",
          "See the full support journey, or review our direct collaborations and recruitment partnerships.",
          "Student Services", "student-services.html",
          second=("Partnerships", "university-partnerships.html")))

# ---------------------------------------------------------------- STUDENT SERVICES
rail = "\n".join(
    f'''        <div class="rail-step reveal">
          <div class="rail-num">{i:02d}</div>
          <div><h3>{name}</h3><p>{body}</p></div>
        </div>''' for i, (name, body) in enumerate(STEPS, 1))

PAGES["student-services"] = dict(slug="student-services", active="student-services", depth=1,
  title="Student Services — Range Global Education",
  desc="The complete Range Global Education support journey, from Discover through to Begin Your Studies.",
  main=page_hero("Student Services", "Complete Support Services",
    "We support applicants throughout each stage of their international academic journey.",
    [("Home", "../index.html"), ("For Students", None), ("Student Services", None)]) + f'''
  <section>
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">The Journey</div>
        <h2 class="h-lg">Ten stages, one coordinated process</h2>
        <p>Our objective is to help future graduates understand each stage of the process, enabling informed decisions before beginning their studies abroad.</p>
      </div>
      <div class="journey-rail">
{rail}
      </div>
    </div>
  </section>

  <section class="section-alt">
    <div class="container">
      <div class="split">
        <div class="reveal">
          <div class="eyebrow">For Future Graduates</div>
          <h2 class="h-lg">What we handle with you</h2>
          <div style="margin-top:24px;">
            <div class="chip-row">
{chips(["Destination Selection", "Programme Guidance", "Admission Process", "Visa Support", "Pre-Departure Preparation"])}
            </div>
          </div>
          <p style="margin-top:26px; font-size:15.5px;">Our discussions begin with the student's academic objectives, preferred study destination, and long-term aspirations before exploring programme options.</p>
          <a href="contact.html" class="btn btn-primary" style="margin-top:28px;">Start Your Journey {ARROW}</a>
        </div>
        <div class="reveal"><div class="image-card img-meeting" style="width:100%; aspect-ratio:4/3;"></div></div>
      </div>
    </div>
  </section>
''' + cta("Have a question about any stage?",
          "Connect with Range Global Education to discuss destinations, programmes and the admission process.",
          "Contact Us", "contact.html"))

# ---------------------------------------------------------------- STUDY DESTINATIONS
PAGES["study-destinations"] = dict(slug="study-destinations", active="study-destinations", depth=1,
  title="Study Destinations — Range Global Education",
  desc="Compare programmes and opportunities across Malta, Malaysia, Ireland, the Netherlands, the United States, New Zealand, Canada and Georgia.",
  main=page_hero("Study Destinations", "Education Beyond Borders",
    "Range Global Education connects students with higher education opportunities across established international study destinations.",
    [("Home", "../index.html"), ("For Students", None), ("Study Destinations", None)]) + f'''
  <section>
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">Approved Destinations</div>
        <h2 class="h-lg">Eight destinations, one point of contact</h2>
        <p>International applicants can compare programmes and opportunities across Malta, Malaysia, Ireland, the Netherlands, the United States, New Zealand, Canada, and Georgia through a single point of contact.</p>
      </div>
      <div class="dest-grid stagger">
{dest_cards()}
      </div>
{note("Demo note — destination names are confirmed. Per-destination detail (overview, visa notes, cost guidance, intakes, work rights and entry requirements) is waiting on client content and has deliberately not been invented.")}
    </div>
  </section>

  <section class="section-dark">
    <div class="container">
      <div class="split">
        <div class="reveal">
          <div class="eyebrow on-dark">Global Reach</div>
          <h2 class="h-lg">How students are matched to institutions</h2>
          <p style="margin-top:18px; font-size:16px;">Where appropriate, students are guided towards institutions that best align with their academic background, career objectives, and preferred study destination.</p>
        </div>
        <div class="reveal">
          <p style="font-size:15.5px;">Alongside our direct university collaborations, Range Global Education has access to a broader international network of higher education institutions through authorised global recruitment partnerships.</p>
          <a href="university-partnerships.html" class="btn btn-outline-light" style="margin-top:26px;">View University Partnerships {ARROW}</a>
        </div>
      </div>
    </div>
  </section>
''' + cta("Not sure which destination fits?",
          "Our discussions begin with your academic objectives and long-term aspirations before exploring programme options.",
          "Talk To Us", "contact.html"))

# ---------------------------------------------------------------- UNIVERSITY PARTNERSHIPS
# Merged: this page now owns the full institution list. The former separate
# universities.html carried no unique content (37% byte-identical) and was cut.
PAGES["university-partnerships"] = dict(slug="university-partnerships", active="partners", depth=1,
  title="University Partnerships — Range Global Education",
  desc="Direct university collaborations and authorised global recruitment partnerships at Range Global Education.",
  main=page_hero("For Universities", "Partnership Beyond Transactions",
    "For universities, we focus on building sustainable recruitment partnerships supported by transparent communication and structured academic engagement.",
    [("Home", "../index.html"), ("University Partnerships", None)]) + f'''
  <section>
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">Direct Collaborations</div>
        <h2 class="h-lg">Eleven institutions across four countries</h2>
        <p>We work to establish direct partnerships with universities, enabling clear institutional communication and effective student recruitment.</p>
      </div>
      <div class="grid g-2 stagger">
{country_blocks()}
      </div>
{note("Demo note — institution names are confirmed. Descriptions, campus details, accreditation wording, available programmes, entry requirements, intakes and fees are waiting on client content and institution-approved partner wording.")}
    </div>
  </section>

  <section class="section-alt">
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">Global Recruitment Partnerships</div>
        <h2 class="h-lg">Authorised partnerships across five markets</h2>
        <p>We establish direct partnerships with universities while also providing access to a broader network of internationally recognised institutions through authorised recruitment partnerships.</p>
      </div>
      <div class="chip-row reveal">
{chips(RECRUIT)}
      </div>
      <p class="lead reveal" style="margin-top:30px; max-width:720px;">We continue to expand our institutional partnerships to create broader academic opportunities for international students.</p>
    </div>
  </section>

  <section class="section-dark">
    <div class="container">
      <div class="split">
        <div class="reveal">
          <div class="eyebrow on-dark">What We Do For Institutions</div>
          <h2 class="h-lg">Five ways we work with universities</h2>
        </div>
        <div class="reveal">
          <div class="chip-row">
{chips(["Direct Collaborations", "International Recruitment", "Market Representation", "Student Outreach", "Partnership Development"])}
          </div>
          <a href="contact.html" class="btn btn-outline-light" style="margin-top:28px;">Partner With Us {ARROW}</a>
        </div>
      </div>
    </div>
  </section>
''' + cta("Looking to recruit from Sri Lanka and beyond?",
          "We maintain communication with both institutions and applicants throughout the admission process.",
          "Contact Us", "contact.html"))

# ---------------------------------------------------------------- SUCCESS STORIES
testi_cards = "\n".join(
    f'''        <div class="testi-card"><span class="quote-mark">&ldquo;</span><h3>{t}</h3><p>{d}</p>
          <div class="slot"><span class="avatar"></span><span class="lines"><span></span><span></span></span></div>
          <div style="margin-top:14px;"><span class="tag tag-pending">Awaiting client content</span></div>
        </div>''' for t, d in TESTI)

PAGES["success-stories"] = dict(slug="success-stories", active="success-stories", depth=1,
  title="Success Stories — Range Global Education",
  desc="Student stories, parent testimonials, university partner feedback and video testimonials from Range Global Education.",
  main=page_hero("Success Stories", "Testimonials",
    "Partnership beyond transactions — we develop meaningful connections with learners, families, and educational institutions.",
    [("Home", "../index.html"), ("For Students", None), ("Success Stories", None)]) + f'''
  <section>
    <div class="container">
      <div class="section-head center reveal">
        <div class="eyebrow center">Categories</div>
        <h2 class="h-lg">Four kinds of story we share</h2>
      </div>
      <div class="grid g-4 stagger">
{testi_cards}
      </div>
{note("Demo note — the four testimonial categories are confirmed. Student names, parent names, university partner names, quotes, photos, videos, destination outcomes and permission to publish are all waiting on the client. No stories have been invented for this build.")}
    </div>
  </section>
''' + cta("Ready to write your own story?",
          "Connect with Range Global Education to begin your international education journey.",
          "Start Your Journey", "contact.html"))

# ---------------------------------------------------------------- RESOURCES
res_cards = "\n".join(
    f'''        <div class="res-card" id="{i}">
          <h3>{t}</h3>
          <p>{d}</p>
          <div class="res-foot"><span class="tag tag-pending">Awaiting client content</span>
          <p style="font-size:12.5px; margin-top:10px;">Needed: {need}.</p></div>
        </div>''' for i, t, d, need in RES)

PAGES["resources"] = dict(slug="resources", active="resources", depth=1,
  title="Resources — Range Global Education",
  desc="Events and webinars, scholarship opportunities, news and updates, FAQ and blog from Range Global Education.",
  main=page_hero("Resources", "Continuous Learning",
    "We embrace change in global education trends, technology, regulations and institutional requirements to remain responsive in a rapidly evolving environment.",
    [("Home", "../index.html"), ("Resources", None)]) + f'''
  <section>
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">In Preparation</div>
        <h2 class="h-lg">Sections awaiting client content</h2>
        <p>These sections are planned and reserved in the site structure. They are shown here honestly rather than filled with placeholder articles.</p>
      </div>
      <div class="grid g-3 stagger">
{res_cards}
      </div>
{note("Demo note — the approved content document lists these five pages but supplies no content for them. Recommendation for the live build: keep them out of the public navigation until the client supplies real content, rather than publishing empty or invented pages.")}
    </div>
  </section>
''' + cta("Have a question we haven't covered?",
          "Connect with Range Global Education and we will guide you through the process.",
          "Contact Us", "contact.html"))

# ---------------------------------------------------------------- CONTACT
dest_opts = "\n".join(f'                  <option>{n}</option>' for n, _, _ in DESTS)

PAGES["contact"] = dict(slug="contact", active="contact", depth=1,
  title="Contact — Range Global Education",
  desc="Connect with Range Global Education about student services, university partnerships or general enquiries.",
  main=page_hero("Contact", "Start Your Journey",
    "Tell us about your academic objectives, preferred study destination, and long-term aspirations — that is where every conversation begins.",
    [("Home", "../index.html"), ("Contact", None)]) + f'''
  <section>
    <div class="container">
      <div class="split" style="align-items:flex-start;">
        <div class="reveal">
          <div class="eyebrow">Send An Enquiry</div>
          <h2 class="h-lg" style="margin-bottom:28px;">How can we help?</h2>
          <form data-demo-form novalidate>
            <div class="form-grid">
              <div class="field"><label for="f-name">Full name</label><input id="f-name" name="name" type="text" required placeholder="Your full name"></div>
              <div class="field"><label for="f-email">Email address</label><input id="f-email" name="email" type="email" required placeholder="you@example.com"></div>
              <div class="field"><label for="f-phone">Phone / WhatsApp</label><input id="f-phone" name="phone" type="tel" placeholder="Include country code"></div>
              <div class="field"><label for="f-interest">Interest type</label>
                <select id="f-interest" name="interest">
                  <option>Student Services</option>
                  <option>University Partnerships</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div class="field full"><label for="f-dest">Preferred destination</label>
                <select id="f-dest" name="destination">
                  <option>Not decided yet</option>
{dest_opts}
                </select>
              </div>
              <div class="field full"><label for="f-msg">Message</label><textarea id="f-msg" name="message" placeholder="Tell us about your academic background and what you would like to study."></textarea></div>
              <div class="full">
                <button type="submit" class="btn btn-primary">Send Enquiry {ARROW}</button>
                <div class="form-success">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>
                  Thank you — this is a demo form, so nothing was sent. The live build will connect to the client's inbox.
                </div>
              </div>
              <p class="form-consent full">Consent wording for form submissions is waiting on client confirmation and will be added before launch.</p>
            </div>
          </form>
        </div>

        <div class="reveal">
          <div style="background:var(--ink); color:#fff; padding:40px 36px; border-radius:var(--radius);">
            <div class="eyebrow on-dark">Contact Details</div>
            <h3 style="color:#fff; font-size:20px; margin-bottom:6px;">Range Global Education (Pvt) Ltd</h3>
            <ul style="margin-top:18px;">
              <li class="contact-tile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div><h4>Office address</h4><p>Pending client confirmation</p></div>
              </li>
              <li class="contact-tile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div><h4>Phone</h4><p>Pending client confirmation</p></div>
              </li>
              <li class="contact-tile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m4 6 8 6 8-6"/></svg>
                <div><h4>Email</h4><p>Pending client confirmation</p></div>
              </li>
              <li class="contact-tile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <div><h4>Business hours</h4><p>Pending client confirmation</p></div>
              </li>
            </ul>
            <div class="placeholder-note" style="margin-top:24px;">{INFO}
              <span>Phone, email, WhatsApp, address, Google Maps link, business hours and social links are all waiting on the client. The layout is final — only the values need dropping in.</span>
            </div>
          </div>

          <div style="margin-top:24px; background:var(--soft); border:1px dashed #B9B0A2; border-radius:var(--radius); aspect-ratio:16/9; display:flex; align-items:center; justify-content:center; text-align:center; padding:24px;">
            <div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="width:38px; height:38px; color:#9A9284; margin:0 auto 10px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div style="font-size:12px; letter-spacing:.11em; text-transform:uppercase; color:var(--mid-gray);">Google Maps embed — awaiting office address</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-alt section-tight">
    <div class="container">
      <div class="section-head center reveal" style="margin-bottom:32px;">
        <div class="eyebrow center">Where To Next</div>
        <h2 class="h-lg">Explore before you enquire</h2>
      </div>
      <div class="grid g-3 stagger">
        <a class="card card-accent" href="student-services.html"><h3>Student Services</h3><p>The complete ten-stage support journey from Discover to Begin Your Studies.</p></a>
        <a class="card card-accent" href="study-destinations.html"><h3>Study Destinations</h3><p>Eight approved destinations you can compare through a single point of contact.</p></a>
        <a class="card card-accent" href="university-partnerships.html"><h3>University Partnerships</h3><p>Direct collaborations and authorised global recruitment partnerships.</p></a>
      </div>
    </div>
  </section>
''')

# ================================================================ write
(ROOT / "pages").mkdir(exist_ok=True)
for key, p in PAGES.items():
    html = shell(p["slug"], p["active"], p["title"], p["desc"], p["main"], p["depth"])
    out = ROOT / ("index.html" if p["depth"] == 0 else f"pages/{p['slug']}.html")
    out.write_text(html)
    print("wrote", out.relative_to(ROOT))

# remove the merged-away page
old = ROOT / "pages" / "universities.html"
if old.exists():
    old.unlink()
    print("removed pages/universities.html (merged into university-partnerships.html)")
