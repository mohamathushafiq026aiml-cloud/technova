/**
 * @license
 * TECHNOVA 2026 — Master Client Script
 * Inter-College Technology Event | Sir Issac Newton College of Eng. & Tech.
 * Pure Vanilla JavaScript (ES6+) with LocalStorage Data Management
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. Canvas Particle Background System
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic particle count based on screen width for performance
    const particleCount = width < 768 ? 55 : 95;
    const maxDistance = 110;

    // Mouse coordinates for particle interaction
    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Particle Object
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        // Alternating neon green, cyan, and white tint
        const rand = Math.random();
        if (rand < 0.6) {
          this.color = 'rgba(0, 255, 136, '; // Neon green
        } else if (rand < 0.85) {
          this.color = 'rgba(0, 217, 255, '; // Electric cyan
        } else {
          this.color = 'rgba(255, 255, 255, '; // Pure white
        }
        this.baseAlpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        // Natural movement
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries smoothly
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // React naturally to mouse cursor proximity
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.baseAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ff88';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // Render connection lines between nearby particles
    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Main animation loop
    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Debounced window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 150);
    });
  }

  /* ==========================================================================
     02. Mouse Cursor Radial Flashlight Glow
     ========================================================================== */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth lerp follow for cursor glow
    function updateCursorGlow() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(updateCursorGlow);
    }
    updateCursorGlow();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  /* ==========================================================================
     03. 3D Tilt Micro-Interactions (Hero Orb & Feature Cards)
     ========================================================================== */
  const visualCanvas = document.querySelector('.visual-canvas');
  if (visualCanvas && window.matchMedia('(hover: hover)').matches) {
    const heroVisual = document.querySelector('.hero-visual-wrapper');
    if (heroVisual) {
      heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = (y / (rect.height / 2)) * -12;
        const tiltY = (x / (rect.width / 2)) * 12;
        visualCanvas.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });

      heroVisual.addEventListener('mouseleave', () => {
        visualCanvas.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    }
  }

  // Tilt effect for Feature Cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -5;
      const tiltY = (x / (rect.width / 2)) * 5;
      card.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ==========================================================================
     04. Navigation Scroll State & Smooth Scrolling
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu on clicking any link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     05. Animated Statistics Counters (IntersectionObserver)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateStats();
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsCluster = document.querySelector('.stats-cluster');
  if (statsCluster) {
    statsObserver.observe(statsCluster);
  }

  function animateStats() {
    statNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const padZero = el.getAttribute('data-pad') === 'true';
      const duration = 1600;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // EaseOutExpo curve
        const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(easeVal * target);

        let displayCount = String(currentCount);
        if (padZero && currentCount < 10) {
          displayCount = '0' + displayCount;
        }

        el.textContent = `${prefix}${displayCount}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          let finalCount = String(target);
          if (padZero && target < 10) finalCount = '0' + finalCount;
          el.textContent = `${prefix}${finalCount}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  /* ==========================================================================
     06. Timeline Scroll Reveal Animation
     ========================================================================== */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.15 }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });

  /* ==========================================================================
     07. Track Pre-Selection from Feature Cards
     ========================================================================== */
  featureCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const trackName = card.getAttribute('data-track');
      const eventSelect = document.getElementById('eventSelect');
      const regSection = document.getElementById('register');

      if (eventSelect && trackName) {
        eventSelect.value = trackName;
        // Trigger visual highlight on select input
        eventSelect.classList.remove('has-error');
        eventSelect.style.borderColor = 'var(--neon-green)';
        setTimeout(() => {
          eventSelect.style.borderColor = '';
        }, 1200);
      }

      if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     08. LocalStorage Registration Data Management
     ========================================================================== */
  const STORAGE_KEY = 'technovaRegistrations';

  // Helper: Retrieve all stored registrations from LocalStorage
  function getStoredRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error reading localStorage for TechNova:', err);
      return [];
    }
  }

  // Helper: Save registration record into LocalStorage
  function saveRegistration(record) {
    const existing = getStoredRegistrations();
    existing.unshift(record); // Prepend newest
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    updateSeatsCount();
  }

  // Update Seats Claimed Badge
  function updateSeatsCount() {
    const countEl = document.getElementById('claimedSeatsCount');
    if (countEl) {
      const count = getStoredRegistrations().length;
      // Start with base of 384 registrations + actual stored count
      countEl.textContent = String(384 + count);
    }
  }
  updateSeatsCount();

  /* ==========================================================================
     09. Registration Form Validation & Submission
     ========================================================================== */
  const regForm = document.getElementById('technovaForm');
  const fullName = document.getElementById('fullName');
  const regNumber = document.getElementById('regNumber');
  const department = document.getElementById('department');
  const yearOfStudy = document.getElementById('yearOfStudy');
  const email = document.getElementById('email');
  const mobile = document.getElementById('mobile');
  const eventSelect = document.getElementById('eventSelect');
  const agreeTerms = document.getElementById('agreeTerms');
  const submitBtn = document.getElementById('submitBtn');

  // Helper: Show inline field error
  function setError(inputEl, errorId, message) {
    inputEl.classList.add('has-error');
    const errSpan = document.getElementById(errorId);
    if (errSpan) {
      errSpan.textContent = message;
      errSpan.classList.add('visible');
    }
  }

  // Helper: Clear inline field error
  function clearError(inputEl, errorId) {
    inputEl.classList.remove('has-error');
    const errSpan = document.getElementById(errorId);
    if (errSpan) {
      errSpan.textContent = '';
      errSpan.classList.remove('visible');
    }
  }

  // Individual Field Validators
  function validateName() {
    const val = fullName.value.trim();
    if (!val) {
      setError(fullName, 'nameError', 'Participant name is required.');
      return false;
    }
    if (val.length < 2) {
      setError(fullName, 'nameError', 'Name must be at least 2 characters.');
      return false;
    }
    if (!/^[a-zA-Z\s\.]+$/.test(val)) {
      setError(fullName, 'nameError', 'Name should only contain letters, dots, and spaces.');
      return false;
    }
    clearError(fullName, 'nameError');
    return true;
  }

  function validateRegNumber() {
    const val = regNumber.value.trim();
    if (!val) {
      setError(regNumber, 'regError', 'Register / Roll number is required.');
      return false;
    }
    if (val.length < 3) {
      setError(regNumber, 'regError', 'Enter a valid register number.');
      return false;
    }
    clearError(regNumber, 'regError');
    return true;
  }

  function validateDepartment() {
    const val = department.value.trim();
    if (!val) {
      setError(department, 'deptError', 'Department / College name is required.');
      return false;
    }
    clearError(department, 'deptError');
    return true;
  }

  function validateYear() {
    const val = yearOfStudy.value;
    if (!val) {
      setError(yearOfStudy, 'yearError', 'Please select your current year of study.');
      return false;
    }
    clearError(yearOfStudy, 'yearError');
    return true;
  }

  function validateEmail() {
    const val = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      setError(email, 'emailError', 'Email address is required.');
      return false;
    }
    if (!emailPattern.test(val)) {
      setError(email, 'emailError', 'Enter a valid email address (e.g. name@college.edu).');
      return false;
    }
    clearError(email, 'emailError');
    return true;
  }

  function validateMobile() {
    const val = mobile.value.trim();
    // Indian mobile number: 10 digits starting with 6, 7, 8, or 9
    const phonePattern = /^[6-9]\d{9}$/;
    if (!val) {
      setError(mobile, 'mobileError', 'Mobile number is required.');
      return false;
    }
    if (!phonePattern.test(val)) {
      setError(mobile, 'mobileError', 'Enter a valid 10-digit Indian mobile starting with 6–9.');
      return false;
    }
    clearError(mobile, 'mobileError');
    return true;
  }

  function validateEvent() {
    const val = eventSelect.value;
    if (!val) {
      setError(eventSelect, 'eventError', 'Please select a competitive track or workshop.');
      return false;
    }
    clearError(eventSelect, 'eventError');
    return true;
  }

  function validateAgreement() {
    if (!agreeTerms.checked) {
      agreeTerms.classList.add('has-error');
      const errSpan = document.getElementById('agreeError');
      if (errSpan) {
        errSpan.textContent = 'You must confirm and agree to participate.';
        errSpan.classList.add('visible');
      }
      return false;
    }
    agreeTerms.classList.remove('has-error');
    const errSpan = document.getElementById('agreeError');
    if (errSpan) {
      errSpan.textContent = '';
      errSpan.classList.remove('visible');
    }
    return true;
  }

  // Real-time input listeners to clear errors as user types
  fullName?.addEventListener('input', validateName);
  regNumber?.addEventListener('input', validateRegNumber);
  department?.addEventListener('input', validateDepartment);
  yearOfStudy?.addEventListener('change', validateYear);
  email?.addEventListener('input', validateEmail);
  mobile?.addEventListener('input', validateMobile);
  eventSelect?.addEventListener('change', validateEvent);
  agreeTerms?.addEventListener('change', validateAgreement);

  // Form Submit Handler
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Run all validations
      const isNameValid = validateName();
      const isRegValid = validateRegNumber();
      const isDeptValid = validateDepartment();
      const isYearValid = validateYear();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobile();
      const isEventValid = validateEvent();
      const isAgreeValid = validateAgreement();

      const isFormValid =
        isNameValid &&
        isRegValid &&
        isDeptValid &&
        isYearValid &&
        isEmailValid &&
        isMobileValid &&
        isEventValid &&
        isAgreeValid;

      if (!isFormValid) {
        // Find first invalid input and focus it smoothly
        const firstErrorInput = regForm.querySelector('.has-error');
        if (firstErrorInput) {
          firstErrorInput.focus();
        }
        return;
      }

      // Visual button loading state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin" style="animation: spin-clockwise 1s infinite linear;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          CONFIRMING REGISTRATION...
        `;
      }

      // Generate Unique Pass ID (e.g. TN26-8A3F)
      const randomHex = Math.floor(Math.random() * 0xffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, '0');
      const passId = `TN26-${randomHex}`;

      const newRegistration = {
        name: fullName.value.trim(),
        regNumber: regNumber.value.trim(),
        department: department.value.trim(),
        year: yearOfStudy.value,
        email: email.value.trim(),
        mobile: mobile.value.trim(),
        event: eventSelect.value,
        passId: passId,
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Simulate instantaneous processing delay for realistic UX feedback
      setTimeout(() => {
        // Save to LocalStorage
        saveRegistration(newRegistration);

        // Reset submit button
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.innerHTML = `COMPLETE REGISTRATION ↗`;
        }

        // Show Success Modal with Digital Pass
        openSuccessModal(newRegistration);

        // Reset form fields
        regForm.reset();
      }, 600);
    });
  }

  /* ==========================================================================
     10. Success Modal & Digital Pass Display
     ========================================================================== */
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalAwesomeBtn = document.getElementById('modalAwesomeBtn');
  const printPassBtn = document.getElementById('printPassBtn');

  function openSuccessModal(data) {
    if (!successModal) return;

    // Fill personalized message
    const msgEl = document.getElementById('modalDynamicMessage');
    if (msgEl) {
      msgEl.innerHTML = `Thanks, <strong style="color: #ffffff;">${escapeHTML(
        data.name
      )}</strong>! Your registration for <strong style="color: var(--neon-green);">${escapeHTML(
        data.event
      )}</strong> has been recorded successfully.`;
    }

    // Populate Digital Pass Elements
    const passIdEl = document.getElementById('passIdDisplay');
    const passNameEl = document.getElementById('passNameDisplay');
    const passRegEl = document.getElementById('passRegDisplay');
    const passEventEl = document.getElementById('passEventDisplay');
    const passDeptEl = document.getElementById('passDeptDisplay');

    if (passIdEl) passIdEl.textContent = data.passId;
    if (passNameEl) passNameEl.textContent = data.name;
    if (passRegEl) passRegEl.textContent = data.regNumber;
    if (passEventEl) passEventEl.textContent = data.event;
    if (passDeptEl) passDeptEl.textContent = `${data.department} (${data.year})`;

    // Activate modal
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeSuccessModal);
  modalAwesomeBtn?.addEventListener('click', closeSuccessModal);

  // Print Pass
  printPassBtn?.addEventListener('click', () => {
    window.print();
  });

  // Close modal when clicking outside of card
  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) {
      closeSuccessModal();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal?.classList.contains('active')) {
      closeSuccessModal();
    }
  });

  /* ==========================================================================
     11. Stored Registrations Drawer (For College Evaluation & Admin Preview)
     ========================================================================== */
  const viewStoredBtn = document.getElementById('viewStoredBtn');
  const recordsDrawer = document.getElementById('recordsDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const clearDataBtn = document.getElementById('clearDataBtn');
  const drawerList = document.getElementById('drawerList');

  function renderStoredRecords() {
    if (!drawerList) return;
    const records = getStoredRegistrations();

    if (records.length === 0) {
      drawerList.innerHTML = `
        <div class="empty-records-msg">
          <p>No local registrations found yet.</p>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Fill out the registration form above to see entries saved in LocalStorage.</span>
        </div>
      `;
      return;
    }

    drawerList.innerHTML = records
      .map(
        (rec) => `
        <div class="registration-record">
          <div class="record-item">
            <span class="record-key">PASS ID</span>
            <span class="record-val" style="color: var(--neon-green); font-family: var(--font-mono);">${escapeHTML(
              rec.passId
            )}</span>
          </div>
          <div class="record-item">
            <span class="record-key">PARTICIPANT</span>
            <span class="record-val">${escapeHTML(rec.name)}</span>
          </div>
          <div class="record-item">
            <span class="record-key">REGISTER NO</span>
            <span class="record-val">${escapeHTML(rec.regNumber)}</span>
          </div>
          <div class="record-item">
            <span class="record-key">EVENT TRACK</span>
            <span class="record-val">${escapeHTML(rec.event)}</span>
          </div>
          <div class="record-item">
            <span class="record-key">ORGANIZATION</span>
            <span class="record-val">${escapeHTML(rec.department)} · ${escapeHTML(
          rec.year
        )}</span>
          </div>
          <div class="record-item">
            <span class="record-key">TIMESTAMP</span>
            <span class="record-val" style="font-size: 0.75rem; color: var(--text-muted);">${escapeHTML(
              rec.formattedDate || rec.timestamp
            )}</span>
          </div>
        </div>
      `
      )
      .join('');
  }

  viewStoredBtn?.addEventListener('click', () => {
    renderStoredRecords();
    recordsDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeDrawerBtn?.addEventListener('click', () => {
    recordsDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  });

  recordsDrawer?.addEventListener('click', (e) => {
    if (e.target === recordsDrawer) {
      recordsDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Clear all sample registrations
  clearDataBtn?.addEventListener('click', () => {
    if (confirm('Clear all locally saved TechNova registrations?')) {
      localStorage.removeItem(STORAGE_KEY);
      renderStoredRecords();
      updateSeatsCount();
    }
  });

  /* ==========================================================================
     12. Smooth Scroll for Anchor Links & Back-to-Top
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  backToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Universal smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Helper utility: XSS prevention
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
