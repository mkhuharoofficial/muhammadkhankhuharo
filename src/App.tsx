/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Award, 
  Cpu, 
  Code2, 
  ShieldCheck, 
  BrainCircuit,
  GraduationCap,
  Trophy,
  Layout as LayoutIcon,
  Globe,
  ArrowRight,
  Send,
  Linkedin,
  MapPin,
  Menu,
  X
} from 'lucide-react';

// --- Types ---

const dreampathMockup = "/src/assets/images/dreampath_mockup_1781780193193.jpg";
const healthGuideMockup = "/src/assets/images/health_guide_mockup_1781780615997.jpg";
const thumbforgeMockup = "/src/assets/images/thumbforge_mockup_1781780831640.jpg";

interface Project {
  title: string;
  year: string;
  description: string;
  link: string;
  tags: string[];
  videoUrl?: string;
  imageUrl?: string;
  emoji: string;
}

interface Certificate {
  title: string;
  issuer: string;
  link?: string;
  date?: string;
}

interface AwardType {
  title: string;
  detail: string;
  date?: string;
}

// --- Data ---

const PROJECTS: Project[] = [
  {
    title: "DreamPath AI",
    year: "2026",
    description: "DreamPath AI helps students find the right career path with clear guidance and simple steps. It turns confusion into direction so you can move forward with confidence.",
    link: "https://dreampath-ai-gjns.vercel.app/",
    tags: ["React", "AI", "Career Guidance"],
    imageUrl: dreampathMockup,
    emoji: "🚀"
  },
  {
    title: "Health Guide App",
    year: "2025",
    description: "A comprehensive healthcare companion featuring an AI Report Explainer, Medicine Reminders, and Emergency SOS integration. Built to bridge the gap between patients and medical clarity.",
    link: "https://health-guide-app.vercel.app/",
    tags: ["Healthcare", "AI", "React Native / PWA"],
    imageUrl: healthGuideMockup,
    emoji: "💙"
  },
  {
    title: "ThumbForge",
    year: "2026",
    description: "ThumbForge is a premium, free web app that lets you extract and download high-definition (HD) thumbnails from any YouTube video or Short instantly.",
    link: "https://thumb-forge-beta.vercel.app/",
    tags: ["React", "Vite", "YouTube Utility"],
    imageUrl: thumbforgeMockup,
    emoji: "🖼️"
  },
  {
    title: "Personal Portfolio Website",
    year: "2026",
    description: "Designed and published a high-performance personal portfolio website using React and Tailwind CSS. Hosted on GitHub Pages to showcase technical skills and support scholarship applications.",
    link: "https://mkhuharoofficial.github.io/muhammad-khan-portfolio/",
    tags: ["React", "Tailwind CSS", "Vite", "GitHub Pages"],
    emoji: "🌐"
  }
];

const EDUCATION = [
  { period: '2024–2025', inst: 'MU Institute of IT, Shikarpur', name: 'Diploma in IT (DIT)', grade: 'Grade A · 79.2%' },
  { period: '2023–2025', inst: 'C&S Govt Degree College Shikarpur', name: 'Intermediate (Pre-Medical)', grade: 'Grade A · 75.8%' },
  { period: '2018–2023', inst: 'GBHS Mian Jo Goth, Shikarpur', name: 'Matriculation (Science)', grade: 'Grade A · 78.9%' }
];

const CERTIFICATES: Certificate[] = [
  { title: "AI For Everyone", issuer: "DeepLearning.AI", link: "https://coursera.org/verify/P8DUE4593WPV" },
  { title: "AI Fundamentals", issuer: "Google", link: "https://coursera.org/verify/3M5W94MMA83O" },
  { title: "Diploma in IT (DIT)", issuer: "MU Institute of IT", date: "Feb 2026" },
  { title: "IT Security", issuer: "Google", link: "https://coursera.org/verify/WAQSFJKEFJ2T" },
  { title: "Math for Computer Science", issuer: "University of London", link: "https://coursera.org/verify/YI9BR27S3G0Q" },
  { title: "Programming for Everybody (Python)", issuer: "University of Michigan", link: "https://coursera.org/verify/GW1BSEB84RRJ" },
  { title: "Google AI Essentials", issuer: "Google" },
  { title: "Google IT Support Professional", issuer: "Google" },
  { title: "Mathematics for Machine Learning", issuer: "Coursera" }
];

