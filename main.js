// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
let navOpen = false;

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    navOpen = !navOpen;
    nav.classList.toggle('nav--open', navOpen);
    navToggle.innerHTML = navOpen ? '&#10005;' : '&#9776;';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navOpen = false;
      nav.classList.remove('nav--open');
      navToggle.innerHTML = '&#9776;';
    });
  });

  // 외부 클릭시 닫기
  document.addEventListener('click', (e) => {
    if (navOpen && !nav.contains(e.target) && !navToggle.contains(e.target)) {
      navOpen = false;
      nav.classList.remove('nav--open');
      navToggle.innerHTML = '&#9776;';
    }
  });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.product-card, .why__card, .about__grid');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
