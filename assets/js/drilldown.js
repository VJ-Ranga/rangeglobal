/* ===========================================================
   Range Global Education — Destination / university list renderers
   Reads RG_DATA (assets/js/data.js) and fills the page shell from the
   ?c= query parameter. Universities are displayed as non-clickable cards.
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
  function officialLink(u) {
    return u.website ? '<a class="official-link" href="' + esc(u.website) + '" target="_blank" rel="noopener noreferrer">Official Website</a>' : '';
  }

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function notFound(what, backHref, backLabel) {
    set('dd-eyebrow', esc(what));
    set('dd-title', 'Not found');
    set('dd-lead', 'That ' + esc(what.toLowerCase()) + ' does not exist. Head back and pick one from the list.');
    set('dd-crumb', '<a href="../index.html">Home</a><span class="sep">/</span><a href="' + backHref + '">' + backLabel + '</a>');
    set('dd-body', '<div class="container"><a class="btn btn-outline" href="' + backHref + '">Back to ' + backLabel + ' ' + ARROW + '</a></div>');
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
        return '<li><div class="row-item">' +
          '<span class="row-main"><strong>' + esc(u.name) + '</strong>' +
          '<small>' + esc(u.city) + '</small><small>' + esc(u.type) + '</small></span>' +
          '<span class="tag tag-red">Listed partner</span>' + officialLink(u) + '</div></li>';
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
            '<h3>How we help</h3>' +
            '<div class="aside-row"><span class="aside-label">Shortlist</span><p>Shortlist suitable institutions based on your academic background and study goals.</p></div>' +
            '<div class="aside-row"><span class="aside-label">Check</span><p>Check current entry options and application requirements before you apply.</p></div>' +
            '<div class="aside-row"><span class="aside-label">Guide</span><p>Guide documents and application steps with a clear process from enquiry to submission.</p></div>' +
            '<div class="aside-row"><span class="aside-label">Prepare</span><p>Prepare for visa and pre-departure stages after an offer is received.</p></div>' +
            '<a class="btn btn-primary" style="width:100%; margin-top:20px;" href="contact.html">Ask about ' + esc(d.name) + ' ' + ARROW + '</a>' +
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
            return '<div class="uni-card">' +
              '<strong>' + esc(u.name) + '</strong>' +
              '<small>' + esc(u.city) + '</small>' +
              '<div class="uni-type">' + esc(u.type) + '</div>' +
              officialLink(u) + '</div>';
          }).join('') + '</div></div>';
      }).join('');
  }

  var page = document.body.getAttribute('data-dd');
  if (page === 'destination') renderDestination();
  renderDestinationIndex();
  renderUniversityIndex();
})();
