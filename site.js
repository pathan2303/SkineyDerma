/* SkinNey Derma Clinic — shared behaviour (vanilla JS, no build step) */
(() => {
  'use strict';
  const WA = '919920706262';
  const root = document.documentElement;
  const reduce = root.classList.contains('rm'); // set in <head> only when the OS requests reduced motion (override: add ?motion=full to the URL once)
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const page = document.body.dataset.page || '';
  const wa = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  /* ---------- Icons ---------- */
  const sun = '<svg class="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg class="i-moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const chat = '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>';

  /* ---------- Header ---------- */
  const links = [['index.html', 'Home', 'home'], ['about.html', 'About', 'about'], ['services.html', 'Services', 'services'], ['contact.html', 'Contact', 'contact']];
  const navHTML = (cls) => links.map(([h, t, k]) => `<a href="${h}" class="${cls}${k === page ? ' on' : ''}">${t}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="hdr" id="hdr"><div class="hdr-in">
      <a href="index.html" class="logo" aria-label="SkinNey Derma Clinic — Home">
        <span class="logo-pill"><img src="SkinNey.png" alt="SkinNey Derma Clinic" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"><span class="logo-fb">SkinNey</span></span>
      </a>
      <nav class="nav" aria-label="Primary">${navHTML('nl')}</nav>
      <div class="hdr-act">
        <button class="tgl" id="tgl" type="button" aria-label="Toggle day and night mode">${sun}${moon}</button>
        <a class="btn btn-solid hdr-cta" data-wa="">${chat}Book</a>
        <button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
      </div>
    </div></header>
    <div class="mnav" id="mnav">${navHTML('ml')}<a class="btn btn-solid" data-wa="" style="margin-top:1.6rem;align-self:flex-start">${chat}Book on WhatsApp</a></div>
    <a class="fab" data-wa="" aria-label="Book on WhatsApp">${chat}</a>`);

  /* ---------- Footer ---------- */
  const ft = document.getElementById('site-footer');
  if (ft) {
    ft.className = 'ft';
    ft.innerHTML = `
    <div class="fl" data-depth=".3" style="right:-60px;top:-40px;--s:300px;--dur:9s"><i class="orb"></i></div>
    <div class="wrap relative" style="z-index:2">
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-1">
          <p class="serif" style="font-size:2rem;line-height:1.1;margin:0">SkinNey <em class="gold">Derma Clinic</em></p>
          <p class="mut" style="font-size:.92rem;margin-top:1rem;max-width:20rem">Healthy skin. Renewed confidence. Considered dermatology and aesthetics in Mira Road East, Mumbai.</p>
        </div>
        <div><h4>Explore</h4><ul style="list-style:none;padding:0;margin:0">
          ${links.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
        <div><h4>Visit</h4><ul style="list-style:none;padding:0;margin:0">
          <li>105, Urban Grandeur, Above Starbucks, Chandan Shanti Link Road, Mira-Bhayandar, Maharashtra 401107</li>
          <li>Open all 7 days · 11 AM – 9 PM</li></ul></div>
        <div><h4>Reach us</h4><ul style="list-style:none;padding:0;margin:0">
          <li><a href="tel:+919920706262">+91 9920706262</a></li>
          <li><a href="mailto:skinneyderma@gmail.com">skinneyderma@gmail.com</a></li>
          <li><a href="https://www.instagram.com/skinney_mumbai/" target="_blank" rel="noopener">Instagram @skinney_mumbai</a></li>
          <li><a data-wa="" class="lnk" style="margin-top:.6rem">Book on WhatsApp <span>→</span></a></li></ul></div>
      </div>
      <hr class="hair" style="margin:56px 0 22px">
      <p class="mut" style="font-size:.78rem;margin:0">© <span data-year></span> SkinNey Derma Clinic. Results vary from person to person; every treatment begins with a consultation.</p>
    </div>`;
  }
  document.querySelectorAll('[data-year]').forEach((e) => (e.textContent = new Date().getFullYear()));

  /* ---------- WhatsApp links ---------- */
  document.querySelectorAll('[data-wa]').forEach((a) => {
    const s = a.dataset.wa;
    a.href = wa(s ? `Hello SkinNey Derma Clinic, I'd like to book a consultation for ${s}.` : "Hello SkinNey Derma Clinic, I'd like to book a consultation.");
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- Theme ---------- */
  const tgl = document.getElementById('tgl');
  const setTheme = (t) => {
    root.dataset.theme = t;
    try { localStorage.setItem('skinney-theme', t); } catch (e) {}
    const m = document.querySelector('meta[name=theme-color]');
    if (m) m.setAttribute('content', t === 'night' ? '#0E0E0E' : '#F5EFE8');
    tgl.setAttribute('aria-pressed', String(t === 'night'));
  };
  setTheme(root.dataset.theme === 'night' ? 'night' : 'day');
  tgl.addEventListener('click', () => setTheme(root.dataset.theme === 'night' ? 'day' : 'night'));

  /* ---------- Header behaviour ---------- */
  const hdr = document.getElementById('hdr');
  const burger = document.getElementById('burger');
  const mnav = document.getElementById('mnav');
  const heroFade = document.querySelector('.hero-fade');
  const onScroll = () => {
    hdr.classList.toggle('sc', scrollY > 30);
    if (heroFade && !reduce) {
      const p = Math.min(scrollY / (innerHeight * 0.9), 1);
      heroFade.style.opacity = String(1 - p * 0.85);
      heroFade.style.transform = `translateY(${p * 40}px)`;
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const closeMenu = () => { burger.classList.remove('open'); mnav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => {
    const open = !mnav.classList.contains('open');
    mnav.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mnav.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Diwali offers (edit here) ---------- */
  const OFFERS = {
    active: true,          // set false to remove the pop-up, button, section and price tags everywhere
    until: null,           // optional last day, e.g. '2026-11-15' (offers auto-hide after it)
    groups: [
      { t: 'Festive Facials', s: 'Cleanse · Hydrate · Rejuvenate', i: [
        ['Hydra Boost Facial', 'Deep cleanse & glow', '₹2,399'],
        ['Advanced Medi Facial', 'Brighten & rejuvenate', '₹2,299'],
        ['Red Wine Facial', 'Anti-ageing & radiance', '₹2,599']] },
      { t: 'Skin Rejuvenation', s: 'Renew · Repair · Glow', i: [
        ['Chemical Peel', 'Clear & bright skin', '₹1,499'],
        ['Microneedling', 'Smoother & firmer skin', '₹3,000'],
        ['PDRN Skin Booster', 'Deep repair & radiance', '₹7,999']] },
      { t: 'Hair Restoration', s: 'Stronger · Healthier · Thicker Hair', i: [
        ['PRP Hair Treatment', 'Reduce hair fall', '₹3,500'],
        ['GFC Hair Treatment', 'Stimulate hair growth', '₹4,000'],
        ['Exosome Hair Restoration', 'Advanced hair repair', '₹8,999']] },
      { t: 'Permanent Makeup', s: 'Natural · Long-lasting · Beautiful', i: [
        ['Lip Blush', 'Natural pink lips', '₹4,999'],
        ['Microblading', 'Defined & natural brows', '₹4,999']] },
      { t: 'Diwali IV Drip Packages', s: 'Inner Health · Outer Glow — 6 sessions special offer', i: [
        ['Celestial Glow Drip', 'Brighter skin · Even tone · Radiant you · 6 sessions', '₹32,999'],
        ['Radiance Drip', 'Skin brightening · Antioxidant support · Overall wellness · 6 sessions', '₹28,999'],
        ['Detox Drip', 'Detoxify · Recharge · Feel refreshed · 6 sessions', '₹26,999']] },
    ],
  };
  const offerOn = OFFERS.active && (!OFFERS.until || Date.now() <= new Date(OFFERS.until + 'T23:59:59+05:30').getTime());
  const sparkle = '<svg viewBox="0 0 24 24"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>';
  let openDw = () => {};
  if (!offerOn) {
    document.querySelectorAll('[data-offers-sec],[data-offer-only]').forEach((e) => e.remove());
  } else {
    const rows = (g) => g.i.map(([n, d, p]) => `<div class="orow"><div><b>${n}</b><small>${d}</small></div><span class="pr">${p}</span></div>`).join('');
    document.querySelectorAll('[data-offers]').forEach((el) => {
      el.innerHTML = OFFERS.groups.map((g) => `<article class="card lift"><h3 class="h3">${g.t}</h3><p class="osub">${g.s}</p>${rows(g)}</article>`).join('');
    });
    document.querySelectorAll('.svc[data-offer]').forEach((c) => {
      const l = c.querySelector('.lnk');
      if (l) l.insertAdjacentHTML('beforebegin', `<span class="otag">Diwali offer · ${c.dataset.offer}</span>`);
    });

    const embers = Array.from({ length: 22 }, () => `<i style="--x:${(Math.random() * 100).toFixed(1)}%;--s:${(2 + Math.random() * 4).toFixed(1)}px;--t:${(7 + Math.random() * 7).toFixed(1)}s;--d:${(-Math.random() * 12).toFixed(1)}s"></i>`).join('');
    const groups = OFFERS.groups.map((g) => `<div class="dw-g rvd"><h4>${g.t}</h4><small class="s">${g.s}</small>${g.i.map(([n, d, p]) => `<div class="dw-r"><div><b>${n}</b><small>${d}</small></div><span class="p">${p}</span></div>`).join('')}</div>`).join('');
    const dw = document.createElement('div');
    dw.className = 'dw';
    dw.id = 'dw';
    dw.setAttribute('role', 'dialog');
    dw.setAttribute('aria-modal', 'true');
    dw.setAttribute('aria-labelledby', 'dwT');
    dw.innerHTML = `<div class="dw-bg" data-close></div><span class="dw-line"></span>
      <div class="dw-card"><div class="dw-embers">${embers}</div>
        <button class="dw-x" type="button" aria-label="Close offers" data-close><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div class="dw-head">
          <p class="dw-eye rvd">Exclusive festive offers</p>
          <h2 class="dw-title rvd" id="dwT"><span>Diwali</span><em>Glow &amp; Beauty Fest</em></h2>
          <p class="dw-sub rvd">Brighter Skin &nbsp;✦&nbsp; Healthier Hair &nbsp;✦&nbsp; Confident You</p>
        </div>
        <div class="dw-scroll">${groups}</div>
        <div class="dw-foot rvd">
          <div class="row"><a class="btn btn-solid" id="dwWa" target="_blank" rel="noopener">${chat}Book on WhatsApp</a><a class="btn" href="tel:+919920706262">Call 9920706262</a></div>
          <p>T&amp;C apply. Treatments are subject to professional assessment.</p>
          <button class="dw-later" type="button" data-close>Maybe later</button>
        </div>
      </div>`;
    document.body.append(dw);
    dw.querySelectorAll('.rvd').forEach((e, i) => e.style.setProperty('--i', i));
    dw.querySelector('#dwWa').href = wa("Hello SkinNey Derma Clinic, I'd like to know more about the Diwali Glow & Beauty Fest offers.");

    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'dw-fab';
    fab.setAttribute('data-dw', '');
    fab.innerHTML = sparkle + 'Diwali Offers';
    document.body.append(fab);

    let last = null;
    openDw = () => {
      last = document.activeElement;
      dw.classList.add('on');
      document.body.style.overflow = 'hidden';
      setTimeout(() => dw.querySelector('.dw-x').focus({ preventScroll: true }), 500);
      try { sessionStorage.setItem('skinney-dw', '1'); } catch (e) {}
    };
    const closeDw = () => {
      dw.classList.remove('on');
      document.body.style.overflow = '';
      if (last && last.focus) last.focus({ preventScroll: true });
    };
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-dw]')) openDw();
      else if (e.target.closest('[data-close]')) closeDw();
    });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && dw.classList.contains('on')) closeDw(); });
  }

  /* ---------- Sticky numbered side index ---------- */
  const secs = [...document.querySelectorAll('[data-sec]')];
  if (secs.length > 1) {
    const nav = document.createElement('nav');
    nav.className = 'sidx';
    nav.setAttribute('aria-label', 'Section index');
    nav.innerHTML = secs.map((s, i) => {
      s.id = s.id || 's' + (i + 1);
      return `<a href="#${s.id}"><span>${ROMAN[i]}</span><span class="t">${s.dataset.sec}</span></a>`;
    }).join('');
    document.body.append(nav);
    const al = [...nav.querySelectorAll('a')];
    al[0].classList.add('on');
    const so = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) al.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => so.observe(s));
  }

  /* ---------- Reveals ---------- */
  document.querySelectorAll('.h1 .ln').forEach((l) => { l.innerHTML = '<span class="kin-i">' + l.innerHTML + '</span>'; });
  document.querySelectorAll('.stg').forEach((p) => [...p.children].forEach((c, i) => {
    c.classList.add('rv');
    c.style.setProperty('--d', (i * 0.12).toFixed(2) + 's');
  }));
  const reveal = (el, extra = 0) => {
    el.classList.add('in');
    const d = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
    setTimeout(() => el.classList.add('done'), (d + extra + 1.3) * 1000);
  };
  const startReveal = () => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.rv,.hair').forEach((e) => io.observe(e));
  };

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  const minWait = new Promise((r) => setTimeout(r, reduce ? 900 : 2700));
  const loaded = new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true })));
  const cap = new Promise((r) => setTimeout(r, 4500));
  Promise.race([Promise.all([minWait, loaded]), cap]).then(() => {
    if (loader) loader.classList.add('out');
    root.classList.add('ready');
    setTimeout(startReveal, reduce ? 0 : 650);
    setTimeout(() => loader && loader.remove(), 2000);
    let seen = false;
    try { seen = sessionStorage.getItem('skinney-dw') === '1'; } catch (e) {}
    if (offerOn && !seen) setTimeout(openDw, reduce ? 500 : 3000);
  });

  /* ---------- Mouse parallax (weightless, eased) ---------- */
  if (!reduce && fine) {
    const els = [...document.querySelectorAll('[data-depth]')];
    let tx = 0, ty = 0, cx = 0, cy = 0;
    addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      els.forEach((el) => {
        const d = parseFloat(el.dataset.depth) || 0;
        el.style.transform = `translate3d(${(-cx * d * 90).toFixed(2)}px,${(-cy * d * 90).toFixed(2)}px,0)`;
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Card glow follows pointer ---------- */
  if (fine) {
    document.addEventListener('pointermove', (e) => {
      const c = e.target.closest && e.target.closest('.card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', e.clientX - r.left + 'px');
      c.style.setProperty('--my', e.clientY - r.top + 'px');
    }, { passive: true });
  }

  /* ---------- Services filter ---------- */
  const fbs = [...document.querySelectorAll('.fbtn')];
  if (fbs.length) {
    const cards = [...document.querySelectorAll('.svc')];
    fbs.forEach((b) => b.addEventListener('click', () => {
      fbs.forEach((x) => x.classList.toggle('on', x === b));
      const f = b.dataset.f;
      let i = 0;
      cards.forEach((c) => {
        const show = f === 'all' || c.dataset.c === f;
        c.hidden = !show;
        if (show) {
          c.classList.remove('in', 'done');
          c.style.setProperty('--d', (i * 0.07).toFixed(2) + 's');
          void c.offsetWidth;
          const k = i++;
          setTimeout(() => reveal(c), reduce ? 0 : 40 + k * 10);
        }
      });
    }));
  }

  /* ---------- Contact form → WhatsApp ---------- */
  const form = document.getElementById('bookForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const lines = [
        "Hello SkinNey Derma Clinic, I'd like to book a consultation.",
        `Name: ${f.get('name') || '-'}`,
        `Phone: ${f.get('phone') || '-'}`,
        `Interested in: ${f.get('treatment') || 'Not sure yet'}`,
        `Preferred day/time: ${f.get('when') || '-'}`,
      ];
      if (f.get('note')) lines.push(`Note: ${f.get('note')}`);
      window.open(wa(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
