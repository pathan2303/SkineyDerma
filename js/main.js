// SkinNey Derma Clinic — Main Landing Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Side nav active tracking
  const sections = document.querySelectorAll('section[id]');
  const navDots = document.querySelectorAll('.nav-dot');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.section === current);
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // Before/After slider
  const slider = document.getElementById('ba-slider');
  const handle = document.getElementById('ba-handle');
  const beforeWrap = document.getElementById('ba-before-wrap');
  if (slider && handle && beforeWrap) {
    let isDragging = false;

    function setPosition(clientX) {
      const rect = slider.getBoundingClientRect();
      let x = ((clientX - rect.left) / rect.width) * 100;
      x = Math.max(5, Math.min(95, x));
      handle.style.left = x + '%';
      beforeWrap.style.width = x + '%';
    }

    handle.addEventListener('mousedown', () => isDragging = true);
    handle.addEventListener('touchstart', () => isDragging = true, { passive: true });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('mousemove', e => { if (isDragging) setPosition(e.clientX); });
    window.addEventListener('touchmove', e => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('click', e => setPosition(e.clientX));
  }

  // BA tabs (demo only — images stay same for static sample)
  document.querySelectorAll('.ba-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ba-tab').forEach(t => {
        t.classList.remove('active', 'border-gold/40', 'text-gold');
        t.classList.add('border-white/20', 'text-ivory/60');
      });
      tab.classList.add('active', 'border-gold/40', 'text-gold');
      tab.classList.remove('border-white/20', 'text-ivory/60');
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObserver.observe(el));
});
