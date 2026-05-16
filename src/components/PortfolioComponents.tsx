/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { Github, Linkedin, Mail, ExternalLink, Binary, Cpu, Database, Layout, Download } from "lucide-react";
import { RESUME_DATA } from "../constants";
import TextType from "./TextType";

export function SectionDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={ref} className="h-[60vh] md:h-[80vh] w-full relative flex items-center justify-center overflow-hidden perspective-[1000px] pointer-events-none">
      {/* 3D Grid Floor/Ceiling */}
      <motion.div 
        style={{ opacity, rotateX, scale }}
        className="absolute inset-0 flex flex-col justify-between py-20"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
      </motion.div>

      {/* Central Core Portal */}
      <div className="relative flex items-center justify-center">
        <motion.div
          style={{ rotate: coreRotate, opacity, scale }}
          className="w-64 h-64 md:w-96 md:h-96 border border-brand-accent/20 rounded-full relative"
        >
          {/* Rotating Rings */}
          <div className="absolute inset-4 border border-dashed border-brand-accent/10 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-12 border-2 border-t-brand-accent/40 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_3s_linear_infinite]" />
          
          {/* Data Readouts */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 font-mono text-[10px] text-brand-accent uppercase tracking-[0.5em]">
            System_Breach_Init
          </div>
        </motion.div>

        {/* Inner Glow */}
        <motion.div 
          style={{ opacity, scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 2, 0.5]) }}
          className="absolute w-32 h-32 bg-brand-accent/20 blur-[60px] rounded-full"
        />
        
        {/* Binary Stream */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              style={{ 
                x: (i - 2) * 60,
                y: useTransform(scrollYProgress, [0, 1], [100, -100]),
                opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.2, 0])
              }}
              className="font-mono text-[8px] text-brand-accent flex flex-col gap-2"
            >
              {[1,0,1,1,0,1,0].map((b, j) => <span key={j}>{b}</span>)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Particles/Nodes */}
      <motion.div 
        style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-brand-accent rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-brand-accent rounded-full animate-pulse delay-500" />
      </motion.div>
    </div>
  );
}

