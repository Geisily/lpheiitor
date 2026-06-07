// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll animations
const animEls = document.querySelectorAll('.hero-text, .hero-photo, .about-photo, .about-content, .service-card, .about-stats, .contact-card, .tag, h2, .section-chip, .contact-sub');

animEls.forEach((el, i) => {
  const delay = (i % 4) * 0.1;
  el.style.transitionDelay = delay + 's';

  const type = el.classList.contains('hero-photo') || el.classList.contains('about-content') ? 'fade-left'
             : el.classList.contains('about-photo') ? 'fade-right'
             : 'fade-up';
  el.classList.add(type);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up, .fade-right, .fade-left').forEach(el => observer.observe(el));

// FAQ: só uma pergunta aberta por vez
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach(other => { if (other !== item) other.open = false; });
    }
  });
});

// Smooth anchor offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
