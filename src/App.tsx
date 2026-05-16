/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValueEvent } from "motion/react";
import { Github, Linkedin, Mail, Send, Binary, Cpu, Database, Layout, X, Menu } from "lucide-react";
import { RESUME_DATA } from "./constants";
import {
  Hero,
  SectionHeader,
  ProjectCard,
  ExperienceSection,
  SkillCategory
} from "./components/PortfolioComponents";
import ScrollReveal from "./components/ScrollReveal";
import Antigravity from "./components/Antigravity";
import Loader from "./components/Loader";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="app-root" className="selection:bg-brand-accent selection:text-white relative min-h-screen overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass {
          background: rgba(255, 255, 255, 0.08) !important;
          -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
          backdrop-filter: blur(16px) saturate(180%) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
          color: white !important;
        }
        
        .light .glass {
          background: rgba(255, 255, 255, 0.7) !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          color: #000 !important;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07) !important;
        }

        .light body {
          background-color: #f8fafc !important;
        }
        
        canvas {
          z-index: 0 !important;
          pointer-events: auto !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          background: transparent !important;
        }
      `}} />
      <ThemeToggle />
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[1000] bg-brand-bg/60 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setPreviewImage(null); }}
              className="absolute top-8 right-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={previewImage}
              alt="Certificate Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strict Background Layer */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <Antigravity
          count={400}
          magnetRadius={10}
          ringRadius={12}
          waveSpeed={0.4}
          waveAmplitude={1.2}
          particleSize={0.8}
          lerpSpeed={0.06}
          color={'#3b82f6'}
          autoAnimate={true}
          particleVariance={1}
          scrollYProgress={scrollYProgress}
        />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-[200]"
          style={{ scaleX: scrollYProgress }}
        />



      {/* Navigation */}
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-[300] px-6 py-6 md:px-12 md:py-10 flex justify-between items-center text-[var(--text-main)]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display font-bold text-xl md:text-2xl uppercase tracking-tighter"
        >
          PIYOOSH_KRISHNA_M <span className="text-brand-accent font-light hidden sm:inline">// 0.1</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="flex gap-8 lg:gap-12 items-center text-[10px] uppercase font-mono tracking-widest hidden md:flex">
          {[
            { name: "About", id: "about" },
            { name: "Works", id: "projects" },
            { name: "Arsenal", id: "skills" },
            { name: "Certs", id: "certifications" },
            { name: "History", id: "experience" },
            { name: "Contact", id: "contact" }
          ].map((item, i) => (
            <motion.a
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, color: "var(--text-main)" }}
              whileHover={{ scale: 1.1, x: 5, color: "var(--accent)" }}
              transition={{ delay: 0.1 * i + 0.5, type: "spring", stiffness: 400, damping: 17 }}
              href={`#${item.id}`}
              className="relative group block uppercase tracking-widest"
            >
              0{i + 1}/_{item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-accent group-hover:w-full transition-all duration-200" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-brand-accent glass !rounded-full"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[250] glass flex flex-col justify-center px-12 gap-12"
          >
            {[
              { name: "About", id: "about" },
              { name: "Works", id: "projects" },
              { name: "Arsenal", id: "skills" },
              { name: "Certs", id: "certifications" },
              { name: "History", id: "experience" },
              { name: "Contact", id: "contact" }
            ].map((item, i) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display font-bold uppercase tracking-tighter text-[var(--text-main)]"
              >
                <span className="text-brand-accent mr-4 text-xs font-mono">0{i + 1}/</span>
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section id="about" className="py-32 md:py-64 px-6 md:px-12 w-full">
          <SectionHeader
            number="01"
            title="About Me"
            subtitle="I build efficient, scalable AI and DevOps solutions."
          />
          <div className="grid md:grid-cols-2 gap-24 items-start">
            <div className="glass p-12 relative overflow-hidden text-xl md:text-3xl font-light leading-relaxed text-[var(--text-dim)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent/20" />
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={2}
                blurStrength={10}
                textClassName="text-xl md:text-3xl font-light leading-relaxed text-[var(--text-main)]"
              >
                {RESUME_DATA.summary}
              </ScrollReveal>
            </div>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-2 h-full bg-brand-accent/20" />
                <p className="text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-10">Education</p>
                {RESUME_DATA.education.map((edu, i) => (
                  <div key={i}>
                    <h4 className="text-2xl font-bold font-display uppercase tracking-tight mb-2">{edu.degree}</h4>
                    <p className="text-[var(--text-dim)] text-lg uppercase font-light">{edu.institution}</p>
                    <div className="flex justify-between items-end mt-12 pt-8 border-t border-[var(--glass-border)]">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">{edu.period}</span>
                      <span className="text-[10px] font-mono text-brand-accent tracking-widest">GPA: {edu.cgpa}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 md:py-64 px-6 md:px-12 w-full">
          <SectionHeader
            number="02"
            title="Projects"
            subtitle="A collection of my recent technical work and contributions."
          />
          <div className="grid md:grid-cols-2 gap-12">
            {RESUME_DATA.projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 md:py-64 px-6 md:px-12 w-full">
          <SectionHeader
            number="03"
            title="Skills"
            subtitle="Proficiency in various technologies and frameworks."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCategory title="Programming" skills={RESUME_DATA.skills.programming} icon={Binary} />
            <SkillCategory title="AI & ML" skills={RESUME_DATA.skills.ai_ml} icon={Cpu} />
            <SkillCategory title="Data Science" skills={RESUME_DATA.skills.data_libraries} icon={Database} />
            <SkillCategory title="Databases" skills={RESUME_DATA.skills.databases} icon={Layout} />
            <SkillCategory title="Web Dev" skills={RESUME_DATA.skills.fundamentals} icon={Binary} />
            <SkillCategory title="DevOps & Tools" skills={RESUME_DATA.skills.tools} icon={Binary} />
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-32 md:py-64 px-6 md:px-12 w-full">
          <SectionHeader
            number="04"
            title="Certifications"
            subtitle="Verified credentials and technical achievements."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESUME_DATA.certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setPreviewImage(cert.image)}
                className="group relative overflow-hidden glass rounded-2xl cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                <div className="p-6 bg-brand-surface/90 border-t border-white/5 absolute bottom-0 left-0 w-full backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-8 h-[2px] bg-brand-accent mb-3 group-hover:w-full transition-all duration-500" />
                  <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-main)] line-clamp-2 h-10">
                    {cert.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 md:py-64 px-6 md:px-12 w-full">
          <SectionHeader
            number="05"
            title="Experience"
            subtitle="My professional journey and career milestones."
          />
          <ExperienceSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 md:py-64 px-6 md:px-12 w-full">
          <div className="glass p-12 md:p-32 relative overflow-hidden !rounded-[3rem]">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-50px" }}
                className="mb-8"
              >
                <div className="w-20 h-20 bg-brand-accent flex items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <Mail size={40} className="text-white" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.2 }}
                className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-12"
              >
                Let's <span className="text-brand-accent">Connect</span>
              </motion.h2>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${RESUME_DATA.email}`}
                  className="px-12 py-6 bg-brand-accent text-white font-display font-bold uppercase tracking-widest flex items-center gap-4 group rounded-2xl"
                >
                  Send Message
                  <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </motion.a>

                <div className="flex gap-4">
                  <a href={RESUME_DATA.links.github} target="_blank" className="w-16 h-16 glass flex items-center justify-center hover:border-brand-accent transition-all text-[var(--text-dim)] hover:text-[var(--text-main)] rounded-2xl">
                    <Github size={24} />
                  </a>
                  <a href={RESUME_DATA.links.linkedin} target="_blank" className="w-16 h-16 glass flex items-center justify-center hover:border-brand-accent transition-all text-[var(--text-dim)] hover:text-[var(--text-main)] rounded-2xl">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="py-24 px-6 md:px-12 border-t border-[var(--glass-border)]">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4">
            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
              © 2026 Piyoosh Krishna M // All Rights Reserved
            </p>
            <p className="text-[10px] font-mono text-brand-accent uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              Online
            </p>
          </div>
          <div className="flex flex-wrap gap-12 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest justify-center">
            <span>Lat: 11.2588 / Lng: 75.7804</span>
            <div className="flex gap-4">
              <span className="text-brand-accent">Built with:</span>
              <span>React 19</span>
              <span>Motion 12</span>
              <span>Tailwind 4</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
}
