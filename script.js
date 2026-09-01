function getNavOffset() {
  const nav = document.getElementById('nav');
  return nav ? nav.offsetHeight + 12 : 80;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - getNavOffset();
  window.scrollTo({ top, behavior: 'smooth' });
}

window.scrollToSection = scrollToSection;

document.getElementById('year').textContent = new Date().getFullYear();

const html = document.documentElement;
html.removeAttribute('data-theme');
localStorage.setItem('theme', 'light');

function toggleTheme() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  if (isDark) {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}

const nav = document.getElementById('nav');
const sections = ['home', 'about', 'projects', 'achievements'];
const navLinks = document.querySelectorAll('[data-section]');
let lastScrollY = 0;

document.querySelectorAll('[data-scroll-target]').forEach(button => {
  button.addEventListener('click', () => {
    scrollToSection(button.dataset.scrollTarget);
    if (button.closest('#mobile-menu')) {
      closeMenu();
    }
  });
});

function updateNav() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 50);
  if (y > lastScrollY && y > 120) {
    nav.classList.add('hidden-nav');
  } else {
    nav.classList.remove('hidden-nav');
  }
  lastScrollY = y;
  let active = 'home';
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) { active = id; break; }
  }
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === active));
  document.getElementById('back-top').classList.toggle('show', y > 400);
}

window.addEventListener('scroll', updateNav, { passive: true });

function toggleMenu() {
  document.getElementById('nav-toggle').classList.toggle('open');
  document.getElementById('mobile-menu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('nav-toggle').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const fill = e.target.querySelector('.skill-fill');
      if (fill) {
        const level = e.target.dataset.level || 0;
        setTimeout(() => { fill.style.width = level + '%'; }, 200);
      }
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .skill-card')
  .forEach(el => revealObs.observe(el));

function toggleAch(card) {
  const hl = card.querySelector('.ach-highlights');
  const hint = card.querySelector('.ach-hint');
  const open = hl.classList.toggle('open');
  card.classList.toggle('expanded', open);
  hint.textContent = open ? 'Click to collapse' : 'Click to expand';
}