const AWARDS: AwardType[] = [
  { title: "Second Position", detail: "Sindhi Speech Competition - C&S Govt Degree College Shikarpur", date: "Aug 2023" },
  { title: "Participation Certificate", detail: "STEAM Exhibition - Presented hands-on science project", date: "Jan 2025" },
  { title: "Certificate of Appreciation", detail: "Outstanding Performance in Biology (Matric 2023)", date: "May 2023" }
];

const SOCIAL_LINKS = [
  { icon: <Github size={20} />, href: "https://github.com/mkhuharoofficial", name: "GitHub" },
  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/muhammad-khan-26137b403/", name: "LinkedIn" },
  { icon: <Mail size={20} />, href: "mailto:mkhuharoofficial@gmail.com", name: "Gmail" }
];

// --- Sub-Components ---

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="page-transition-container"
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-16 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-7'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-text-main font-display font-medium text-lg tracking-tight group">
          MUHAMMAD<span className="text-accent underline decoration-2 underline-offset-4 ml-1 font-bold group-hover:bg-accent group-hover:text-white transition-all">KHAN</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-text-main">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-widest ${location.pathname === link.path ? 'text-accent' : 'text-text-dim'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="py-20 px-6 md:px-16 bg-bg-subtle border-t border-border mt-auto">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-xl font-bold font-display mb-4">Let's Connect</h3>
        <p className="text-text-dim text-sm max-w-sm mb-6 leading-relaxed">
          Ambitious CS student exploring the intersection of AI and Web. 
          Open to opportunities, collaborations, and knowledge sharing.
        </p>
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              target="_blank" 
              className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-text-dim hover:text-accent hover:border-accent transition-all hover:-translate-y-1 shadow-sm"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="md:text-right">
        <div className="text-accent font-display font-medium text-lg mb-2 tracking-tight">
          MUHAMMAD <span className="font-bold">KHAN</span>
        </div>
        <div className="text-text-dim text-xs font-medium tracking-wide uppercase">
          © 2026 · Shikarpur, Sindh, Pakistan
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => (
  <PageWrapper>
    {/* Hero Section */}
    <div className="relative mb-24 overflow-hidden rounded-3xl bg-bg-subtle border border-border">
      <div className="absolute inset-0 hero-dot-pattern opacity-40 -z-10" />
      <div className="px-6 py-16 md:px-16 md:py-24 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Content */}
        <div className="flex-grow text-center md:text-left order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <h6 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Hello Everybody, i am</h6>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display leading-[0.9] tracking-tight text-text-main mb-6">
              MUHAMMAD <br className="hidden lg:block" />
              <span className="text-accent">KHAN</span>
            </h1>
            <h4 className="text-lg md:text-xl font-bold text-text-main opacity-80 mb-8 flex items-center md:justify-start justify-center gap-3">
              Web Developer <span className="text-accent/30 font-light">|</span> Problem Solver
            </h4>
            <p className="text-lg text-text-dim leading-relaxed mb-10 max-w-xl font-light">
              I love solving problems using Machine Learning and represent Data in a meaningful way. Also, I like pushing myself and taking up new challenges.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap md:justify-start justify-center gap-5">
            <Link to="/projects" className="bg-accent text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-accent/20">
              Show My Projects <ArrowRight size={20} />
            </Link>
            <div className="flex bg-white items-center p-1 rounded-full border border-border shadow-sm">
              <Link to="/contact" className="text-text-main px-8 py-3 rounded-full font-bold hover:bg-bg-subtle transition-all">
                Contact
              </Link>
              <div className="flex gap-2 px-4 border-l border-border">
                {SOCIAL_LINKS.map(link => (
                  <a key={link.name} href={link.href} target="_blank" className="text-text-dim hover:text-accent p-1.5 transition-colors">
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Profile Picture */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative order-1 md:order-2"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative group">
            {/* Background Blob */}
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl -z-10 group-hover:bg-accent/20 transition-all duration-500" />
            
            {/* Main Image Container */}
            <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl relative z-10 bg-white">
              <img 
                src="https://github.com/mkhuharoofficial.png" 
                alt="Muhammad Khan"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                }}
              />
            </div>
            
            {/* Social Icons Float */}
            <div className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 flex flex-col gap-3 z-20">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a 
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  href={link.href} 
                  target="_blank" 
                  className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-text-dim hover:text-accent hover:border-accent transition-all hover:scale-110 shadow-xl"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent/10 rounded-full border border-accent/20 -z-10 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </div>

    {/* About & Quick Info Grid */}
    <div className="grid md:grid-cols-12 gap-12 items-start mb-24">
      <div className="md:col-span-7 bg-bg-subtle p-8 md:p-12 rounded-3xl border border-border">
        <h2 className="text-3xl font-bold font-display mb-8">About Myself</h2>
        <div className="space-y-6 text-text-dim text-lg leading-relaxed">
          <p>
            Based in Shikarpur, Pakistan, I am a dedicated developer and problem solver driven by a passion for creating impactful digital solutions.
          </p>
          <p>
            I specialize in solving complex problems using machine learning and representing data in clean, meaningful ways. Whether it's crafting intuitive user interfaces or building intelligent backend systems, I strive for excellence in every project.
          </p>
          <p>
            I am always ready to have new experiences, meet new people and learn new things. I find the idea of creating value for people and impacting the world through my work gratifying.
          </p>
        </div>
      </div>
      
      <div className="md:col-span-5 space-y-6">
        <div className="card-minimal">
          <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Academic Background</h3>
          <div className="space-y-6">
            {EDUCATION.map((edu, i) => (
              <div key={edu.name} className="relative pl-4 border-l-2 border-accent/20">
                <span className="text-[10px] font-bold text-accent uppercase block mb-1">{edu.period}</span>
                <h4 className="text-sm font-bold text-text-main leading-tight mb-1">{edu.name}</h4>
                <p className="text-[10px] text-text-dim font-medium italic mb-2">{edu.inst}</p>
                <span className="text-[10px] bg-accent/5 px-2 py-0.5 rounded text-accent font-bold">{edu.grade}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-minimal bg-accent text-white border-none shadow-lg shadow-accent/20">
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Core Philosophy</h3>
          <p className="font-display text-lg font-medium italic leading-snug">
            "The more effort you put into improving your skills, the better you get. Learn to love growth."
          </p>
        </div>
      </div>
    </div>

    {/* Skills Section */}
    <div className="mb-24">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold font-display">My Skills</h2>
        <div className="h-[2px] flex-grow bg-border" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Code2 />, title: "Development", items: "Python, HTML, CSS, JavaScript, GitHub" },
          { icon: <BrainCircuit />, title: "AI/ML", items: "ChatGPT, Gemini, Prompt Eng, Basic ML" },
          { icon: <ShieldCheck />, title: "IT & Security", items: "Networking, Hardware, Cybersecurity" },
          { icon: <Cpu />, title: "Capabilities", items: "Problem Solving, Critical Thinking, Self-Learning" }
        ].map((skill, i) => (
          <motion.div 
            key={skill.title} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-minimal group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
              {skill.icon}
            </div>
            <h4 className="text-lg font-bold mb-2">{skill.title}</h4>
            <p className="text-text-dim text-sm leading-relaxed">{skill.items}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </PageWrapper>
);

const ProjectsPage = () => (
  <PageWrapper>
    <div className="max-w-4xl mb-10">
      <h1 className="text-3xl md:text-5xl font-black font-display text-text-main mb-4">Latest Projects</h1>
      <p className="text-text-dim text-base font-light leading-relaxed">
        Learning the theory is good, but applying your knowledge on a project is <span className="text-accent font-bold">AWESOME!!</span> 
        Here are my latest technical ventures.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
      {PROJECTS.map((project, i) => (
        <motion.div 
          key={project.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative flex flex-col"
        >
          {/* Project Media Wrapper */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-bg-subtle mb-3.5 border border-border group-hover:border-accent transition-all shadow-sm">
            {project.imageUrl ? (
              <img 
                src={project.imageUrl} 
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none"
              />
            ) : project.videoUrl ? (
              project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                <div className="w-full h-full pointer-events-none scale-125 group-hover:scale-[1.35] transition-transform duration-700">
                  <iframe
                    src={project.videoUrl}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              ) : (
                <video 
                  src={project.videoUrl} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  preload="auto"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10">
                <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{project.emoji}</span>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="flex-grow">
            <h3 className="text-lg font-bold font-display text-text-main mb-1.5 flex items-center gap-2">
              {project.title}
            </h3>
            <p className="text-text-dim text-xs md:text-sm mb-3 leading-relaxed line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map(t => (
                <span key={t} className="text-[9px] font-bold bg-accent/5 text-accent px-2.5 py-0.5 rounded-full border border-accent/10">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Attractive Live Button */}
          <div>
            <a 
              href={project.link} 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-text-main text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-accent transition-all hover:shadow-xl hover:shadow-accent/30 group/btn"
            >
              <Globe size={13} className="group-hover/btn:rotate-12 transition-transform" />
              LIVE
              <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      ))}
      
      {/* Incoming Placeholder */}
      <div className="border-4 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-all cursor-default">
        <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center mb-3">
          <Code2 size={20} className="text-text-dim" />
        </div>
        <h3 className="text-base font-bold text-text-main mb-1">Next Project Here</h3>
        <p className="text-xs text-text-dim max-w-xs">Exploring advanced AI automation and secure cloud architectures.</p>
      </div>
    </div>
  </PageWrapper>
);

const CertificatesPage = () => (
  <PageWrapper>
    <div className="grid lg:grid-cols-12 gap-16">
      <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
        <h1 className="text-4xl md:text-5xl font-black font-display text-text-main mb-6">Expertise</h1>
        <p className="text-text-dim text-lg font-light leading-relaxed mb-10">
          Verified academic growth and technical specialization from global learning institutions.
        </p>
        <div className="bg-bg-subtle p-8 rounded-2xl border border-border">
          <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-8">Academic Timeline</h4>
          <div className="space-y-8 relative pl-4 border-l-2 border-accent/20">
            {EDUCATION.map(edu => (
              <div key={edu.name} className="relative">
                <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-accent rounded-full" />
                <span className="text-[10px] font-bold text-accent mb-1 block">{edu.period}</span>
                <h5 className="text-sm font-bold text-text-main leading-tight mb-1">{edu.name}</h5>
                <p className="text-[10px] text-text-dim font-medium mb-2">{edu.inst}</p>
                <span className="text-[10px] bg-accent/5 px-2 py-0.5 rounded text-accent font-bold">{edu.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="lg:col-span-8 space-y-16">
        {/* Certs Grid */}
        <div>
          <h2 className="text-2xl font-bold font-display mb-10 border-b border-border pb-4 flex items-center gap-3">
             <Trophy className="text-yellow-500" /> Professional Certificates
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {CERTIFICATES.map((cert, i) => (
              <motion.div 
                key={cert.title} 
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-border p-6 rounded-2xl flex items-start gap-4 hover:border-accent hover:shadow-lg transition-all group"
              >
                <div className="mt-1 text-accent opacity-40 group-hover:opacity-100 transition-opacity">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-sm mb-1 leading-snug">{cert.title}</h4>
                  <p className="text-accent text-[10px] font-bold uppercase mb-4">{cert.issuer}</p>
                  {cert.link && (
                    <a href={cert.link} target="_blank" className="inline-flex items-center gap-1.5 text-text-dim text-[10px] font-black hover:text-accent transition-colors underline underline-offset-4">
                      VERIFY CREDENTIAL <ArrowRight size={10} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <h2 className="text-2xl font-bold font-display mb-10 border-b border-border pb-4 flex items-center gap-3">
             <Award className="text-accent" /> Honours & Recognition
          </h2>
          <div className="space-y-4">
            {AWARDS.map((award, i) => (
              <div key={award.title} className="flex flex-col md:flex-row md:items-center justify-between p-7 bg-bg-subtle rounded-2xl border border-border group hover:bg-white transition-all">
                <div>
                  <h4 className="text-lg font-bold text-text-main mb-1 tracking-tight">{award.title}</h4>
                  <p className="text-text-dim text-sm">{award.detail}</p>
                </div>
                <div className="mt-4 md:mt-0 text-accent font-display text-xs font-black tracking-widest">{award.date}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  </PageWrapper>
);

const BlogPage = () => (
  <PageWrapper>
    <div className="max-w-4xl mx-auto text-center mb-16">
      <h1 className="text-4xl md:text-6xl font-black font-display text-text-main mb-6">The Blog</h1>
      <p className="text-text-dim text-xl font-light">Documenting the journey of a self-taught engineer.</p>
    </div>

    <div className="grid gap-16 max-w-4xl mx-auto text-center md:text-left">
      {[
        { title: "The Logic of Code: Building Scalable Systems as a Student", date: "May 2026", cat: "PERSONAL STORY" },
        { title: "Mastering Prompt Engineering for AI Agents in 2026", date: "Apr 2026", cat: "AI & TECH" },
        { title: "Modern Web Development: From Shikarpur to the World", date: "Mar 2026", cat: "COMMUNITY" }
      ].map((post, i) => (
        <article key={post.title} className="group relative">
          <div className="md:flex items-baseline gap-12">
            <span className="hidden md:block text-accent font-black font-display text-5xl opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
            <div className="flex-grow">
              <div className="flex justify-center md:justify-start items-center gap-3 text-[10px] font-bold text-accent mb-4 tracking-widest">
                <span>{post.cat}</span>
                <span className="w-1.5 h-1.5 bg-border rounded-full" />
                <span className="text-text-dim">{post.date}</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold font-display text-text-main mb-4 group-hover:text-accent transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-text-dim text-lg font-light leading-relaxed mb-6 max-w-2xl mx-auto md:mx-0">
                Exploring the logical overlap between scientific research and systematic code architecture in the context of modern...
              </p>
              <div className="flex justify-center md:justify-start">
                <button className="text-text-main text-xs font-bold border-b-2 border-accent pb-1 inline-flex items-center gap-2 hover:gap-4 transition-all">
                  Read Full Publication <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </PageWrapper>
);

const ContactPage = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <PageWrapper>
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-6xl font-black font-display text-text-main mb-6">Contact Us</h1>
        <p className="text-text-dim text-lg font-light leading-relaxed">
          I find the idea of creating value for people and impacting the world through my work gratifying. Ready to discuss new experiences and collaborations.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-bg-subtle border border-border p-8 rounded-3xl">
            <h4 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">Direct Contact</h4>
            <div className="flex flex-col gap-6">
              {SOCIAL_LINKS.map(link => (
                <a key={link.name} href={link.href} target="_blank" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-text-dim group-hover:text-accent group-hover:border-accent transition-all">
                    {link.icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-text-dim uppercase tracking-tighter">{link.name}</span>
                    <span className="text-sm font-semibold text-text-main group-hover:text-accent transition-colors">
                      {link.name === 'Gmail' ? 'mkhuharoofficial@gmail.com' : link.name === 'GitHub' ? '/mkhuharoofficial' : '/muhammad-khan'}
                    </span>
                  </div>
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-text-dim">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-text-dim uppercase tracking-tighter">Location</span>
                  <span className="text-sm font-semibold text-text-main">Shikarpur, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white border border-border p-8 md:p-12 rounded-3xl shadow-xl shadow-bg-subtle transition-all">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid md:grid-cols-2 gap-7">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-dim tracking-widest">Your Name</label>
                  <input type="text" required placeholder="Guest Name" className="w-full bg-bg-subtle border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-dim tracking-widest">Email Address</label>
                  <input type="email" required placeholder="hello@world.com" className="w-full bg-bg-subtle border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent transition-all text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-text-dim tracking-widest">Message</label>
                <textarea rows={6} required placeholder="How can we collaborate?" className="w-full bg-bg-subtle border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent transition-all text-sm resize-none"></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-black text-white font-bold py-5 rounded-2xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-3 group"
                disabled={status !== null}
              >
                {status === 'sending' ? 'Transmitting Data...' : status === 'sent' ? 'Message Secured ✓' : (
                  <>Send Message <Send size={20} className="group-hover:translate-x-2 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-bg selection:bg-accent/10">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Utility to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
