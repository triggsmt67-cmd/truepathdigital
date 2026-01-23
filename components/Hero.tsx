
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { CONTACT_LINKS } from '../constants/links';

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 lg:py-0 border-b border-white/5 bg-[#121417]">

      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 w-full h-full scale-125 origin-center">
          <iframe
            src="https://my.spline.design/glasswave-6HLEnvJfCRsq1aKT2xqlgme7"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full opacity-70"
            style={{
              filter: 'hue-rotate(160deg) saturate(1.4) contrast(1.1)',
            }}
            title="3D Wave Background"
          />
        </div>
        <div className="absolute inset-0 bg-[#121417]/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-[#121417]/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#121417] via-transparent to-[#121417]/50"></div>
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN: Typography & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#FF6B00]"></span>
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-primary uppercase">
                Marketing Intelligence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-semibold text-white tracking-tighter leading-[1] md:leading-[0.9] mb-6 md:mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF6B00] to-white inline-block">Clear marketing decisions</span> for Montana business owners
            </motion.h1>

            {/* Subhead */}
            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-gray-400 mb-8 md:mb-10 max-w-2xl leading-relaxed font-normal">
              Clear thinking around paid ads, buyer behavior, and practical use of AI— so you stop guessing, stop wasting money, and feel confident again.
            </motion.p>

            {/* CTA Group */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <a
                href={CONTACT_LINKS.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex h-14 overflow-hidden rounded-full p-[2px] focus:outline-none group shadow-[0_0_50px_-10px_rgba(255,107,0,0.5)] w-full sm:w-auto transition-transform hover:scale-105 active:scale-95 duration-200"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#FF6B00_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#121417] px-8 text-lg font-medium text-white backdrop-blur-3xl gap-3 transition-all group-hover:bg-[#111] group-hover:text-primary">
                  Start with a conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Direct partner access</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Results Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative block w-full mt-8 lg:mt-0"
          >
            <div className="w-full h-[340px] md:h-[400px] rounded-[24px] md:rounded-[32px] bg-white/[0.05] backdrop-blur-xl border border-primary/20 shadow-[0_0_60px_-15px_rgba(255,107,0,0.15)] overflow-hidden flex flex-col relative group transition-all duration-700 hover:border-primary/40">
              <div className="h-10 md:h-12 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-medium text-gray-400 tracking-[0.15em] uppercase">
                    Market Logic Signal
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  <div className="w-1 h-1 rounded-full bg-white/20"></div>
                </div>
              </div>

              <div className="flex-1 relative w-full overflow-hidden">
                <div className="absolute inset-0 w-full h-full flex flex-col justify-between py-6 px-6 opacity-10 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-white border-dashed border-t border-white/50"></div>
                  ))}
                </div>

                <div className="absolute inset-0 pt-8 pb-4 px-4 md:px-8">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      d="M0,180 C80,170 120,160 180,120 C240,80 320,90 400,30 L500,10 L500,200 L0,200 Z"
                      fill="url(#chartGradient)"
                    />
                    <motion.path
                      d="M0,180 C80,170 120,160 180,120 C240,80 320,90 400,30 L500,10"
                      fill="none"
                      stroke="#FF6B00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                      style={{ filter: "url(#glow)" }}
                    />
                  </svg>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="absolute top-[20%] right-[15%] bg-[#121417]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg shadow-xl"
                >
                  <span className="text-[10px] md:text-xs font-bold text-white block">Decision Clarity</span>
                  <span className="text-[10px] md:text-xs text-primary font-mono">+88%</span>
                </motion.div>
              </div>

              <div className="h-20 md:h-24 bg-[#121417]/40 border-t border-white/5 grid grid-cols-3 divide-x divide-white/5 backdrop-blur-md">
                <div className="flex flex-col justify-center px-2 md:px-6 group/metric text-center md:text-left">
                  <span className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-1 group-hover/metric:text-white transition-colors">
                    Wasted Spend
                  </span>
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 justify-center md:justify-start">
                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }} className="text-base md:text-2xl font-bold text-white">
                      -45%
                    </motion.span>
                    <TrendingDown className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary" />
                  </div>
                </div>
                <div className="flex flex-col justify-center px-2 md:px-6 group/metric text-center md:text-left">
                  <span className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-1 group-hover/metric:text-white transition-colors">
                    Buyer Trust
                  </span>
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 justify-center md:justify-start">
                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }} className="text-base md:text-2xl font-bold text-white">
                      +3x
                    </motion.span>
                    <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500" />
                  </div>
                </div>
                <div className="flex flex-col justify-center px-2 md:px-6 group/metric text-center md:text-left">
                  <span className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-1 group-hover/metric:text-white transition-colors">
                    AI Output
                  </span>
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 justify-center md:justify-start">
                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.5 }} className="text-base md:text-2xl font-bold text-white">
                      10x
                    </motion.span>
                    <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
