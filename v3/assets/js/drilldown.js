/* ===========================================================
   Range Global Education — Destination / University / Program renderers
   Reads RG_DATA (assets/js/data.js) and fills the page shell from the
   ?c= / ?u= / ?p= query parameter.
   =========================================================== */
(function () {
  var D = window.RG_DATA;
  if (!D) return;

  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(id) { return document.getElementById(id); }
  function set(id, html) { var n = el(id); if (n) n.innerHTML = html; }
  function title(t) { document.title = t + ' — Range Global Education'; }

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function notFound(what, backHref, backLabel) {
    set('dd-eyebrow', esc(what));
    set('dd-title', 'Not found');
    set('dd-lead', 'That ' + esc(what.toLowerCase()) + ' does not exist. Head back and pick one from the list.');
    set('dd-crumb', '<a href="../index.html">Home</a><span class="sep">/</span><a href="' + backHref + '">' + backLabel + '</a>');
    set('dd-body', '<div class="container"><a class="btn btn-outline" href="' + backHref + '">Back to ' + backLabel + ' ' + ARROW + '</a></div>');
  }

  function factCard(label, value) {
    return '<div class="fact"><div class="fact-label">' + esc(label) + '</div>' +
           '<div class="fact-value">' + esc(value) + '</div></div>';
  }

  function sampleBadge() {
    return '<span class="tag tag-pending">Sample detail</span>';
  }

  function sampleNotice(text) {
    return '<div class="placeholder-note" style="margin-bottom:30px;">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
      '<span>' + text + '</span></div>';
  }

  // ---------------------------------------------------------------- DESTINATION
  function renderDestination() {
    var d = D.findDestination(param('c'));
    if (!d) return notFound('Destination', 'destinations.html', 'Destinations');

    title(d.name);
    set('dd-eyebrow', 'Study Destination');
    set('dd-title', esc(d.name));
    set('dd-lead', esc(d.blurb));
    set('dd-crumb', '<a href="../index.html">Home</a><span class="sep">/</span>' +
      '<a href="destinations.html">Destinations</a><span class="sep">/</span>' + esc(d.name));

    var unis = d.universities || [];
    var listHtml;
    if (unis.length) {
      listHtml = '<ul class="row-list">' + unis.map(function (u) {
        return '<li><a class="row-item" href="university.html?u=' + esc(u.slug) + '">' +
          '<span class="row-main"><strong>' + esc(u.name) + '</strong>' +
          '<small>' + esc(u.city) + ' · ' + esc(u.type) + '</small></span>' +
          '<span class="tag tag-red">Direct partner</span>' +
          '<span class="row-go">' + ARROW + '</span></a></li>';
      }).join('') + '</ul>';
    } else {
      listHtml = '<div class="placeholder-note">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
        '<span>No named direct partner institutions in ' + esc(d.name) + ' yet. This destination is reached through our authorised global recruitment partnerships — talk to us and we will match you to institutions in our wider network.</span></div>';
    }

    set('dd-body',
      '<div class="container">' +
        '<div class="dd-layout">' +
          '<div>' +
            '<div class="eyebrow">Overview</div>' +
            '<p class="lead" style="margin-bottom:34px;">' + esc(d.blurb) + '</p>' +
            '<div class="eyebrow">Universities in ' + esc(d.name) + '</div>' +
            listHtml +
          '</div>' +
          '<aside class="dd-aside">' +
            '<h3>Country notes</h3>' +
            '<div class="aside-row"><span class="aside-label">Visa</span><p>' + esc(d.notes.visa) + '</p></div>' +
            '<div class="aside-row"><span class="aside-label">Cost of living</span><p>' + esc(d.notes.cost) + '</p></div>' +
            '<div class="aside-row"><span class="aside-label">Intakes</span><p>' + esc(d.notes.intakes) + '</p></div>' +
            '<div style="margin-top:8px;">' + sampleBadge() + '</div>' +
            '<a class="btn btn-primary" style="width:100%; margin-top:20px;" href="contact.html">Ask about ' + esc(d.name) + ' ' + ARROW + '</a>' +
          '</aside>' +
        '</div>' +
      '</div>');
  }

  // ---------------------------------------------------------------- UNIVERSITY
  function renderUniversity() {
    var hit = D.findUniversity(param('u'));
    if (!hit) return notFound('University', 'universities.html', 'Universities');
    var u = hit.university, d = hit.destination;

    title(u.name);
    set('dd-eyebrow', 'Direct Partner University');
    set('dd-title', esc(u.name));
    set('dd-lead', esc(u.city) + ' · ' + esc(u.type));
    set('dd-crumb', '<a href="../index.html">Home</a><span class="sep">/</span>' +
      '<a href="destinations.html">Destinations</a><span class="sep">/</span>' +
      '<a href="destination.html?c=' + esc(d.slug) + '">' + esc(d.name) + '</a><span class="sep">/</span>' + esc(u.name));

    var progs = u.programs || [];
    var progHtml = progs.length
      ? '<ul class="row-list">' + progs.map(function (p) {
          return '<li><a class="row-item" href="program.html?p=' + esc(p.slug) + '">' +
            '<span class="row-main"><strong>' + esc(p.name) + '</strong>' +
            '<small>' + esc(p.level) + ' · ' + esc(p.duration) + '</small></span>' +
            (p.sample ? sampleBadge() : '') +
            '<span class="row-go">' + ARROW + '</span></a></li>';
        }).join('') + '</ul>'
      : '<p class="lead">Programme list awaiting confirmation from the institution.</p>';

    set('dd-body',
      '<div class="container">' +
        '<div class="dd-layout">' +
          '<div>' +
            '<div class="eyebrow">Overview</div>' +
            '<div class="fact-grid">' +
              factCard('Location', u.city) +
              factCard('Type', u.type) +
              factCard('Accreditation', u.accreditation) +
              factCard('Intake periods', u.intakes) +
            '</div>' +
            '<div class="eyebrow" style="margin-top:44px;">Programmes offered</div>' +
            sampleNotice('Programme names, durations, tuition and entry requirements shown here are <strong>sample data</strong> for demo purposes. They will be replaced with the institution\\u2019s confirmed course details.') +
            progHtml +
          '</div>' +
          '<aside class="dd-aside">' +
            '<h3>Interested in this university?</h3>' +
            '<p>Talk to a counsellor about entry requirements, deadlines and how to apply through Range Global Education.</p>' +
            '<a class="btn btn-primary" style="width:100%; margin-top:18px;" href="contact.html">Start your application ' + ARROW + '</a>' +
            '<a class="btn btn-outline" style="width:100%; margin-top:10px;" href="destination.html?c=' + esc(d.slug) + '">More in ' + esc(d.name) + '</a>' +
          '</aside>' +
        '</div>' +
      '</div>');
  }

  // ---------------------------------------------------------------- PROGRAM
  function renderProgram() {
    var hit = D.findProgram(param('p'));
    if (!hit) return notFound('Programme', 'destinations.html', 'Destinations');
    var p = hit.program, u = hit.university, d = hit.destination;

    title(p.name);
    set('dd-eyebrow', esc(p.level) + ' Programme');
    set('dd-title', esc(p.name));
    set('dd-lead', esc(u.name) + ' · ' + esc(d.name));
    set('dd-crumb', '<a href="../index.html">Home</a><span class="sep">/</span>' +
      '<a href="destinations.html">Destinations</a><span class="sep">/</span>' +
      '<a href="destination.html?c=' + esc(d.slug) + '">' + esc(d.name) + '</a><span class="sep">/</span>' +
      '<a href="university.html?u=' + esc(u.slug) + '">' + esc(u.name) + '</a><span class="sep">/</span>' + esc(p.name));

    set('dd-body',
      '<div class="container">' +
        '<div class="dd-layout">' +
          '<div>' +
            (p.sample ? sampleNotice('<strong>Sample programme.</strong> Tuition, requirements and intake dates shown here are illustrative and will be replaced with the university\\u2019s confirmed course details.') : '') +
            '<div class="eyebrow">Programme details</div>' +
            '<div class="fact-grid">' +
              factCard('Level', p.level) +
              factCard('Duration', p.duration) +
              factCard('Tuition', p.tuition) +
              factCard('Intakes', p.intakes) +
            '</div>' +
            '<div class="eyebrow" style="margin-top:44px;">Entry requirements</div>' +
            '<p class="lead">' + esc(p.requirements) + '</p>' +
          '</div>' +
          '<aside class="dd-aside">' +
            '<h3>Apply through Range Global</h3>' +
            '<p>Our counsellors handle your application, documentation and visa process for this programme from start to finish.</p>' +
            '<a class="btn btn-primary" style="width:100%; margin-top:18px;" href="contact.html">Start my application ' + ARROW + '</a>' +
            '<a class="btn btn-outline" style="width:100%; margin-top:10px;" href="university.html?u=' + esc(u.slug) + '">Back to ' + esc(u.name) + '</a>' +
          '</aside>' +
        '</div>' +
      '</div>');
  }

  // ---------------------------------------------------------------- INDEXES
  function renderDestinationIndex() {
    var host = el('dd-destinations');
    if (!host) return;
    host.innerHTML = D.destinations.map(function (d) {
      var photoCls = d.needsPhoto ? 'country-photo no-photo' : 'country-photo dest-' + esc(d.slug);
      return '<a class="country-card" href="destination.html?c=' + esc(d.slug) + '">' +
        '<div class="' + photoCls + '">' +
          '<span class="country-flag">' + esc(d.flag) + '</span>' +
          (d.needsPhoto ? '<span class="photo-pending">Photo to be supplied</span>' : '') +
        '</div>' +
        '<div class="country-body">' +
          '<h3>' + esc(d.name) + '</h3>' +
          '<p>' + esc(d.intro) + '</p>' +
        '</div></a>';
    }).join('');
  }

  function renderUniversityIndex() {
    var host = el('dd-universities');
    if (!host) return;
    host.innerHTML = D.destinations.filter(function (d) { return d.universities.length; })
      .map(function (d) {
        return '<div class="country-group">' +
          '<div class="country-label">' + esc(d.name) +
            '<span>' + d.universities.length + ' institution' + (d.universities.length === 1 ? '' : 's') + '</span></div>' +
          '<div class="uni-grid">' + d.universities.map(function (u) {
            return '<a class="uni-card" href="university.html?u=' + esc(u.slug) + '">' +
              '<strong>' + esc(u.name) + '</strong>' +
              '<small>' + esc(u.city) + '</small>' +
              '<span class="uni-type">' + esc(u.type) + '</span>' +
              '<span class="uni-go">' + ARROW + '</span></a>';
          }).join('') + '</div></div>';
      }).join('');
  }

  var page = document.body.getAttribute('data-dd');
  if (page === 'destination') renderDestination();
  else if (page === 'university') renderUniversity();
  else if (page === 'program') renderProgram();
  renderDestinationIndex();
  renderUniversityIndex();
})();
