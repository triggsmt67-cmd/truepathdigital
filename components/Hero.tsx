
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { CONTACT_LINKS } from '../constants/links';
import DecisionStack from './DecisionStack';

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
    <section id="hero" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[110px] pb-6 lg:pt-[130px] lg:pb-12 border-b border-white/5 bg-[#121417]">

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
            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-10 max-w-2xl leading-relaxed font-normal">
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

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Direct partner access</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Intelligent Decision Stack */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative block w-full mt-12 lg:mt-0"
          >
            <DecisionStack />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