export function SectionHeader({ title, subtitle, number }: { title: string, subtitle?: string, number: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });


  return (
    <div ref={containerRef} className="mb-12 md:mb-32 overflow-hidden">
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-20px" }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-brand-accent text-xs tracking-[0.4em] mb-2">{number} // SECTION</span>
        </motion.div>

        <div className="relative group">
          <motion.h2
            initial={{ opacity: 0, x: -100, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none"
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ margin: "-20px" }}
            transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
            className="h-[2px] bg-brand-accent mt-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ margin: "-20px" }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-xl font-light max-w-2xl mt-4 text-[var(--text-dim)]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { stiffness: 150, damping: 20 });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const nameX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 100, damping: 30 });
  const nameY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-[100dvh] w-full flex flex-col justify-center items-center px-4 md:px-8 relative perspective-[2000px] overflow-hidden"
    >
      <div className="scanline" />

      {/* Background massive stroke text */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0"
      >
        <h1 className="text-[25vw] sm:text-[20vw] font-display font-bold leading-[0.8] tracking-tighter select-none text-center" style={{ WebkitTextStroke: "2px var(--text-main)", color: "transparent" }}>
          HELLO;
        </h1>
      </motion.div>

      <motion.div
        style={{ y, opacity, scale, rotateX, rotateY }}
        className="w-full max-w-6xl z-30 relative pt-16 md:pt-0 transform-style-3d"
      >
        <div 
          className="glass p-6 md:p-10 lg:p-12 relative overflow-hidden"
        >
          {/* Cyber accents */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-accent/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 relative z-10">
            <div className="space-y-4 md:space-y-6 flex-1">


              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.4
                    }
                  }
                }}
                className="flex flex-row-reverse items-center justify-between gap-4 sm:flex-row sm:justify-start sm:gap-6"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, rotate: -15, filter: "blur(20px)" },
                    visible: { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group shrink-0"
                >
                  {/* 3D Pop-out Image Container */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 shrink-0">
                    {/* Circle Background & Glow */}
                    <div className="absolute inset-0 bg-brand-accent/10 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* The Background Circle */}
                    <div className="absolute inset-0 rounded-full border border-brand-accent/30 bg-gradient-to-b from-brand-accent/5 to-transparent z-0 group-hover:border-brand-accent transition-all duration-500" />

                    {/* Bottom-clipped Image (stays inside the circle) */}
                    <div className="absolute inset-0 rounded-full overflow-hidden z-10">
                      <motion.img
                        src="/hero.png"
                        alt="Piyoosh Krishna M"
                        className="w-full h-full object-cover scale-[1.35] object-top translate-y-4 sm:translate-y-8 filter grayscale contrast-125 group-hover:grayscale-0 group-active:grayscale-0 group-hover:scale-[1.45] group-active:scale-[1.45] group-hover:translate-y-2 group-active:translate-y-2 transition-all duration-700 select-none touch-none"
                        style={{ WebkitTouchCallout: 'none' }}
                      />
                    </div>

                    {/* Top-unclipped Image (The "Pop-out" part) */}
                    <div className="absolute inset-0 z-20 pointer-events-none" style={{ clipPath: 'inset(-100% 0 0 0)' }}>
                      <motion.img
                        src="/hero.png"
                        alt=""
                        className="w-full h-full object-cover scale-[1.35] object-top translate-y-4 sm:translate-y-8 filter grayscale contrast-125 group-hover:grayscale-0 group-active:grayscale-0 group-hover:scale-[1.45] group-active:scale-[1.45] group-hover:translate-y-2 group-active:translate-y-2 transition-all duration-700 opacity-0 group-hover:opacity-100 group-active:opacity-100 select-none touch-none"
                        style={{
                          maskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)',
                          WebkitTouchCallout: 'none'
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-1 text-left overflow-hidden">
                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 100 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    style={{ x: nameX, y: nameY }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tighter uppercase pointer-events-auto bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-main)] via-[var(--accent)] to-[var(--secondary)] animate-gradient"
                  >
                    Piyoosh <br />
                    Krishna M
                  </motion.h1>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-lg md:text-2xl font-normal text-brand-accent font-mono h-8 flex items-center"
              >
                <TextType
                  text={RESUME_DATA.specialization}
                  typingSpeed={50}
                  pauseDuration={3000}
                  showCursor={true}
                  cursorCharacter="█"
                  loop={true}
                  initialDelay={2000}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="text-[var(--text-dim)] font-normal max-w-xl leading-relaxed text-base md:text-xl"
              >
                Architecting neural interfaces between human logic and machine execution. Focused on building robust, scalable AI modules and efficient operational pipelines.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="flex flex-row gap-3 pt-2"
              >
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-6 py-3 bg-brand-accent text-white font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg transition-all pointer-events-auto text-center"
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: "var(--glass-border)" }}
                  whileTap={{ scale: 0.95 }}
                  href={RESUME_DATA.links.cv}
                  download
                  className="px-6 py-3 border border-[var(--glass-border)] text-[var(--text-main)] font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg transition-all pointer-events-auto flex items-center justify-center gap-2 hover:border-brand-accent"
                >
                  Download CV
                  <Download size={14} />
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full lg:w-64 flex flex-col gap-4 font-mono text-[10px] text-[var(--text-dim)] p-6 rounded-2xl border border-brand-accent/20 glass shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-brand-accent/60 uppercase tracking-widest text-[8px] flex items-center gap-2">
                    <Binary size={10} /> Role
                  </span>
                  <span className="text-[var(--text-main)] uppercase tracking-wider text-xs line-clamp-1" title={RESUME_DATA.role}>{RESUME_DATA.role}</span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-brand-accent/50 to-transparent" />
                <div className="flex flex-col gap-1">
                  <span className="text-brand-accent/60 uppercase tracking-widest text-[8px] flex items-center gap-2">
                    <Layout size={10} /> Location
                  </span>
                  <span className="text-[var(--text-main)] uppercase tracking-wider text-xs line-clamp-1" title={RESUME_DATA.location}>{RESUME_DATA.location}</span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-brand-accent/50 to-transparent" />
                <div className="flex flex-col gap-1">
                  <span className="text-brand-accent/60 uppercase tracking-widest text-[8px] flex items-center gap-2">
                    <Cpu size={10} /> Focus
                  </span>
                  <span className="text-[var(--text-main)] uppercase tracking-wider text-xs line-clamp-1">AI & ML</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-[var(--glass-border)] justify-center text-[var(--text-main)]">
                <a href={RESUME_DATA.links.github} target="_blank" className="p-2 bg-black/5 rounded-lg hover:bg-brand-accent hover:text-white transition-all">
                  <Github size={16} />
                </a>
                <a href={RESUME_DATA.links.linkedin} target="_blank" className="p-2 bg-black/5 rounded-lg hover:bg-brand-accent hover:text-white transition-all">
                  <Linkedin size={16} />
                </a>
                <a href={`mailto:${RESUME_DATA.email}`} className="p-2 bg-black/5 rounded-lg hover:bg-brand-accent hover:text-white transition-all">
                  <Mail size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      whileTap={{ scale: 0.98, rotateX: 5 }}
      viewport={{ margin: "-50px" }}
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1],
        scale: { type: "spring", damping: 20, stiffness: 100 }
      }}
      className="group glass p-8 md:p-12 transition-all hover:bg-white/[0.03] hover:border-brand-accent/30 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-3xl rounded-full group-hover:bg-brand-accent/20 transition-all" />

      <div className="flex justify-between items-start mb-8">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          whileTap={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 1 }}
          className="p-3 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl text-brand-accent"
        >
          <Binary size={24} />
        </motion.div>
        <a
          href={project.link}
          target="_blank"
          className="p-2 text-gray-500 hover:text-brand-accent transition-colors translate-x-4 -translate-y-4 md:translate-x-0 md:translate-y-0"
        >
          <ExternalLink size={18} />
        </a>
      </div>

      <h3 className="text-3xl font-display font-bold mb-4 tracking-tighter uppercase">{project.title}</h3>
      <p className="text-[var(--text-dim)] text-xl mb-8 font-normal leading-relaxed">
        {project.summary}
      </p>

      <div className="space-y-4 mb-8">
        {project.highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex gap-4 text-lg text-[var(--text-muted)] font-normal"
          >
            <div className="h-px w-4 bg-brand-accent/50 mt-2.5" />
            <span>{h}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm font-mono tracking-widest text-brand-accent uppercase">
        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
        Live Project
      </div>
    </motion.div>
  );
}

