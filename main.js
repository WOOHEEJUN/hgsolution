// Header scroll effect
const header = document.getElementById('top')?.closest('.header') || document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile nav toggle (simple show/hide)
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '70px';
    nav.style.right = '24px';
    nav.style.background = '#faf9f7';
    nav.style.padding = '20px 28px';
    nav.style.borderRadius = '12px';
    nav.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
    nav.style.gap = '16px';
    nav.style.zIndex = '200';
    if (isOpen) nav.style.display = 'none';
  });
  // Close nav on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { nav.style.display = 'none'; });
  });
}

// Contact form submission (placeholder)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    // Simulate send
    setTimeout(() => {
      btn.textContent = 'Inquiry Sent!';
      btn.style.background = '#2d5a3d';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Inquiry';
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1200);
  });
}

// Fade-in on scroll (Intersection Observer)
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
