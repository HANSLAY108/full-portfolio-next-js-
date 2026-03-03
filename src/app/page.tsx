'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Code, Layout, Smartphone } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fetchAPI } from '@/lib/api';

export default function HomePage() {
  const [content, setContent] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  // Using window scroll instead of ref target to avoid "Target ref is defined but not hydrated" error during SSR/Hydration
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [homeData, projectsData] = await Promise.all([
          fetchAPI('/content?type=home'),
          fetchAPI('/projects'),
        ]);
        setContent(homeData);
        setProjects(
          projectsData.filter((p: any) => p.status === 'PUBLISHED').slice(0, 3)
        );
      } catch (error) {
        console.error('Failed to load home data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen text-[var(--foreground)] relative overflow-x-hidden bg-[var(--background)]">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO SECTION  –  Futuristic V4
          (ONLY this section was modified)
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg,#ede8f8 0%,#dce4f7 28%,#e6d9f7 55%,#d9eaf7 80%,#e9f0fb 100%)',
        }}
      >
        {/* ── Animated pastel gradient blobs ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-[10%] -left-[5%] w-[65vw] h-[65vw] rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle,#c4b3f5 0%,transparent 68%)',
              filter: 'blur(80px)',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, -6, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-[15%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle,#a3c4f5 0%,transparent 68%)',
              filter: 'blur(70px)',
            }}
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute top-[35%] left-[32%] w-[28vw] h-[28vw] rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle,#f0c4f5 0%,transparent 68%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* ── Oversized watermark ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-black text-center leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(5rem, 20vw, 20rem)',
              letterSpacing: '-0.07em',
              color: 'rgba(110,90,190,0.055)',
            }}
          >
            HANSLAY
          </span>
        </div>

        {/* ── Bottom fade blur ── */}
        <div
          className="absolute bottom-0 inset-x-0 h-44 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top,rgba(237,232,248,0.95) 0%,transparent 100%)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        />

        {/* ── Main content (with subtle parallax) ── */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-5 sm:px-8 md:px-10 relative z-20 pt-28 pb-24 md:pt-36 md:pb-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[72vh]">

            {/* ── LEFT: text ── */}
            <div className="flex flex-col justify-center order-2 lg:order-1">

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="self-start mb-7"
              >
                <span
                  className="inline-flex items-center gap-2 px-5 py-2 text-[11px] font-bold tracking-widest uppercase"
                  style={{
                    background: 'rgba(255,255,255,0.55)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.72)',
                    borderRadius: '100px',
                    color: '#6b5ecd',
                    boxShadow: '0 4px 20px rgba(120,100,220,0.12)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  Available for Work
                </span>
              </motion.div>

              {/* Name – Line 1 */}
              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-black leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(3.2rem, 9.5vw, 9rem)',
                  letterSpacing: '-0.04em',
                  color: '#160e3a',
                  lineHeight: 0.9,
                  marginBottom: '0.1em',
                }}
              >
                TOH HANSLAY
              </motion.h1>

              {/* Role – Line 2 */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-light"
                style={{
                  fontSize: 'clamp(1.6rem, 4.8vw, 4.8rem)',
                  letterSpacing: '-0.025em',
                  color: '#5840a8',
                  lineHeight: 1,
                  marginBottom: '1.5rem',
                }}
              >
                {content?.heroTitle || 'Creative Developer'}
              </motion.p>

              {/* Supporting copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  maxWidth: '400px',
                  color: '#4a4270',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                }}
              >
                {content?.hero_subtitle ||
                  'I design and build futuristic digital experiences that merge creativity and performance.'}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="self-start"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3"
                  style={{
                    padding: '14px 36px',
                    borderRadius: '100px',
                    background: 'linear-gradient(135deg,#7c5ef0 0%,#5597e8 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    letterSpacing: '0.03em',
                    boxShadow: '0 8px 30px rgba(100,80,220,0.3), 0 2px 6px rgba(90,80,200,0.15)',
                    textDecoration: 'none',
                  }}
                >
                  View My Work
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-3 mt-10">
                {['Full-Stack Dev', 'UI/UX Specialist', 'React & Next.js'].map((chip, i) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.44 + i * 0.07 }}
                    style={{
                      padding: '7px 16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: '#5840a8',
                      background: 'rgba(255,255,255,0.52)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.78)',
                      borderRadius: '100px',
                      boxShadow: '0 3px 14px rgba(110,90,200,0.07)',
                    }}
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: visual ── */}
            <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[300px] sm:min-h-[420px] lg:min-h-[560px]">

              {/* ── Depth shadow beneath subject ── */}
              <div
                className="absolute pointer-events-none z-0"
                style={{
                  bottom: '5%',
                  left: '10%',
                  right: '10%',
                  height: '30%',
                  background: 'radial-gradient(ellipse at 50% 100%,rgba(90,60,180,0.18) 0%,transparent 70%)',
                  filter: 'blur(28px)',
                }}
              />

              {/* ── Halo glow (upper-body centric) ── */}
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 35%,rgba(180,150,255,0.45) 0%,rgba(140,180,255,0.18) 45%,transparent 68%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.15)',
                }}
              />

              {/* Hero image or holographic orb */}
              <motion.div
                initial={{ opacity: 0, scale: 0.86, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[520px] mx-auto"
              >
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {content?.heroImage ? (
                    /* ── Portrait with cinematic fade-blend mask ── */
                    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                      {/* Depth glow behind torso */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0%',
                          left: '5%',
                          right: '5%',
                          height: '50%',
                          background:
                            'radial-gradient(ellipse at 50% 80%,rgba(160,130,255,0.22) 0%,transparent 70%)',
                          filter: 'blur(20px)',
                          zIndex: 0,
                          pointerEvents: 'none',
                        }}
                      />

                      {/* The portrait image with CSS mask fade */}
                      <Image
                        src={content.heroImage}
                        alt="TOH HANSLAY – Portfolio"
                        width={1000}
                        height={1200}
                        priority
                        className="w-full h-auto object-contain"
                        style={{
                          position: 'relative',
                          zIndex: 1,
                          /* Fade bottom ~35% of image to transparent */
                          WebkitMaskImage:
                            'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 52%,rgba(0,0,0,0.85) 65%,rgba(0,0,0,0.4) 78%,rgba(0,0,0,0) 100%)',
                          maskImage:
                            'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 52%,rgba(0,0,0,0.85) 65%,rgba(0,0,0,0.4) 78%,rgba(0,0,0,0) 100%)',
                          /* Soft drop shadow on upper body */
                          filter:
                            'drop-shadow(0 -4px 24px rgba(140,110,255,0.14)) drop-shadow(0 20px 60px rgba(100,80,220,0.18))',
                        }}
                      />

                      {/* Atmospheric blur overlay near fade zone */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '28%',
                          background:
                            'linear-gradient(to top,rgba(220,215,248,0.6) 0%,rgba(220,215,248,0.1) 60%,transparent 100%)',
                          backdropFilter: 'blur(3px)',
                          WebkitBackdropFilter: 'blur(3px)',
                          WebkitMaskImage:
                            'linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 40%,transparent 100%)',
                          maskImage:
                            'linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 40%,transparent 100%)',
                          zIndex: 2,
                          pointerEvents: 'none',
                          borderRadius: '0 0 8px 8px',
                        }}
                      />
                    </div>
                  ) : (
                    /* Holographic orb fallback */
                    <div
                      className="mx-auto flex items-center justify-center"
                      style={{
                        width: 'clamp(200px,35vw,340px)',
                        height: 'clamp(200px,35vw,340px)',
                        borderRadius: '50%',
                        background:
                          'conic-gradient(from 0deg,#c8b6ff,#b8d4ff,#d4b8ff,#b6e6ff,#e0b6ff,#c8b6ff)',
                        boxShadow:
                          '0 0 80px 16px rgba(160,128,255,0.38),0 0 160px 40px rgba(120,160,255,0.16),inset 0 0 60px rgba(255,255,255,0.28)',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      {/* Glass highlight */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10%',
                          left: '14%',
                          width: '44%',
                          height: '34%',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.42)',
                          filter: 'blur(18px)',
                        }}
                      />
                      <div
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          textAlign: 'center',
                          color: 'rgba(255,255,255,0.92)',
                          textShadow: '0 2px 12px rgba(100,80,200,0.5)',
                        }}
                      >
                        <div style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900 }}>TH</div>
                        <div style={{ fontSize: '0.6rem', opacity: 0.82, letterSpacing: '0.25em' }}>PORTFOLIO</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* Floating card – top right */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.52 }}
                whileHover={{ y: -5 }}
                className="absolute top-[6%] right-[0%] sm:right-[-2%] lg:right-[-4%]"
                style={{
                  background: 'rgba(255,255,255,0.62)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.82)',
                  borderRadius: '18px',
                  padding: '12px 18px',
                  boxShadow: '0 8px 30px rgba(110,90,220,0.12)',
                  minWidth: '136px',
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: '9px', color: '#7b6ec8', letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Specialty</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#160e3a' }}>Full-Stack Dev</div>
                <div style={{ fontSize: '11px', color: '#6b64a8', marginTop: '2px' }}>React &amp; Next.js</div>
              </motion.div>

              {/* Floating card – bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.62 }}
                whileHover={{ y: -5 }}
                className="absolute bottom-[8%] left-[0%] sm:left-[-2%] lg:left-[-4%]"
                style={{
                  background: 'rgba(255,255,255,0.62)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.82)',
                  borderRadius: '18px',
                  padding: '12px 18px',
                  boxShadow: '0 8px 30px rgba(110,90,220,0.12)',
                  minWidth: '130px',
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: '9px', color: '#7b6ec8', letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Focus</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#160e3a' }}>UI/UX Design</div>
                <div style={{ fontSize: '11px', color: '#6b64a8', marginTop: '2px' }}>Product &amp; Brand</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      {/* ═════════════════  END HERO  ═════════════════ */}

      {/* Services Section */}
      <section className="py-32 relative bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="Expertise"
            title="What I Bring to the Table"
            subtitle="Combining design aesthetics with precision engineering to create digital products that stand out from the noise."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard>
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">
                <Layout className="text-blue-400 w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">UI/UX Design</h3>
              <p className="text-[#64748b] leading-relaxed font-medium">Creating visually stunning and highly intuitive interfaces that prioritize user experience.</p>
            </GlassCard>
            <GlassCard delay={0.1}>
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">
                <Code className="text-blue-400 w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Web Development</h3>
              <p className="text-[#64748b] leading-relaxed font-medium">Building scalable, high-performance web applications using modern technologies.</p>
            </GlassCard>
            <GlassCard delay={0.2}>
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">
                <Smartphone className="text-blue-400 w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Mobile First</h3>
              <p className="text-[#64748b] leading-relaxed font-medium">Ensuring every experience is flawlessly responsive and optimized for every device.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader
            badge="Portfolio"
            title="Selected Works"
            subtitle="A curated selection of projects where I've pushed the boundaries of digital product design."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project: any, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-[#64748b] text-sm mb-6 line-clamp-2">{project.description}</p>
                  <Link href={`/projects/detail?id=${project.id}`} className="text-[#0ea5e9] font-bold text-sm">View Case Study →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-8">Ready to start a project?</h2>
          <FuturisticButton href="/contact">Get in Touch</FuturisticButton>
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[#64748b] text-sm font-medium">© {new Date().getFullYear()} HANSLAY. All rights reserved.</p>
            <div className="flex gap-8">
              {['Twitter', 'LinkedIn', 'Github'].map(social => (
                <Link key={social} href="#" className="text-[#64748b] hover:text-[#0ea5e9] text-xs font-bold uppercase tracking-widest">{social}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