const ExperienceRow = ({ exp, i }: { exp: any, i: number }) => {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      key={i}
      ref={rowRef}
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-50px" }}
      className="grid md:grid-cols-12 gap-12 glass p-10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-3xl rounded-full" />
      <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-center">
        <div>
          <p className="font-mono text-brand-accent text-base mb-2">{exp.period}</p>
          <h3 className="text-3xl font-bold font-display uppercase tracking-tight leading-none mb-4">{exp.company}</h3>
          <p className="text-sm text-brand-accent/60 uppercase tracking-widest">{exp.location}</p>
        </div>
      </div>
      <div className="md:col-span-8 lg:col-span-9 border-l-0 md:border-l border-[var(--glass-border)] pl-0 md:pl-12 pt-8 md:pt-0">
        <h4 className="text-2xl font-display font-semibold mb-8 text-[var(--text-main)] underline decoration-brand-accent underline-offset-8 decoration-2">{exp.title}</h4>
        <ul className="space-y-6">
          {exp.highlights.map((h, j) => (
            <li key={j} className="text-2xl text-[var(--text-dim)] font-normal leading-relaxed group hover:text-[var(--accent)] transition-colors">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export function ExperienceSection() {
  return (
    <div className="space-y-32">
      {RESUME_DATA.experience.map((exp, i) => (
        <ExperienceRow key={i} exp={exp} i={i} />
      ))}
    </div>
  );
}

export function TrendyMarquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-1000, 1000]);
  const xRight = useTransform(scrollYProgress, [0, 1], [1000, -1000]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const marqueeText = "AI ENGINEER • DEVOPS ARCHITECT • DATA SCIENTIST • ";

  return (
    <div ref={ref} className="h-[40vh] md:h-[60vh] w-full relative flex flex-col justify-center overflow-hidden pointer-events-none select-none">
      <motion.div 
        style={{ x: xLeft, opacity }}
        className="whitespace-nowrap flex gap-12"
      >
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-8xl md:text-[15rem] font-display font-black uppercase text-transparent stroke-white/5 stroke-2 md:stroke-[3px]">
            {marqueeText}
          </span>
        ))}
      </motion.div>
      
      <motion.div 
        style={{ x: xRight, opacity }}
        className="whitespace-nowrap flex gap-12 -mt-12 md:-mt-32"
      >
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-8xl md:text-[15rem] font-display font-black uppercase text-brand-accent/10">
            {marqueeText}
          </span>
        ))}
      </motion.div>

      {/* Center Highlight */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="px-8 py-2 bg-brand-accent text-white font-mono text-xs tracking-[0.5em] uppercase rounded-full shadow-[0_0_30px_rgba(59,130,246,0.5)]">
          System_Sync_01
        </div>
      </motion.div>
    </div>
  );
}

export function SkillCategory({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      initial={{ opacity: 0, y: 50, rotateY: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      whileTap={{ scale: 0.95 }}
      viewport={{ margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group glass p-8 transition-all hover:border-brand-accent/20 text-center md:text-left"
    >
      <div className="w-12 h-12 bg-brand-accent/10 flex items-center justify-center rounded-2xl mb-8 mx-auto md:mx-0 group-hover:bg-brand-accent group-hover:text-white transition-all text-brand-accent shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <Icon size={24} />
      </div>
      <h4 className="text-sm font-mono text-brand-accent uppercase tracking-[0.4em] mb-8">{title}</h4>
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {skills.map((skill, i) => (
          <span key={i} className="px-6 py-3 bg-brand-bg border border-brand-border text-base font-normal text-white/80 hover:text-white hover:border-brand-accent transition-all cursor-default rounded-xl">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

interface Project {
  title: string;
  link: string;
  summary: string;
  highlights: string[];
}
