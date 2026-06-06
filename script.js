// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// Seleciona elementos para animar
const animTargets = [
  ['.hero-text',       'fade-right'],
  ['.hero-photo',      'fade-left'],
  ['.homecare-header', 'fade-up'],
  ['.homecare-card',   'fade-up'],
  ['.pat-card',        'fade-up'],
  ['.about-photo',     'fade-right'],
  ['.about-content',   'fade-left'],
  ['.cidade-card',     'fade-up'],
  ['.contact-card',    'fade-up'],
  ['.section-chip',    'fade-up'],
];

animTargets.forEach(([sel, cls]) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add(cls);
    el.style.transitionDelay = (i * 0.08) + 's';
    observer.observe(el);
  });
});

// Smooth anchor com offset de navbar
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
