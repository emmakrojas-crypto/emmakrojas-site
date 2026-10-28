/* Emma K. Rojas site script: header, footer, images and the portfolio sketchbooks.
   Loaded on every page (Settings > Developer Tools > Code Injection > Footer). */
(function () {
  'use strict';
  if (window.__ekr) return; window.__ekr = true;
  var me = document.currentScript || (function () { var s = document.querySelectorAll('script[src*="ekr.js"]'); return s[s.length - 1]; })();
  var BASE = (me && me.src ? me.src : '').replace(/[^\/]*(\?.*)?$/, '');
  function url(p) { return /^https?:|^\//.test(p) ? p : BASE + p; }

  var NAV = [['about', '/about'], ['portfolio', '/portfolio'], ['experience', '/experience'], ['r\u00e9sum\u00e9', '/resume'], ['testimonials', '/testimonials'], ['contact', '/contact']];
  var EMAIL = 'emmakrojas@gmail.com', LI = 'https://www.linkedin.com/in/emmakrojas', IG = 'https://www.instagram.com/atelier_rojas_';
  var I_LI = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.75" y="2.75" width="18.5" height="18.5" rx="3.5"></rect><path d="M7.6 10.6V17"></path><circle cx="7.6" cy="7.4" r="1.05" class="f"></circle><path d="M11.2 17v-6.4M11.2 13.4c0-1.8 1.2-2.9 2.8-2.9s2.7 1.1 2.7 2.9V17"></path></svg>';
  var I_IG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.2"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.3" cy="6.7" r="1.05" class="f"></circle></svg>';
  var I_MAIL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.75" y="5.25" width="18.5" height="13.5" rx="1.6"></rect><path d="M3.4 6.6 12 13l8.6-6.4"></path></svg>';
  var BURGER = '<svg viewBox="0 0 24 24" aria-hidden="true"><filter id="mwob"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="1.6"/></filter><g filter="url(#mwob)"><path d="M3.5 7.2 C9 6.6 15 7.4 20.5 6.8"/><path d="M3.5 12.2 C8 12.6 13 11.8 17 12.3"/><path d="M3.5 17.3 C9 16.8 15.5 17.6 20 17.1"/></g></svg>';

  function here() { return (location.pathname.replace(/\/+$/, '') || '/').toLowerCase(); }
  function links() {
    var h = here();
    return NAV.map(function (n) { var on = h === n[1] || h.indexOf(n[1] + '/') === 0; return '<a href="' + n[1] + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' + n[0] + '</a>'; }).join('\n');
  }
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }


  /* Squarespace paints section colours on several wrappers; clear every one so the page colour shows */
  function clearBackgrounds() {
    var blocks = document.querySelectorAll('.ekr-page');
    var seen = [];
    blocks.forEach(function (b) {
      var n = b.parentElement;
      while (n && n !== document.body) {
        if (seen.indexOf(n) < 0) {
          seen.push(n);
          n.style.setProperty('background-color', 'transparent', 'important');
          n.style.setProperty('background-image', 'none', 'important');
          if (n.classList && n.classList.contains('page-section')) {
            [].forEach.call(n.querySelectorAll('.section-border, .section-background, .section-background-overlay, .section-divider-display'), function (x) { x.style.setProperty('display', 'none', 'important'); });
          }
        }
        n = n.parentElement;
      }
    });
    // every other section on our pages too (e.g. the contact form section)
    document.querySelectorAll('#page .page-section').forEach(function (sec) {
      sec.style.setProperty('background-color', 'transparent', 'important');
      [].forEach.call(sec.querySelectorAll('.section-border, .section-background, .section-background-overlay'), function (x) { x.style.setProperty('display', 'none', 'important'); });
    });
    ['siteWrapper', 'page', 'sections'].forEach(function (id) { var e = document.getElementById(id); if (e) { e.style.setProperty('background-color', 'transparent', 'important'); e.style.setProperty('background-image', 'none', 'important'); } });
    document.documentElement.style.setProperty('background-color', document.body.classList.contains('ekr-desk') ? (document.body.style.getPropertyValue('--ekr-desk') || '#8BA2A6') : '#EEEAE3', 'important');
  }

  function start() {
    var page = document.querySelector('.ekr-page');
    var kind = page ? page.getAttribute('data-page') : '';
    var editing = /\/config\b/.test(location.pathname) || document.body.classList.contains('sqs-edit-mode-active');
    document.body.classList.add('ekr-site');
    if (kind === 'portfolio') document.body.classList.add('ekr-desk');
    clearBackgrounds();
    setTimeout(clearBackgrounds, 600); setTimeout(clearBackgrounds, 2000);
    // images inside our blocks
    document.querySelectorAll('[data-ekr-src]').forEach(function (im) { im.src = url(im.getAttribute('data-ekr-src')); });
    var main = document.querySelector('#page') || document.querySelector('main');
    if (!main || !main.parentNode) return;
    if (kind !== 'home' && !document.querySelector('.ekr-hdr')) {
      var hdr = el('<div class="ekr ekr-hdr"><header class="wrap hdr">' +
        '<a class="logo" href="/" aria-label="Emma K. Rojas, home"><img src="' + url('site/logo.svg') + '" alt="EKR"></a>' +
        '<nav class="nav" aria-label="Primary">' + links() + '</nav>' +
        '<details class="mnav"><summary aria-label="Menu">' + BURGER + '</summary><nav class="mpanel" aria-label="Primary">' + links() + '</nav></details>' +
        '</header></div>');
      main.parentNode.insertBefore(hdr, main);
      document.addEventListener('click', function (e) { var d = hdr.querySelector('.mnav'); if (d && d.open && !d.contains(e.target)) d.open = false; });
    }
    if (kind !== 'home' && kind !== 'portfolio' && !document.querySelector('.ekr-ftr')) {
      var ftr = el('<div class="ekr ekr-ftr"><footer class="wrap ftr mono"><span>Emma K. Rojas</span><nav aria-label="Elsewhere">' +
        '<a class="ico" href="mailto:' + EMAIL + '" aria-label="Email ' + EMAIL + '">' + I_MAIL + '</a>' +
        '<a class="ico" href="' + LI + '" aria-label="LinkedIn">' + I_LI + '</a>' +
        '<a class="ico" href="' + IG + '" aria-label="Instagram">' + I_IG + '</a></nav></footer></div>');
      main.parentNode.insertBefore(ftr, main.nextSibling);
    }
    var mq = window.matchMedia('(max-width: 900px)');
    var fold = function () { document.querySelectorAll('details.res-d:not([data-keep])').forEach(function (d) { d.open = !mq.matches; }); };
    fold(); if (mq.addEventListener) mq.addEventListener('change', fold);
    var pf = document.querySelector('[data-ekr-portfolio]');
    if (pf && !pf.__ekr) { pf.__ekr = true; loadBooks(pf); }
  }

  /* ================= portfolio sketchbooks ================= */
  function loadBooks(root) {
    root.innerHTML = '<p class="mono" style="text-align:center;padding:80px 0">opening the sketchbooks\u2026</p>';
    fetch(url('books.json')).then(function (r) { return r.json(); }).then(function (books) { Flip(root, books); })
      .catch(function () { root.innerHTML = '<p class="mono" style="text-align:center;padding:80px 0">The sketchbooks could not load. Check that the site folder is published.</p>'; });
  }

  var PL = [['luz', 'La Luz Que No Se Apaga'], ['mb', 'Mariner\u2019s Brine'], ['rr', 'Ripe to Rot'], ['p3', 'Anatomy of Fire'], ['lt', 'The Little Things']];
  var TC = {
    luz: [['#E2E3D3', '#1F1B1E'], ['#B8973F', '#1F1B1E'], ['#8F5A62', '#F2EBE1'], ['#A16437', '#F2EBE1'], ['#5E7A80', '#F2EBE1']],
    mb: [['#3B3A3E', '#F2EBE1'], ['#B0457C', '#F2EBE1'], ['#D8B4C5', '#1F1B1E']],
    rr: [['#D9A93B', '#1F1B1E'], ['#8FB2AD', '#1F1B1E'], ['#E07A2E', '#1F1B1E']],
    p3: [['#B5562A', '#F2EBE1'], ['#8A8580', '#1F1B1E'], ['#D9CFC4', '#1F1B1E'], ['#E0874A', '#1F1B1E']],
    lt: [['#EEEAE3', '#1F1B1E'], ['#D9C4BE', '#1F1B1E'], ['#E6DAB0', '#1F1B1E']]
  };
  /* desk colour behind each sketchbook: change any of these to set the mood of a project */
  var DESK = { luz: '#1D2532', mb: '#93A6A3', rr: '#55282B', p3: '#3A3735', lt: '#C8BBA7' };
  var DARK = { luz: 1, rr: 1, p3: 1 };   // dark colours get light menu text
  function setDesk(p) {
    var c = DESK[p] || '#8BA2A6';
    document.body.style.setProperty('--ekr-desk', c);
    document.body.classList.toggle('ekr-dark', !!DARK[p]);
    document.documentElement.style.setProperty('background-color', c, 'important');
  }
  var HASH = { luz: 'luz', 'la-luz': 'luz', mb: 'mb', 'mariners-brine': 'mb', rr: 'rr', 'ripe-to-rot': 'rr', p3: 'p3', 'anatomy-of-fire': 'p3', lt: 'lt', little: 'lt', 'the-little-things': 'lt' };
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function r2(x) { return Math.round(x * 100) / 100; }
  var ARROW_L = '<svg viewBox="0 0 64 48"><path d="M58 26 C 44 22, 26 23, 8 25 M18 14 L7 25 L19 35"></path></svg>';
  var ARROW_R = '<svg viewBox="0 0 64 48"><path d="M6 24 C 20 21, 38 22, 56 24 M46 13 L57 24 L45 34"></path></svg>';

  function Flip(root, BOOKS) {
    var h = String(location.hash || '').replace('#', '').toLowerCase();
    var st = { p: HASH[h] || 'luz', s: 0, moving: [], flap: false, flapBusy: false, pick: false };
    var timer, jtimer, ftimer;
    root.innerHTML =
      '<div class="prow" style="position:relative;z-index:10;display:flex;flex-wrap:wrap;justify-content:center;gap:14px 22px"></div>' +
      '<div class="ppick"><button class="ptag serif tape-clip ppick-btn" aria-haspopup="true" aria-expanded="false"><span></span><svg viewBox="0 0 24 24" aria-hidden="true" style="width:16px;height:16px;margin-left:10px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:transform .25s"><path d="M5 9l7 7 7-7"/></svg></button><div class="ppick-list" hidden></div></div>' +
      '<main style="position:relative;flex:1;display:flex;flex-direction:column;justify-content:center;perspective:2600px">' +
      '<div class="ekr-book">' +
      '<div class="ekr-half ekr-base-left" style="left:0"><div class="shade-l"></div></div>' +
      '<div class="ekr-half ekr-base-right" style="left:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6cqw">' +
      '<div style="position:relative;width:70%;filter:drop-shadow(0 .6cqw .9cqw rgba(52,30,30,.3));transform:rotate(-1.5deg)"><div class="paper torn-b" style="padding:9cqw 6cqw 8cqw;display:flex;flex-direction:column;align-items:center;gap:2cqw"><span class="serif" style="position:relative;font-size:7cqw">Emma K. Rojas</span><a href="/" style="position:relative;font-size:max(12px,2.8cqw);color:#4E5661;padding:1.6cqw">home</a></div></div>' +
      '<button class="end-btn serif tape-clip"></button>' +
      '<svg viewBox="0 0 120 120" style="position:absolute;right:9%;bottom:8%;width:16cqw;height:16cqw;overflow:visible" aria-hidden="true"><path d="M60 10 C62 40 70 50 104 56 C70 60 62 70 60 104 C58 70 50 60 16 56 C50 50 58 40 60 10Z" style="fill:none;stroke:#F7F4EF;stroke-width:2"></path></svg>' +
      '<div class="shade-r"></div></div>' +
      '<div class="leaves"></div>' +
      '<button class="ekr-edge" aria-label="Next page" style="position:absolute;top:0;right:0;width:7%;height:100%;z-index:300;background:none;border:0;cursor:e-resize"></button>' +
      '<button class="ekr-edge-l" aria-label="Previous page" style="position:absolute;top:0;left:0;width:7%;height:100%;z-index:300;background:none;border:0;cursor:w-resize"></button>' +
      '<div class="flap-wrap" hidden><button class="flap closed" aria-label="Flip the taped photograph" aria-pressed="false"><img class="flap-f" alt="Black and white photograph taped into the sketchbook"><img class="flap-b" alt=""></button></div>' +
      '<div class="tabs"></div>' +
      '</div>' +
      '<div class="tabs-m"></div>' +
      '<p class="rot-hint">turn your phone sideways to see the full spread</p>' +
      '</main>' +
      '<footer class="ekr-controls" style="position:relative;display:flex;align-items:center;justify-content:center;gap:28px">' +
      '<button class="arrow a-prev" aria-label="Previous page">' + ARROW_L + '</button>' +
      '<p class="where" style="margin:0;min-width:220px;text-align:center;font-size:15px"></p>' +
      '<button class="arrow a-next" aria-label="Next page">' + ARROW_R + '</button></footer>' +
      '<div class="zoom" role="dialog" aria-modal="true" hidden style="position:fixed;inset:0;z-index:9999;background:rgba(46,36,42,.86);display:flex;align-items:center;justify-content:center;padding:28px;cursor:zoom-out">' +
      '<div style="position:relative;filter:drop-shadow(0 16px 30px rgba(0,0,0,.4));transform:rotate(-.6deg)"><span class="tape tape-clip" style="left:calc(50% - 75px);top:-16px;width:150px;height:36px"></span><div style="background:#F5F2ED;padding:14px"><img alt="" style="display:block;max-width:min(88vw,1500px);max-height:80vh;width:auto;height:auto"></div></div>' +
      '<button class="tape-clip z-close" aria-label="Close" style="position:absolute;top:18px;right:18px;padding:10px 18px;border:0;background:rgba(236,227,190,.9);font-family:\'Courier Prime\',monospace;font-size:15px;cursor:pointer;color:#1F1B1E">close</button></div>';

    var $ = function (s) { return root.querySelector(s); };
    var book = $('.ekr-book'), leavesEl = $('.leaves'), baseL = $('.ekr-base-left');
    var flapWrap = $('.flap-wrap'), flapBtn = $('.flap'), zoomEl = $('.zoom');
    var leaves = [];
    // the zoom view lives on the page body so nothing (header, sections) can sit on top of it
    var zwrap = document.createElement('div'); zwrap.className = 'ekr ekr-zoom'; document.body.appendChild(zwrap); zwrap.appendChild(zoomEl);
    zoomEl.addEventListener('click', function () { zoomEl.hidden = true; document.documentElement.style.overflow = ''; });

    function bk() { return BOOKS[st.p]; }
    function sp() { return bk().spreads; }
    function Lf(x) { return x && (x.W || x.L); }
    function Rf(x) { return x && (x.W || x.R); }

    function faceHTML(spec, side, front) {
      var shade = front ? 'shade-r' : 'shade-l', cls = '', inner = '';
      if (spec) {
        var k = spec.k, src = spec.src ? url(spec.src) : '';
        if (k === 'scan') {
          cls = 'is-scan' + (spec.cut ? ' is-cut' : '') + (spec.center ? ' is-cover-plain' : '');
          inner += '<img class="f-full" data-src="' + esc(src) + '" alt="">';
          if (spec.title) inner += label(spec);
        } else if (k === 'cover') {
          cls = 'is-cover is-cover-plain'; inner += label(spec);
        } else if (k === 'wide' || k === 'bleed') {
          var w = k === 'bleed' ? 1 : spec.w, l = 100 * (1 - w);
          cls = side === 'L' ? 'is-wl' : 'is-wr';
          inner += '<div class="f-fig' + (k === 'bleed' ? ' bleed' : '') + '" style="left:' + r2(side === 'L' ? l : l - 100) + 'cqw;width:' + r2(200 * w) + 'cqw"><img data-src="' + esc(src) + '" alt=""><span class="tape t1"></span><span class="tape t2"></span></div>';
        }
      }
      var zoomable = spec && spec.src;
      return '<section class="ekr-face ' + (front ? '' : 'ekr-back ') + cls + '"' + (zoomable ? ' data-zoom="' + esc(url(spec.src)) + '" data-alt="' + esc(spec.alt || '') + '" style="cursor:zoom-in"' : '') + ' aria-label="' + esc(spec ? spec.alt || '' : '') + '">' + inner + '<div class="' + shade + '"></div></section>';
    }
    function label(spec) {
      return '<div class="f-labwrap"><div class="f-label paper torn-b"><h2 class="serif" style="position:relative;margin:0;font-size:7.6cqw;line-height:1.08;text-wrap:balance">' + esc(spec.title) + '</h2><p style="position:relative;margin:0;font-size:max(9px,2.3cqw);line-height:1.5;text-wrap:balance;color:#4E5661">' + esc(spec.sub) + '</p></div></div>';
    }

    function buildLeaves() {
      var S = sp(), N = S.length - 1;
      var html = '';
      for (var i = 0; i < N; i++) {
        var fr = Rf(S[i]);
        var front = faceHTML(fr, 'R', true);
        if (S[i].flap) front = front.replace('<div class="shade-r">', '<img class="f-full f-under" data-src="' + esc(url(S[i].flap.under)) + '" alt="" style="display:none"><div class="shade-r">');
        html += '<div class="ekr-leaf" data-i="' + i + '">' + front + faceHTML(Lf(S[i + 1]), 'L', false) + '</div>';
      }
      leavesEl.innerHTML = html;
      leaves = [].slice.call(leavesEl.children);
    }

    function lazy() {
      leaves.forEach(function (lf, i) {
        if (Math.abs(i - st.s) <= 3 || st.moving.indexOf(i) >= 0) {
          lf.querySelectorAll('img[data-src]').forEach(function (im) { if (!im.getAttribute('src')) im.src = im.getAttribute('data-src'); });
        }
      });
    }

    function render() {
      var B = bk(), S = B.spreads, N = S.length - 1, s = st.s, idle = st.moving.length === 0;
      setDesk(st.p);
      book.className = 'ekr-book ' + B.cls;
      book.style.transform = 'translateX(' + (s === 0 ? '-25%' : '0%') + ')';
      // the left page only exists once the cover has landed: while the cover swings open or shut, the desk shows on the left
      // (and a cut-out inside cover shows the desk through its burnt edge, not a page)
      var cutIn = S[1] && S[1].L && S[1].L.cut;
      baseL.style.visibility = (s === 0 || st.moving.indexOf(0) >= 0 || (cutIn && (s <= 1 || st.moving.indexOf(1) >= 0))) ? 'hidden' : 'visible';
      leaves.forEach(function (lf, i) {
        var turned = i < s, z = st.moving.indexOf(i) >= 0 ? 200 : (turned ? 20 + i : 20 + N - i);
        lf.style.transform = 'rotateY(' + (turned ? -180 : 0) + 'deg)';
        lf.style.zIndex = z;
        var f = lf.children[0], b = lf.children[1];
        f.style.pointerEvents = (!turned && i === s && idle) ? 'auto' : 'none';
        b.style.pointerEvents = (turned && i === s - 1 && idle) ? 'auto' : 'none';
        var under = f.querySelector('.f-under');
        if (under) {
          var showUnder = i === s && (st.flap || st.flapBusy);
          under.style.display = showUnder ? 'block' : 'none';
          if (showUnder && !under.getAttribute('src')) under.src = under.getAttribute('data-src');
        }
      });
      lazy();
      // flap
      var F = S[s] && S[s].flap;
      flapWrap.hidden = !(F && idle);
      if (F) {
        flapBtn.style.left = F.x + '%'; flapBtn.style.top = F.y + '%'; flapBtn.style.width = F.w + '%'; flapBtn.style.height = F.h + '%';
        flapBtn.style.transformOrigin = r2(-F.x / F.w * 100) + '% 50%';
        flapBtn.style.transform = 'rotateY(' + (st.flap ? -180 : 0) + 'deg)';
        flapBtn.className = 'flap ' + (st.flap ? 'open' : 'closed');
        flapBtn.setAttribute('aria-pressed', st.flap ? 'true' : 'false');
        var fi = flapBtn.querySelector('.flap-f'), bi = flapBtn.querySelector('.flap-b');
        if (fi.getAttribute('src') !== url(F.front)) fi.src = url(F.front);
        if (bi.getAttribute('src') !== url(F.back)) bi.src = url(F.back);
      }
      // tabs
      var colors = TC[st.p] || TC.lt, where = B.title;
      B.tabs.forEach(function (t) { if (s >= t[1]) where = t[0]; });
      var tabsHTML = function (vert) {
        return B.tabs.map(function (t, j) {
          var next = B.tabs[j + 1], on = s >= t[1] && (!next || s < next[1]), c = colors[j % colors.length];
          return '<button class="tab" data-go="' + t[1] + '" aria-current="' + on + '" style="background:' + c[0] + ';color:' + c[1] + ';' + (vert ? 'padding-right:' + (on ? 15 : 8) + 'px' : 'padding-bottom:' + (on ? 13 : 8) + 'px') + '">' + esc(t[0]) + '</button>';
        }).join('');
      };
      $('.tabs').innerHTML = tabsHTML(true);
      var tm = $('.tabs-m'); tm.innerHTML = tabsHTML(false); tm.style.visibility = s === 0 ? 'hidden' : 'visible';
      $('.rot-hint').className = 'rot-hint' + (B.cls.indexOf('bk-land') >= 0 ? ' on' : '');
      $('.where').textContent = s === 0 ? '' : where;
      $('.a-prev').disabled = s === 0; $('.a-next').disabled = s === N;
      $('.ekr-edge').style.display = s === N ? 'none' : 'block';
      $('.ekr-edge-l').style.display = s === 0 ? 'none' : 'block';
      // projects
      $('.prow').innerHTML = PL.map(function (p, j) {
        var on = st.p === p[0];
        return '<button class="ptag serif tape-clip" data-p="' + p[0] + '" aria-pressed="' + on + '" style="background:' + (on ? '#EEEAE3' : 'rgba(242,238,233,.38)') + ';transform:rotate(' + (j % 2 ? 1.4 : -1.6) + 'deg)">' + esc(p[1]) + '</button>';
      }).join('');
      var pick = $('.ppick-btn');
      pick.querySelector('span').textContent = B.title;
      pick.setAttribute('aria-expanded', st.pick ? 'true' : 'false');
      pick.querySelector('svg').style.transform = 'rotate(' + (st.pick ? 180 : 0) + 'deg)';
      var pl = $('.ppick-list'); pl.hidden = !st.pick;
      pl.innerHTML = PL.filter(function (x) { return x[0] !== st.p; }).map(function (x) { return '<button class="serif" data-p="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('');
      var pi = 0; PL.forEach(function (x, i) { if (x[0] === st.p) pi = i; });
      var nx = PL[(pi + 1) % PL.length];
      var eb = $('.end-btn'); eb.textContent = nx[1] + ' \u2192'; eb.setAttribute('data-p', nx[0]);
    }

    function set(o) { for (var k in o) st[k] = o[k]; render(); }
    function go(n) {
      var N = sp().length - 1; n = Math.max(0, Math.min(N, n));
      var s = st.s; if (n === s) return;
      clearTimeout(timer); clearTimeout(jtimer);
      if (Math.abs(n - s) > 1) {
        book.classList.add('is-fading');
        jtimer = setTimeout(function () {
          book.classList.add('is-snap');
          set({ s: n, moving: [], flap: false, flapBusy: false });
          book.classList.add('is-snap');
          preload(n, function () { book.classList.remove('is-fading'); setTimeout(function () { book.classList.remove('is-snap'); }, 60); });
        }, 220);
        return;
      }
      set({ s: n, moving: [Math.min(s, n)], flap: false, flapBusy: false });
      timer = setTimeout(function () { set({ moving: [] }); }, 1200);
    }
    function preload(n, done) {
      var S = sp(), srcs = [], fin = false;
      [S[n], S[n + 1], S[n - 1]].forEach(function (x) { if (!x) return; [x.W, x.L, x.R].forEach(function (f) { if (f && f.src && srcs.indexOf(f.src) < 0) srcs.push(url(f.src)); }); });
      var left = srcs.length;
      function one() { left--; if (left <= 0 && !fin) { fin = true; done(); } }
      if (!left) { done(); return; }
      srcs.forEach(function (u) { var im = new Image(); im.onload = one; im.onerror = one; im.src = u; });
      setTimeout(function () { if (!fin) { fin = true; done(); } }, 1500);
    }
    function setProject(p) {
      if (p === st.p || !BOOKS[p]) return;
      clearTimeout(timer); clearTimeout(jtimer);
      book.classList.add('is-fading');
      st.pick = false; st.flap = false; st.flapBusy = false; st.moving = [];
      jtimer = setTimeout(function () {
        book.classList.add('is-snap');
        st.p = p; st.s = 0; buildLeaves(); render();
        try { history.replaceState(null, '', '#' + p); } catch (e) {}
        preload(0, function () { book.classList.remove('is-fading'); setTimeout(function () { book.classList.remove('is-snap'); }, 60); });
      }, 220);
    }

    root.addEventListener('click', function (e) {
      var t = e.target.closest('button,[data-zoom],.zoom');
      if (!t || !root.contains(t)) { if (st.pick && !e.target.closest('.ppick')) set({ pick: false }); return; }
      if (t.classList.contains('z-close') || t.classList.contains('zoom')) { zoomEl.hidden = true; return; }
      if (t.hasAttribute('data-p')) { setProject(t.getAttribute('data-p')); return; }
      if (t.classList.contains('ppick-btn')) { set({ pick: !st.pick }); return; }
      if (t.hasAttribute('data-go')) { go(+t.getAttribute('data-go')); return; }
      if (t.classList.contains('a-next') || t.classList.contains('ekr-edge')) { go(st.s + 1); return; }
      if (t.classList.contains('a-prev') || t.classList.contains('ekr-edge-l')) { go(st.s - 1); return; }
      if (t.classList.contains('flap')) {
        clearTimeout(ftimer);
        if (!st.flap) { set({ flap: true, flapBusy: false }); return; }
        set({ flap: false, flapBusy: true });
        ftimer = setTimeout(function () { set({ flapBusy: false }); }, 1050);
        return;
      }
      if (t.hasAttribute('data-zoom')) {
        var src = t.getAttribute('data-zoom');
        var F = sp()[st.s] && sp()[st.s].flap;
        if (F && (st.flap || st.flapBusy) && t.closest('.ekr-leaf') && +t.closest('.ekr-leaf').getAttribute('data-i') === st.s) src = url(F.under);
        var im = zoomEl.querySelector('img'); im.src = src; im.alt = t.getAttribute('data-alt') || '';
        zoomEl.setAttribute('aria-label', im.alt); zoomEl.hidden = false; document.documentElement.style.overflow = 'hidden';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (!zoomEl.hidden && e.key === 'Escape') { zoomEl.hidden = true; document.documentElement.style.overflow = ''; return; }
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight') go(st.s + 1); else if (e.key === 'ArrowLeft') go(st.s - 1);
    });
    var tx, ty, tin;
    document.addEventListener('touchstart', function (e) { var t = e.touches && e.touches[0]; if (!t) return; tx = t.clientX; ty = t.clientY; tin = !!(e.target && e.target.closest && e.target.closest('main') && root.contains(e.target)); }, { passive: true });
    document.addEventListener('touchend', function (e) {
      var t = e.changedTouches && e.changedTouches[0]; if (!t || !tin || !zoomEl.hidden) return;
      var dx = t.clientX - tx, dy = t.clientY - ty;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) { if (dx < 0) go(st.s + 1); else go(st.s - 1); }
    }, { passive: true });

    buildLeaves(); render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.addEventListener('mercury:load', start); // Squarespace page transitions
})();
