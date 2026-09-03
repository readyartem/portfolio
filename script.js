// ---------- Loader ----------
(function () {
  const loader = document.getElementById('loader');
  const num = document.getElementById('loadNum');
  const bar = document.getElementById('loadBar');
  let p = 0;
  document.body.setAttribute('data-loading', 'true');

  const tick = () => {
    p += Math.random() * 9 + 3;
    if (p >= 100) p = 100;
    num.textContent = String(Math.floor(p)).padStart(3, '0');
    bar.style.width = p + '%';
    if (p < 100) {
      setTimeout(tick, 90 + Math.random() * 120);
    } else {
      setTimeout(finish, 350);
    }
  };
  const finish = () => {
    loader.classList.add('done');
    document.body.setAttribute('data-loading', 'false');
    document.body.classList.add('loaded');
    setTimeout(() => loader.remove(), 1000);
  };
  // safety: never trap user
  setTimeout(() => { if (document.body.contains(loader)) finish(); }, 5000);
  tick();
})();

// ---------- Custom cursor + work preview ----------
(function () {
  const cursor = document.getElementById('cursor');
  const preview = document.getElementById('workPreview');
  const previewImg = document.getElementById('workPreviewImg');
  let mx = 0, my = 0, px = 0, py = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  // smooth-follow preview
  (function loop() {
    px += (mx - px) * 0.12;
    py += (my - py) * 0.12;
    if (preview) preview.style.transform =
      `translate(${px + 24}px, ${py - 120}px) scale(${preview.classList.contains('on') ? 1 : 0.9})`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('.w-row').forEach((row) => {
    row.addEventListener('mouseenter', () => {
      previewImg.src = row.dataset.img;
      preview.classList.add('on');
      cursor.classList.add('grow');
    });
    row.addEventListener('mouseleave', () => {
      preview.classList.remove('on');
      cursor.classList.remove('grow');
    });
  });

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => {
      if (!preview || !preview.classList.contains('on')) cursor.classList.remove('grow');
    });
  });
})();

// ---------- Reveal on scroll ----------
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();

// ---------- Storytelling: line-by-line activation ----------
(function () {
  const lines = document.querySelectorAll('.story-line');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('active');
    });
  }, { threshold: 0.6 });
  lines.forEach((l) => io.observe(l));
})();

// ---------- Magnetic buttons ----------
(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
  });
})();

// ---------- Copenhagen clock ----------
(function () {
  const els = [document.getElementById('cphTime'), document.getElementById('cphTime2')].filter(Boolean);
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Copenhagen' });
  const update = () => els.forEach((el) => (el.textContent = fmt.format(new Date()) + ' CET'));
  update(); setInterval(update, 20000);
})();

// ---------- Mobile menu ----------
(function () {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mmenu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.remove('open')));
})();

// ---------- Nav hide on scroll down ----------
(function () {
  const nav = document.getElementById('nav');
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.style.transform = y > last && y > 300 ? 'translateY(-100%)' : 'translateY(0)';
    nav.style.transition = 'transform .4s';
    last = y;
  }, { passive: true });
})();
