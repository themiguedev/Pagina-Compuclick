/* =============================================
   COMPU@CLICK — MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR: mobile toggle ----
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- NAVBAR: active link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  }

  // ---- CURRICULUM TABS ----
  const tabBtns  = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // ---- BLOG FILTERS ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards  = document.querySelectorAll('.blog-card[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        blogCards.forEach(card => {
          const show = cat === 'all' || card.dataset.category === cat;
          card.style.display = show ? 'block' : 'none';
          if (show) card.style.animation = 'fadeInUp 0.35s ease both';
        });
      });
    });
  }

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>⏳</span> Enviando...';
      btn.disabled = true;

      // Simulate sending (replace with actual mailto / formspree)
      setTimeout(() => {
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        if (formSuccess) {
          formSuccess.classList.add('show');
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1200);
    });
  }

  // ---- PROGRESS BARS ANIMATION ----
  const progressFills = document.querySelectorAll('.progress-bar-fill');
  if (progressFills.length > 0) {
    const pbObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.width;
          pbObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    progressFills.forEach(el => {
      const w = el.style.width;
      el.style.width = '0';
      el.dataset.width = w;
      pbObs.observe(el);
    });
  }

  // ---- COUNTER ANIMATION (stats) ----
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const end = parseInt(el.dataset.count, 10);
          const dur = 1400;
          const step = Math.ceil(end / (dur / 20));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= end) { current = end; clearInterval(timer); }
            el.textContent = current + (el.dataset.suffix || '');
          }, 20);
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => cObs.observe(el));
  }

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- DOWNLOAD PDF PLACEHOLDER ----
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('📄 ¡El PDF del currículum estará disponible próximamente!\nContáctanos para recibir la propuesta completa.');
    });
  });

  console.log('🚀 Compu@click cargado correctamente');
});
