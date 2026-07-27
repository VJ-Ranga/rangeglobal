// Range Global Education — shared interactions
(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- page loader -------------------------------------------------------
  var loader = document.querySelector('.loader');
  if(loader){
    var hide = function(){
      loader.classList.add('done');
      window.setTimeout(function(){ loader.setAttribute('hidden',''); }, 600);
    };
    if(document.readyState === 'complete'){ window.setTimeout(hide, 200); }
    else { window.addEventListener('load', function(){ window.setTimeout(hide, 350); }); }
    // never trap the page behind the loader if something fails to load
    window.setTimeout(hide, 4000);
  }

  // ---- mobile menu -------------------------------------------------------
  var burger = document.querySelector('.nav-burger');
  var menu = document.querySelector('.mobile-menu');
  if(burger && menu){
    burger.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && menu.classList.contains('open')){ burger.click(); burger.focus(); }
    });
  }

  // ---- sticky nav shadow -------------------------------------------------
  var nav = document.querySelector('.nav');
  if(nav){
    var onScrollNav = function(){ nav.classList.toggle('stuck', window.scrollY > 12); };
    window.addEventListener('scroll', onScrollNav, { passive:true });
    onScrollNav();
  }

  // ---- scroll reveal -----------------------------------------------------
  // Opt in only once JS is running, so a JS failure leaves content visible
  // rather than stuck at opacity:0.
  var revealEls = document.querySelectorAll('.reveal, .stagger');
  if('IntersectionObserver' in window && revealEls.length && !reduced){
    document.body.classList.add('js-reveal');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  }

  // ---- stat counters -----------------------------------------------------
  var counters = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window && counters.length){
    var counted = new WeakSet();
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && !counted.has(entry.target)){
          counted.add(entry.target);
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function(el){ cio.observe(el); });
  }
  function animateCount(el){
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if(reduced){ el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---- demo form (no backend) -------------------------------------------
  document.querySelectorAll('form[data-demo-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = form.querySelector('.form-success');
      form.querySelectorAll('input,select,textarea').forEach(function(f){ f.disabled = true; });
      var btn = form.querySelector('button[type="submit"]');
      if(btn) btn.style.display = 'none';
      if(note){ note.style.display = 'flex'; note.setAttribute('role','status'); }
    });
  });

  // ---- back to top -------------------------------------------------------
  var topBtn = document.querySelector('.top-float');
  if(topBtn){
    var toggleTopBtn = function(){ topBtn.classList.toggle('show', window.scrollY > 420); };
    window.addEventListener('scroll', toggleTopBtn, { passive:true });
    toggleTopBtn();
    topBtn.addEventListener('click', function(){
      window.scrollTo({ top:0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }
})();
