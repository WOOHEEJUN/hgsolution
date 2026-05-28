// ── LANGUAGE SWITCH ──────────────────────────────
const SUPPORTED_LANGS = ['en', 'ko', 'ja'];
const LANG_LABEL = { en: 'English', ko: '한국어', ja: '日本語' };

function applyLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  document.documentElement.dataset.lang = lang;
  localStorage.setItem('hg-lang', lang);

  // Update current-lang label in globe button
  document.querySelectorAll('.lang-current').forEach(el => {
    el.textContent = LANG_LABEL[lang];
  });

  // Update active option marker in dropdowns
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('lang-option--active', opt.dataset.lang === lang);
  });

  // Update input placeholders
  document.querySelectorAll('[data-ph-en]').forEach(el => {
    const ph = lang === 'ko' ? el.dataset.phKo
             : lang === 'ja' ? el.dataset.phJa
             : el.dataset.phEn;
    if (el.tagName === 'SELECT') {
      if (el.options[0]) el.options[0].text = ph || '';
    } else {
      el.placeholder = ph || '';
    }
  });
}

// Globe dropdown toggle
function setupLangSwitch() {
  document.querySelectorAll('.lang-switch').forEach(sw => {
    const btn = sw.querySelector('.lang-globe');
    const menu = sw.querySelector('.lang-dropdown');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sw.classList.contains('lang-switch--open');
      // Close all others first
      document.querySelectorAll('.lang-switch--open').forEach(s => s.classList.remove('lang-switch--open'));
      if (!isOpen) sw.classList.add('lang-switch--open');
    });

    menu.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        applyLang(opt.dataset.lang);
        sw.classList.remove('lang-switch--open');
      });
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.lang-switch--open').forEach(sw => {
      if (!sw.contains(e.target)) sw.classList.remove('lang-switch--open');
    });
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-switch--open').forEach(sw => sw.classList.remove('lang-switch--open'));
    }
  });
}

setupLangSwitch();
applyLang(localStorage.getItem('hg-lang') || 'en');

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

// Hero parallax (데스크탑 전용 + reduced-motion 대응)
const heroSection = document.querySelector('.hero');
const heroBgImg   = document.querySelector('.hero__bg img');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroSection && heroBgImg && !prefersReducedMotion) {
  let rafPending = false;

  window.addEventListener('scroll', () => {
    // 768px 미만(모바일)은 비활성화 — iOS Safari 버벅임 방지
    if (window.innerWidth < 768) return;
    if (rafPending) return;

    rafPending = true;
    requestAnimationFrame(() => {
      const scrollY    = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      if (scrollY <= heroHeight) {
        heroBgImg.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
      rafPending = false;
    });
  }, { passive: true });
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
