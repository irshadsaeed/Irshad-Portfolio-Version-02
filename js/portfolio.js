/* ══════════════════════════════════════════════
   IRSHAD ULLAH PORTFOLIO — Premium JS
   ══════════════════════════════════════════════ */

/* ── Page Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('done');
  }, 1900);
});

/* ── Theme ── */
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
document.getElementById('themeToggle').addEventListener('click', () => {
  const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
});

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 60), { passive: true });

/* ── Mobile nav ── */
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
mobileToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  mobileToggle.querySelector('i').className = open ? 'bi bi-x' : 'bi bi-list';
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    mobileToggle.querySelector('i').className = 'bi bi-list';
    document.body.style.overflow = '';
  });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const onScroll = () => {
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Scroll-to-top ── */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('visible', scrollY > 500), { passive: true });
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Typed text hero ── */
const roles = ['Full Stack Developer', 'Laravel Expert', 'React Developer', 'API Architect', 'E-Commerce Specialist'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function type() {
  const word = roles[ri];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
  setTimeout(type, deleting ? 55 : 90);
}
setTimeout(type, 2200);

/* ── Scroll-reveal intersection observer ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .tl-item, .project-card').forEach(el => revealObs.observe(el));

/* ── Counter animation ── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(timer); return; }
        el.textContent = Math.floor(current);
      }, 24);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

/* ── Project filter ── */
document.getElementById('projectFilter').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cat = btn.dataset.cat;
  document.querySelectorAll('.project-card').forEach(card => {
    const match = cat === 'all' || card.dataset.category === cat;
    card.classList.toggle('hidden', !match);
    if (match) { card.classList.remove('in-view'); setTimeout(() => revealObs.observe(card), 10); }
  });
});

/* ── Contact form ── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-submit');
  btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Message Sent!';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
    btn.style.background = '';
    this.reset();
  }, 3500);
});

/* ── Custom cursor ── */
const outer = document.getElementById('cursorOuter');
const inner = document.getElementById('cursorInner');
if (window.matchMedia('(pointer: fine)').matches) {
  let mx = 0, my = 0, ox = 0, oy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; inner.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`; });
  function animCursor() {
    ox += (mx - ox) * 0.12;
    oy += (my - oy) * 0.12;
    outer.style.transform = `translate(calc(${ox}px - 50%), calc(${oy}px - 50%))`;
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a, button, .project-card, .skill-tag, .filter-btn, .soc-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
  });
}
