// =====================================================
// ATLAS DIGITAL - MAIN JAVASCRIPT
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===================== CONSOLE LOG =====================
  console.log('%cATLAS Digital 🗺️', 'color: #0066ff; font-size: 24px; font-weight: 900;');
  console.log('%cAgência de Tráfego Pago & Criativo', 'color: #94a3b8; font-size: 14px;');

  // ===================== HEADER & NAV =====================
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-link');

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      hamburger?.classList.remove('active');
    });
  });

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(2, 6, 23, 0.95)';
    } else {
      header.style.background = 'rgba(2, 6, 23, 0.8)';
    }

    // Update active nav link
    updateActiveNavLink();
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  // ===================== BACK TO TOP =====================
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===================== TESTIMONIALS SLIDER =====================
  const testimonialsSlider = document.getElementById('testimonialsSlider');
  const testimonialCards = testimonialsSlider?.querySelectorAll('.testimonial-card') || [];
  const testimonialsDots = document.getElementById('testimonialsDots');
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');

  let currentTestimonial = 0;

  function createDots() {
    if (!testimonialsDots) return;
    
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
      dot.addEventListener('click', () => goToTestimonial(index));
      testimonialsDots.appendChild(dot);
    });
  }

  function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonials();
  }

  function updateTestimonials() {
    testimonialCards.forEach((card, index) => {
      card.classList.toggle('active', index === currentTestimonial);
    });

    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentTestimonial);
    });
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
      updateTestimonials();
    });
  }

  if (testimonialNext) {
    testimonialNext.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      updateTestimonials();
    });
  }

  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonials();
  }, 8000);

  createDots();
  if (testimonialCards.length > 0) {
    testimonialCards[0].classList.add('active');
  }

  // ===================== SCROLL ANIMATIONS (AOS) =====================
  function observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-aos-delay') || '0';
          entry.target.style.animationDelay = `${delay}ms`;
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }

  observeElements();

  // ===================== SMOOTH SCROLL FOR ANCHORS =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ===================== FLOATING CTA VISIBILITY =====================
  const floatingCta = document.getElementById('floatingCta');
  const heroSection = document.querySelector('.hero');

  if (floatingCta && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      if (window.scrollY > heroBottom) {
        floatingCta.style.opacity = '1';
        floatingCta.style.pointerEvents = 'auto';
      } else {
        floatingCta.style.opacity = '0.5';
      }
    });
  }

  // ===================== BUTTON INTERACTIONS =====================
  document.querySelectorAll('.btn-primary, .btn-primary-large, .btn-secondary, .btn-whatsapp').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // ===================== COUNTER ANIMATION =====================
  function animateCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
      const text = stat.textContent.trim();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(stat, text);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(stat);
    });
  }

  function animateCounter(element, text) {
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '').trim();
    
    if (!isNaN(number)) {
      let current = 0;
      const increment = Math.ceil(number / 30);
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= number) {
          element.textContent = number + suffix;
          clearInterval(interval);
        } else {
          element.textContent = current + suffix;
        }
      }, 30);
    }
  }

  animateCounters();

  // ===================== FORM HANDLING =====================
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Aqui você pode adicionar lógica de envio do formulário
      console.log('Formulário enviado!');
    });
  }

  // ===================== KEYBOARD NAVIGATION =====================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav?.classList.remove('active');
      hamburger?.classList.remove('active');
    }
  });

  // ===================== TOUCH/SWIPE SUPPORT =====================
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next testimonial
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      } else {
        // Swipe right - prev testimonial
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
      }
      updateTestimonials();
    }
  }

  // ===================== PERFORMANCE OPTIMIZATION =====================
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===================== ACCESSIBILITY =====================
  // Add focus styles for keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  console.log('%cSite carregado com sucesso! 🚀', 'color: #0066ff; font-weight: bold;');
});
