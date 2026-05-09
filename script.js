// =========================================
// FRONT KELLNER GROUP — script.js
// =========================================

// --- Sticky header on scroll ---
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// --- Hero bg parallax / load trigger ---
const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
  let scrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;

    // Only trigger an update if one isn't already in progress
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Multiplier: 0.2 is subtle, 0.4 is intense. 
        // Using translate3d forces Hardware Acceleration (GPU)
        heroBg.style.transform = `scale(1.05) translate3d(0, ${scrollY * 0.3}px, 0)`;
        ticking = false;
      });

      ticking = true;
    }
  }, { passive: true });
}

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// --- Active nav highlight on scroll ---
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
     navLinks.forEach(link => {
  link.classList.toggle(
    'active',
    link.getAttribute('href') === `#${entry.target.id}`
  );
});
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
