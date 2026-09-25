/**
 * @license
<<<<<<< HEAD
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return <div></div>;
=======
 * TECHNOVA 2026 — Inter-College Technology Event
 * Sir Issac Newton College of Engineering & Technology, Nagapattinam
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Code2,
  Trophy,
  ShieldAlert,
  Globe,
  Users2,
  Calendar,
  MapPin,
  Mail,
  Clock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Printer,
  Sparkles,
  ChevronDown,
  Layers,
  Award
} from 'lucide-react';

interface RegistrationRecord {
  id: string;
  passId: string;
  name: string;
  regNumber: string;
  department: string;
  year: string;
  email: string;
  mobile: string;
  event: string;
  timestamp: string;
  formattedDate: string;
}

const STORAGE_KEY = 'technovaRegistrations';

const TRACKS = [
  {
    id: 'ai-ml',
    title: 'AI & ML',
    category: 'WORKSHOP & CHALLENGE',
    num: '01',
    icon: Cpu,
    desc: 'Explore intelligent systems and real-world AI applications. Build generative models, deploy neural architectures, and solve computer vision challenges.',
    value: 'AI & ML Workshop',
    color: 'var(--neon-green)'
  },
  {
    id: 'coding-arena',
    title: 'CODING ARENA',
    category: 'COMPETITIVE SPRINT',
    num: '02',
    icon: Code2,
    desc: 'Race against time to solve high-pressure algorithmic problems. Multi-round algorithmic faceoff testing speed, memory efficiency, and bug-fixing precision.',
    value: 'Coding Arena',
    color: 'var(--electric-cyan)'
  },
  {
    id: 'project-expo',
    title: 'PROJECT EXPO',
    category: 'INNOVATION SHOWCASE',
    num: '03',
    icon: Trophy,
    desc: 'Present your innovation to academic judges and startup founders. Hardware prototypes, IoT appliances, and full-stack software judged on originality and feasibility.',
    value: 'Project Expo',
    color: 'var(--electric-purple)'
  },
  {
    id: 'cybersecurity',
    title: 'CYBERSECURITY',
    category: 'DEFENSE & CTF',
    num: '04',
    icon: ShieldAlert,
    desc: 'Capture The Flag sprint, network vulnerability penetration testing, cryptography puzzles, and defensive incident mitigation.',
    value: 'Cybersecurity Challenge',
    color: '#ff3366'
  },
  {
    id: 'web-dev',
    title: 'WEB DEV CLOUD',
    category: 'HANDS-ON WORKSHOP',
    num: '05',
    icon: Globe,
    desc: 'Modern web architecture, edge compute deployments, headless systems, API microservices, and serverless state handling.',
    value: 'Web Development Workshop',
    color: '#00d9ff'
  },
  {
    id: 'industry',
    title: 'INDUSTRY TALK',
    category: 'FIRESIDE CONCLAVE',
    num: '06',
    icon: Users2,
    desc: 'Connect with seasoned engineering executives, tech entrepreneurs, and recruitment leads discussing career acceleration in modern software engineering.',
    value: 'Industry Interaction',
    color: 'var(--neon-green)'
  }
];

const TIMELINE = [
  {
    time: '09:00',
    duration: '60 MINS',
    category: 'WELCOME',
    venue: 'Main Auditorium',
    title: 'Registration & Welcome Ceremony',
    desc: 'Participant check-in, official event delegate kit and badge distribution, followed by the auspicious lamp lighting ceremony and presidential address.'
  },
  {
    time: '10:00',
    duration: '90 MINS',
    category: 'COMPETITION',
    venue: 'Computer Center 01',
    title: 'Coding Arena (Round 1 & 2)',
    desc: 'Round 1 algorithmic speed sprint and live syntax debugging. Competitors tackle 5 increasingly difficult algorithmic problems on the live leaderboard.'
  },
  {
    time: '11:30',
    duration: '90 MINS',
    category: 'TECHNICAL WORKSHOP',
    venue: 'Seminar Hall B',
    title: 'AI & Cybersecurity Workshop',
    desc: 'Interactive session exploring multi-modal neural network deployment and red-team penetration testing defense strategies conducted by visiting researchers.'
  },
  {
    time: '13:30',
    duration: '120 MINS',
    category: 'EXHIBITION',
    venue: 'Innovation Pavilion',
    title: 'Project Expo & Live Demonstrations',
    desc: 'Student teams demonstrate working software prototypes and embedded hardware systems before our panel of faculty reviewers and tech startup founders.'
  },
  {
    time: '15:30',
    duration: '60 MINS',
    category: 'FIRESIDE TALK',
    venue: 'Auditorium',
    title: 'Industry Interaction & Tech Panel',
    desc: 'Engaging fireside discussion with senior engineering leads on AI transformation, cloud infrastructure careers, and open-source contribution roadmaps.'
  },
  {
    time: '16:30',
    duration: '60 MINS',
    category: 'VALEDICTORY',
    venue: 'Main Auditorium',
    title: 'Awards Ceremony & Concluding Session',
    desc: 'Announcement of track champions, presentation of ₹50,000 cash prizes, certificate conferrals, delegate appreciation, and the closing photo session.'
  }
];

const FAQS = [
  {
    q: 'Who is eligible to participate in TechNova 2026?',
    a: 'Any undergraduate or postgraduate student enrolled in Engineering, Technology, Computer Science, or allied technical courses from recognized institutions across India can register and participate.'
  },
  {
    q: 'Can I participate in multiple events?',
    a: 'Events are scheduled throughout the day with minimal overlapping. You can participate in one main competitive sprint (e.g. Coding Arena or Project Expo) and also attend workshops and fireside panels.'
  },
  {
    q: 'Is there a registration fee?',
    a: 'Standard delegate entry is sponsored by Sir Issac Newton College of Engineering & Technology. Entry covers official badge, delegate kit, lunch refreshments, and verified certificates.'
  },
  {
    q: 'What should I bring on the day of the event?',
    a: 'Please bring your valid College ID card, printed or digital event pass (available immediately after registration), your laptop and chargers for coding/workshop arenas.'
  }
];

export default function App() {
  // Navigation & UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    department: '',
    yearOfStudy: '',
    email: '',
    mobile: '',
    eventSelect: '',
    agreeTerms: false
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Digital Pass / Modal States
  const [registeredUser, setRegisteredUser] = useState<RegistrationRecord | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [storedRecords, setStoredRecords] = useState<RegistrationRecord[]>([]);

  // Open FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 3D Tilt Ref for Visual Core
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const visualCanvasRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Load Stored Records from LocalStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        setStoredRecords(JSON.parse(data));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Event Date Countdown (24 April 2026)
  useEffect(() => {
    const eventDate = new Date('2026-04-24T09:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for sticky navbar & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'features', 'schedule', 'register', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle Canvas & Cursor Follower
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = width < 768 ? 45 : 85;
    const maxDistance = 110;

    const mouse = { x: -1000, y: -1000, radius: 120 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        const rand = Math.random();
        if (rand < 0.6) {
          this.color = 'rgba(0, 255, 136, ';
        } else if (rand < 0.85) {
          this.color = 'rgba(0, 217, 255, ';
        } else {
          this.color = 'rgba(255, 255, 255, ';
        }
        this.baseAlpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

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

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.baseAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ff88';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let particles = Array.from({ length: particleCount }, () => new Particle());

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = Array.from({ length: width < 768 ? 45 : 85 }, () => new Particle());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 3D Tilt on hero visual
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualWrapperRef.current || !visualCanvasRef.current) return;
    const rect = visualWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;
    visualCanvasRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleHeroMouseLeave = () => {
    if (visualCanvasRef.current) {
      visualCanvasRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  };

  // Form Field Validation
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Participant name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        if (!/^[a-zA-Z\s.]+$/.test(value)) return 'Name should contain only letters, dots and spaces.';
        return '';
      case 'regNumber':
        if (!value.trim()) return 'Register number / Roll No. is required.';
        if (value.trim().length < 3) return 'Enter a valid register number.';
        return '';
      case 'department':
        if (!value.trim()) return 'Department or college name is required.';
        return '';
      case 'yearOfStudy':
        if (!value) return 'Please select your current year of study.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email (e.g. name@college.edu).';
        return '';
      case 'mobile':
        if (!value.trim()) return 'Mobile number is required.';
        if (!/^[6-9]\d{9}$/.test(value.trim())) return 'Enter a valid 10-digit Indian mobile (starts 6-9).';
        return '';
      case 'eventSelect':
        if (!value) return 'Please select a competitive track or workshop.';
        return '';
      case 'agreeTerms':
        if (!value) return 'You must confirm and agree to participate.';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    // Real-time error clearance
    const err = validateField(name, val);
    setFormErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSelectTrack = (trackValue: string) => {
    setFormData((prev) => ({ ...prev, eventSelect: trackValue }));
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key as keyof typeof formData]);
      if (err) errors[key] = err;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstKey = Object.keys(errors)[0];
      const el = document.getElementsByName(firstKey)[0];
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    const randomHex = Math.floor(Math.random() * 0xffff)
      .toString(16)
      .toUpperCase()
      .padStart(4, '0');
    const passId = `TN26-${randomHex}`;

    const newRecord: RegistrationRecord = {
      id: String(Date.now()),
      passId,
      name: formData.fullName.trim(),
      regNumber: formData.regNumber.trim(),
      department: formData.department.trim(),
      year: formData.yearOfStudy,
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      event: formData.eventSelect,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setTimeout(() => {
      const updated = [newRecord, ...storedRecords];
      setStoredRecords(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      setRegisteredUser(newRecord);
      setShowModal(true);
      setIsSubmitting(false);

      // Reset form
      setFormData({
        fullName: '',
        regNumber: '',
        department: '',
        yearOfStudy: '',
        email: '',
        mobile: '',
        eventSelect: '',
        agreeTerms: false
      });
      setFormErrors({});
    }, 550);
  };

  const handleClearRecords = () => {
    if (window.confirm('Clear all locally saved TechNova registrations?')) {
      localStorage.removeItem(STORAGE_KEY);
      setStoredRecords([]);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#06080d] selection:bg-[#00ff88] selection:text-black">
      {/* Dynamic Background Particle Canvas */}
      <canvas id="particle-canvas" ref={canvasRef} aria-hidden="true" />

      {/* Futuristic Cyber Grid */}
      <div className="futuristic-grid" aria-hidden="true" />

      {/* Mouse Flashlight Radial Glow */}
      <div id="cursor-glow" ref={cursorGlowRef} aria-hidden="true" />

      {/* --------------------------------------------------------------------
          01. NAVIGATION
          -------------------------------------------------------------------- */}
      <header>
        <nav
          className={`navbar ${isScrolled ? 'scrolled' : ''}`}
          id="navbar"
          aria-label="Main Navigation"
        >
          <div className="container nav-container">
            <a href="#home" className="nav-brand">
              <div className="brand-badge" aria-hidden="true">
                T
              </div>
              <span className="brand-text">TECHNOVA</span>
              <span className="brand-year">2026</span>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="nav-links hidden md:flex items-center gap-8">
              <li>
                <a
                  href="#home"
                  className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`nav-link ${activeNav === 'about' ? 'active' : ''}`}
                >
                  Event
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className={`nav-link ${activeNav === 'features' ? 'active' : ''}`}
                >
                  Tracks
                </a>
              </li>
              <li>
                <a
                  href="#schedule"
                  className={`nav-link ${activeNav === 'schedule' ? 'active' : ''}`}
                >
                  Schedule
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  className={`nav-link ${activeNav === 'register' ? 'active' : ''}`}
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`}
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Actions */}
            <div className="nav-actions flex items-center gap-4">
              <a href="#register" className="btn-nav-primary">
                <span>JOIN EVENT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                className="md:hidden flex flex-col gap-1.5 p-2 text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-all ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#00ff88]' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#00ff88]' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-[76px] left-0 w-full bg-[#06080d]/95 backdrop-blur-2xl border-b border-white/10 p-6 z-50 flex flex-col gap-4 animate-in slide-in-from-top-4">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between py-2 text-lg font-semibold border-b border-white/5"
            >
              <span>Home</span>
              <span>→</span>
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between py-2 text-lg font-semibold border-b border-white/5"
            >
              <span>About Event</span>
              <span>→</span>
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between py-2 text-lg font-semibold border-b border-white/5"
            >
              <span>Flagship Tracks</span>
              <span>→</span>
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between py-2 text-lg font-semibold border-b border-white/5"
            >
              <span>Schedule</span>
              <span>→</span>
            </a>
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between py-2 text-lg font-semibold border-b border-white/5"
            >
              <span>Registration</span>
              <span>→</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between py-2 text-lg font-semibold border-b border-white/5"
            >
              <span>Venue & Contact</span>
              <span>→</span>
            </a>
            <div className="pt-2">
              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full justify-center"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* --------------------------------------------------------------------
          02. CINEMATIC HERO SECTION
          -------------------------------------------------------------------- */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Typography & CTAs */}
            <div className="hero-content">
              <div className="hero-kicker">
                <span className="kicker-dot" />
                <span>INTER-COLLEGE TECHNOLOGY EVENT · 2026</span>
              </div>

              <h1 className="hero-title">
                TECHNOVA <span className="title-accent">2026</span>
              </h1>

              <div className="hero-tagline">“BUILD THE NEXT BIG THING.”</div>

              <p className="hero-description">
                A high-energy technology experience where students turn ideas into prototypes,
                compete with brilliant minds, and connect with the future of technology.
              </p>

              {/* Live Countdown Clock */}
              <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
                <Clock className="w-4 h-4 text-[#00ff88]" />
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                  EVENT COUNTDOWN:
                </span>
                <div className="flex items-center gap-2 font-mono font-bold text-sm text-white">
                  <span>{timeLeft.days}d</span>
                  <span className="text-[#00ff88]">:</span>
                  <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span className="text-[#00ff88]">:</span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span className="text-[#00ff88]">:</span>
                  <span className="text-[#00ff88]">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              <div className="hero-cta-group">
                <a href="#register" className="btn-primary">
                  <span>REGISTER NOW</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <a href="#about" className="btn-secondary">
                  <span>EXPLORE EVENT</span>
                  <ChevronDown className="w-5 h-5" />
                </a>
              </div>

              {/* Unboxed Clean Event Information Strip */}
              <div className="hero-event-strip">
                <div className="meta-item">
                  <span className="meta-label">DATE</span>
                  <span className="meta-val tabular-nums">24 APRIL 2026</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">INSTITUTION</span>
                  <span className="meta-val">SIR ISSAC NEWTON CET</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">LOCATION</span>
                  <span className="meta-val">NAGAPATTINAM</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">ATTENDEES</span>
                  <span className="meta-val tabular-nums">500+ PARTICIPANTS</span>
                </div>
              </div>
            </div>

            {/* Right Column: Futuristic Animated Central Visual */}
            <div
              className="hero-visual-wrapper"
              ref={visualWrapperRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
            >
              <div
                className="visual-canvas"
                ref={visualCanvasRef}
                aria-label="Futuristic interactive TechNova visual"
              >
                {/* Central Glowing Core Orb */}
                <div className="orb-core">
                  <div className="orb-inner-symbol">TN</div>
                </div>

                {/* Concentric Orbital Gyro Rings */}
                <div className="ring ring-1">
                  <div className="ring-node" />
                </div>
                <div className="ring ring-2">
                  <div className="ring-node" />
                </div>
                <div className="ring ring-3" />

                {/* Floating Glassmorphism Cards */}
                <div className="floating-card card-ai">
                  <Cpu className="text-[#00ff88]" />
                  <div>
                    <div className="text-[0.68rem] text-[#00ff88] font-mono">TRACK 01</div>
                    <div>AI & Machine Learning</div>
                  </div>
                </div>

                <div className="floating-card card-code">
                  <Code2 className="text-[#00d9ff]" />
                  <div>
                    <div className="text-[0.68rem] text-[#00d9ff] font-mono">TRACK 02</div>
                    <div>Coding Arena Sprint</div>
                  </div>
                </div>

                <div className="floating-card card-innovate">
                  <Trophy className="text-[#9d4edd]" />
                  <div>
                    <div className="text-[0.68rem] text-[#9d4edd] font-mono">PRIZE POOL</div>
                    <div>₹50,000 Cash Pool</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <a
            href="#about"
            className="scroll-indicator-wrap cursor-pointer"
            aria-label="Scroll to explore event details"
          >
            <div className="mouse-icon">
              <div className="mouse-wheel" />
            </div>
            <span>SCROLL TO EXPLORE</span>
          </a>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          03. MOVING HORIZONTAL TICKER
          -------------------------------------------------------------------- */}
      <div className="ticker-section" aria-hidden="true">
        <div className="ticker-track">
          <div className="ticker-content">
            <span>INNOVATE</span> <span className="ticker-symbol">✦</span>
            <span>CREATE</span> <span className="ticker-symbol">✦</span>
            <span>COMPETE</span> <span className="ticker-symbol">✦</span>
            <span>CONNECT</span> <span className="ticker-symbol">✦</span>
            <span>TECHNOVA 2026</span> <span className="ticker-symbol">✦</span>
            <span>SIR ISSAC NEWTON COLLEGE</span> <span className="ticker-symbol">✦</span>
            <span>NAGAPATTINAM</span> <span className="ticker-symbol">✦</span>
            <span>BUILD THE NEXT BIG THING</span> <span className="ticker-symbol">✦</span>
          </div>
          <div className="ticker-content">
            <span>INNOVATE</span> <span className="ticker-symbol">✦</span>
            <span>CREATE</span> <span className="ticker-symbol">✦</span>
            <span>COMPETE</span> <span className="ticker-symbol">✦</span>
            <span>CONNECT</span> <span className="ticker-symbol">✦</span>
            <span>TECHNOVA 2026</span> <span className="ticker-symbol">✦</span>
            <span>SIR ISSAC NEWTON COLLEGE</span> <span className="ticker-symbol">✦</span>
            <span>NAGAPATTINAM</span> <span className="ticker-symbol">✦</span>
            <span>BUILD THE NEXT BIG THING</span> <span className="ticker-symbol">✦</span>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          04. ABOUT EVENT & ANIMATED STATS
          -------------------------------------------------------------------- */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            {/* Left: Prose description & domains */}
            <div className="about-text">
              <span className="section-kicker">VISION & PURPOSE</span>
              <h2 className="section-heading">Where ideas become reality.</h2>
              <p>
                <strong>TechNova 2026</strong> is designed for students who don't just follow
                technology — they shape it. Held at the state-of-the-art campus of Sir Issac Newton
                College of Engineering & Technology in Nagapattinam, this conclave brings together
                the brightest undergraduate and postgraduate engineering minds.
              </p>
              <p>
                Engage with industry leaders, test your computational prowess in real-time
                hackathons, and discover the frontier of emerging technological domains:
              </p>

              <div className="about-features-tags">
                {[
                  'Artificial Intelligence',
                  'Machine Learning',
                  'Competitive Coding',
                  'Cybersecurity & CTF',
                  'Web Development',
                  'Project Innovation',
                  'Industry Interaction'
                ].map((tag) => (
                  <div key={tag} className="tech-tag">
                    <span className="tech-tag-dot" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Statistics Bento Grid */}
            <div className="stats-cluster">
              <div className="stat-card">
                <span className="stat-number text-[#00ff88] font-mono">08</span>
                <span className="stat-label">08 EVENTS</span>
                <span className="stat-subtext">Competitive arenas & masterclasses</span>
              </div>

              <div className="stat-card">
                <span className="stat-number text-[#00d9ff] font-mono">500+</span>
                <span className="stat-label">500+ STUDENTS</span>
                <span className="stat-subtext">Delegates across top engineering colleges</span>
              </div>

              <div className="stat-card">
                <span className="stat-number text-[#9d4edd] font-mono">20+</span>
                <span className="stat-label">20+ MENTORS</span>
                <span className="stat-subtext">Industry specialists & tech executives</span>
              </div>

              <div className="stat-card">
                <span className="stat-number text-white font-mono">₹50K</span>
                <span className="stat-label">CASH AWARDS</span>
                <span className="stat-subtext">Merit trophies, vouchers & certificates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          05. FEATURE CARDS (FLAGSHIP ARENAS)
          -------------------------------------------------------------------- */}
      <section className="section pt-4" id="features">
        <div className="container">
          <div className="text-center max-w-[680px] mx-auto mb-10">
            <span className="section-kicker">FLAGSHIP ARENAS</span>
            <h2 className="section-heading">Choose your battleground.</h2>
            <p className="section-subhead mx-auto">
              Demonstrate technical expertise, solve real-world problems under pressure, and
              showcase cutting-edge prototypes.
            </p>
          </div>

          <div className="features-grid">
            {TRACKS.map((track) => {
              const IconComponent = track.icon;
              return (
                <div
                  key={track.id}
                  className="feature-card group"
                  onClick={() => handleSelectTrack(track.value)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectTrack(track.value);
                    }
                  }}
                  aria-label={`Register for ${track.title}`}
                >
                  <div className="card-top">
                    <div className="card-icon-box">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="card-num">{track.num}</span>
                  </div>

                  <div className="card-middle">
                    <span className="card-category">{track.category}</span>
                    <h3 className="card-title">{track.title}</h3>
                    <p className="card-desc">{track.desc}</p>
                  </div>

                  <div className="card-bottom">
                    <span className="card-action-text group-hover:text-[#00ff88]">
                      SELECT TRACK
                    </span>
                    <div className="card-arrow-btn">→</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          06. EVENT SCHEDULE TIMELINE
          -------------------------------------------------------------------- */}
      <section className="section" id="schedule">
        <div className="container">
          <div className="text-center max-w-[640px] mx-auto mb-10">
            <span className="section-kicker">EVENT SCHEDULE</span>
            <h2 className="section-heading">One day. Infinite possibilities.</h2>
            <p className="section-subhead mx-auto">
              Chronological breakdown of sessions, challenges, keynote addresses, and prize
              distributions scheduled for April 24, 2026.
            </p>
          </div>

          <div className="schedule-container">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="timeline-item group">
                <div className="timeline-time-box">
                  <span className="timeline-time">{item.time}</span>
                  <span className="timeline-duration">{item.duration}</span>
                </div>
                <div className="timeline-dot-wrap">
                  <div className="timeline-dot" />
                </div>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <span className="timeline-category">{item.category}</span>
                    <span className="timeline-venue-badge">{item.venue}</span>
                  </div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          07. REGISTRATION SECTION
          -------------------------------------------------------------------- */}
      <section className="registration-section" id="register">
        <div className="container">
          <div className="registration-wrapper">
            <div className="form-header">
              <span className="section-kicker">LIMITED SLOTS AVAILABLE</span>
              <h2 className="section-heading mb-2">Your next chapter starts here.</h2>
              <p className="section-subhead mx-auto">
                Register now to secure your pass for TechNova 2026. Free participation kits, lunch
                refreshments, and verified certificates are provided to all registered delegates.
              </p>

              <div className="registration-stats-bar">
                <span>
                  Seats Claimed:{' '}
                  <strong className="text-[#00ff88] font-mono">
                    {384 + storedRecords.length}
                  </strong>{' '}
                  / 500
                </span>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  className="view-data-btn"
                  onClick={() => setShowDrawer(true)}
                >
                  View Stored Registrations ({storedRecords.length} Local)
                </button>
              </div>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="reg-form" noValidate>
              <div className="form-row">
                {/* 1. Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    <span>Participant Name</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`input-control ${formErrors.fullName ? 'has-error' : ''}`}
                    placeholder="e.g. Vigneshwaran K"
                    autoComplete="name"
                    required
                  />
                  {formErrors.fullName && (
                    <span className="error-msg visible" role="alert">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                {/* 2. Register Number */}
                <div className="form-group">
                  <label htmlFor="regNumber" className="form-label">
                    <span>Register Number / Roll No.</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="regNumber"
                    name="regNumber"
                    value={formData.regNumber}
                    onChange={handleInputChange}
                    className={`input-control ${formErrors.regNumber ? 'has-error' : ''}`}
                    placeholder="e.g. 814321104057"
                    required
                  />
                  {formErrors.regNumber && (
                    <span className="error-msg visible" role="alert">
                      {formErrors.regNumber}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                {/* 3. Department / Organization */}
                <div className="form-group">
                  <label htmlFor="department" className="form-label">
                    <span>Department / Organization</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`input-control ${formErrors.department ? 'has-error' : ''}`}
                    placeholder="e.g. Artificial Intelligence & Data Science"
                    required
                  />
                  {formErrors.department && (
                    <span className="error-msg visible" role="alert">
                      {formErrors.department}
                    </span>
                  )}
                </div>

                {/* 4. Year of Study */}
                <div className="form-group">
                  <label htmlFor="yearOfStudy" className="form-label">
                    <span>Year of Study</span>
                    <span className="required-star">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className={`input-control ${formErrors.yearOfStudy ? 'has-error' : ''}`}
                    required
                  >
                    <option value="">Select your academic year</option>
                    <option value="1st Year">1st Year (Fresher)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="Final Year">Final Year (Senior)</option>
                    <option value="Post-Graduate">Post-Graduate / Research</option>
                  </select>
                  {formErrors.yearOfStudy && (
                    <span className="error-msg visible" role="alert">
                      {formErrors.yearOfStudy}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                {/* 5. Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span>Email Address</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input-control ${formErrors.email ? 'has-error' : ''}`}
                    placeholder="name@college.edu"
                    autoComplete="email"
                    required
                  />
                  {formErrors.email && (
                    <span className="error-msg visible" role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                {/* 6. Mobile Number */}
                <div className="form-group">
                  <label htmlFor="mobile" className="form-label">
                    <span>Mobile Number (10 Digits)</span>
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    maxLength={10}
                    className={`input-control ${formErrors.mobile ? 'has-error' : ''}`}
                    placeholder="e.g. 9876543210"
                    autoComplete="tel"
                    required
                  />
                  {formErrors.mobile && (
                    <span className="error-msg visible" role="alert">
                      {formErrors.mobile}
                    </span>
                  )}
                </div>
              </div>

              {/* 7. Event Selection */}
              <div className="form-group full-width">
                <label htmlFor="eventSelect" className="form-label">
                  <span>Event Track Selection</span>
                  <span className="required-star">*</span>
                </label>
                <select
                  id="eventSelect"
                  name="eventSelect"
                  value={formData.eventSelect}
                  onChange={handleInputChange}
                  className={`input-control ${formErrors.eventSelect ? 'has-error' : ''}`}
                  required
                >
                  <option value="">Select the track you wish to participate in</option>
                  <option value="AI & ML Workshop">
                    AI & ML Workshop (Deep Learning & LLM Pipelines)
                  </option>
                  <option value="Coding Arena">
                    Coding Arena (Algorithmic Battle & Speed Debugging)
                  </option>
                  <option value="Cybersecurity Challenge">
                    Cybersecurity Challenge (Capture The Flag & Network Defense)
                  </option>
                  <option value="Project Expo">
                    Project Expo (Hardware & Software Prototype Showcase)
                  </option>
                  <option value="Web Development Workshop">
                    Web Development Workshop (Modern React & Cloud Native Web)
                  </option>
                  <option value="Industry Interaction">
                    Industry Interaction (Fireside Chats & Tech Recruitment Insights)
                  </option>
                </select>
                {formErrors.eventSelect && (
                  <span className="error-msg visible" role="alert">
                    {formErrors.eventSelect}
                  </span>
                )}
              </div>

              {/* 8. Agreement Checkbox */}
              <div className="checkbox-group">
                <label className="checkbox-label" htmlFor="agreeTerms">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className={`custom-checkbox ${formErrors.agreeTerms ? 'has-error' : ''}`}
                    required
                  />
                  <span>
                    I confirm that the information provided is accurate and I agree to participate
                    in TechNova 2026 at Sir Issac Newton College of Engineering & Technology.
                  </span>
                </label>
                {formErrors.agreeTerms && (
                  <span className="error-msg visible mt-1.5" role="alert">
                    {formErrors.agreeTerms}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block mr-2">◌</span>
                    <span>CONFIRMING REGISTRATION...</span>
                  </>
                ) : (
                  <>
                    <span>COMPLETE REGISTRATION</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          08. FREQUENTLY ASKED QUESTIONS
          -------------------------------------------------------------------- */}
      <section className="section py-16">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-kicker">QUESTIONS ANSWERED</span>
            <h2 className="section-heading text-3xl">Everything you need to know.</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-[#0e1422]/80 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    className="w-full p-5 text-left flex justify-between items-center font-semibold text-lg hover:text-[#00ff88]"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#00ff88]' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          09. CONTACT & VENUE SECTION
          -------------------------------------------------------------------- */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-card-box">
            <div className="contact-layout">
              <div>
                <span className="section-kicker">GET IN TOUCH</span>
                <h2 className="section-heading">Ready to make noise?</h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Connect with the TechNova coordinating committee for campus logistics,
                  inter-college transport assistance, and team inquiries.
                </p>

                <div className="contact-info-list">
                  {/* Venue */}
                  <div className="contact-item">
                    <div className="contact-icon" aria-hidden="true">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="contact-label">VENUE</div>
                      <div className="contact-val">
                        Sir Issac Newton College of Engineering & Technology
                        <br />
                        Nagapattinam, Tamil Nadu 611102
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-item">
                    <div className="contact-icon" aria-hidden="true">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="contact-label">OFFICIAL EMAIL</div>
                      <div className="contact-val">
                        <a href="mailto:technova@college.edu">technova@college.edu</a>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="contact-item">
                    <div className="contact-icon" aria-hidden="true">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="contact-label">DATE & TIMING</div>
                      <div className="contact-val tabular-nums">
                        24 APRIL 2026
                        <br />
                        09:00 AM — 05:30 PM IST
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Registration CTA Panel */}
              <div className="contact-cta-panel">
                <div className="font-mono text-xs text-[#00ff88]">
                  EARLY REGISTRATION OPEN
                </div>
                <h4 className="text-xl font-bold text-white">
                  Secure your delegate slot now
                </h4>
                <p className="text-slate-400 text-sm">
                  Passes are allocated on a first-come, first-served basis for all college teams.
                </p>
                <a href="#register" className="btn-primary mt-2">
                  <span>GET YOUR PASS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          10. FOOTER
          -------------------------------------------------------------------- */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a href="#home" className="nav-brand">
              <div className="brand-badge" aria-hidden="true">
                T
              </div>
              <span className="brand-text">TECHNOVA</span>
              <span className="brand-year">2026</span>
            </a>

            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#features">Tracks</a>
              </li>
              <li>
                <a href="#schedule">Schedule</a>
              </li>
              <li>
                <a href="#register">Register</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>

            <button
              type="button"
              className="btn-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span>Back to top</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>

          <div className="footer-bottom">
            <div>© 2026 TechNova. Built to innovate.</div>
            <div className="footer-institution">
              Sir Issac Newton College of Engineering & Technology, Nagapattinam
            </div>
          </div>
        </div>
      </footer>

      {/* --------------------------------------------------------------------
          11. SUCCESS CONFIRMATION MODAL & DIGITAL EVENT PASS
          -------------------------------------------------------------------- */}
      {showModal && registeredUser && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="modal-badge-icon" aria-hidden="true">
              <CheckCircle2 className="w-8 h-8 text-[#00ff88]" />
            </div>

            <span className="modal-kicker">✓ REGISTRATION COMPLETE</span>
            <h3 className="modal-title">You're on the list.</h3>
            <p className="modal-message">
              Thanks, <strong className="text-white">{registeredUser.name}</strong>! Your
              registration for{' '}
              <strong className="text-[#00ff88]">{registeredUser.event}</strong> has been
              recorded successfully.
            </p>

            {/* Digital Pass Graphic Card */}
            <div className="digital-pass">
              <div className="pass-header">
                <div className="pass-brand">
                  <span className="text-[#00ff88]">T</span> TECHNOVA 2026 PASS
                </div>
                <div className="pass-id">{registeredUser.passId}</div>
              </div>

              <div className="pass-body">
                <div className="flex flex-col gap-2.5">
                  <div className="pass-field">
                    <span className="pass-label">DELEGATE NAME</span>
                    <span className="pass-val">{registeredUser.name}</span>
                  </div>
                  <div className="pass-field">
                    <span className="pass-label">REGISTER NUMBER</span>
                    <span className="pass-val tabular-nums">{registeredUser.regNumber}</span>
                  </div>
                  <div className="pass-field">
                    <span className="pass-label">SELECTED TRACK</span>
                    <span className="pass-val text-[#00ff88]">{registeredUser.event}</span>
                  </div>
                  <div className="pass-field">
                    <span className="pass-label">ORGANIZATION / DEPT</span>
                    <span className="pass-val">
                      {registeredUser.department} ({registeredUser.year})
                    </span>
                  </div>
                </div>

                <div className="pass-qr-mock">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#00ff88]">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-6 0h4v2h-4v-2zm4 4h4v4h-4v-4zm-4 2h2v2h-2v-2zm-2-2h2v4h-2v-4z" />
                  </svg>
                  <span className="text-[0.65rem] font-mono text-slate-500">OFFICIAL PASS</span>
                </div>
              </div>

              <div className="pass-footer-strip">
                24 APRIL 2026 · SIR ISSAC NEWTON COLLEGE OF ENG & TECH · NAGAPATTINAM
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-modal-primary"
                onClick={() => setShowModal(false)}
              >
                AWESOME ↗
              </button>
              <button
                type="button"
                className="btn-modal-secondary"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4" />
                <span>PRINT PASS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          12. STORED REGISTRATIONS DRAWER (ADMIN / EVALUATION HELPER)
          -------------------------------------------------------------------- */}
      {showDrawer && (
        <div className="drawer-overlay" role="dialog" aria-modal="true">
          <div className="drawer-card">
            <div className="drawer-header">
              <div>
                <h3 className="text-xl font-bold text-white">Stored Local Registrations</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Stored inside browser LocalStorage key:{' '}
                  <code className="text-[#00ff88] bg-black/40 px-1 py-0.5 rounded">
                    technovaRegistrations
                  </code>
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn relative top-0 right-0"
                onClick={() => setShowDrawer(false)}
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="drawer-scroll-body">
              {storedRecords.length === 0 ? (
                <div className="empty-records-msg">
                  <p>No local registrations found yet.</p>
                  <span className="text-xs text-slate-500">
                    Fill out the registration form above to see entries saved in LocalStorage.
                  </span>
                </div>
              ) : (
                storedRecords.map((rec) => (
                  <div key={rec.id} className="registration-record">
                    <div className="record-item">
                      <span className="record-key">PASS ID</span>
                      <span className="record-val text-[#00ff88] font-mono">{rec.passId}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-key">PARTICIPANT</span>
                      <span className="record-val">{rec.name}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-key">REGISTER NO</span>
                      <span className="record-val">{rec.regNumber}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-key">EVENT TRACK</span>
                      <span className="record-val">{rec.event}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-key">ORGANIZATION</span>
                      <span className="record-val">
                        {rec.department} · {rec.year}
                      </span>
                    </div>
                    <div className="record-item">
                      <span className="record-key">TIMESTAMP</span>
                      <span className="record-val text-xs text-slate-400">
                        {rec.formattedDate}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="drawer-actions">
              <button
                type="button"
                className="btn-clear-data"
                onClick={handleClearRecords}
              >
                Clear Test Registrations
              </button>
              <span className="text-xs text-slate-500 font-mono">
                {storedRecords.length} delegates recorded
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
>>>>>>> 939905a4c11abe36dbe5f322a05c8b57d08354db
}
