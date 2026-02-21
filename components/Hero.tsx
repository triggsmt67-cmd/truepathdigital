
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { CONTACT_LINKS } from '../constants/links';
import DecisionStack from './DecisionStack';

import { RevealText } from './RevealText';
import { Magnetic } from './Magnetic';

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
    <section id="hero" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[110px] pb-6 lg:pt-[130px] lg:pb-12 border-b border-white/5 bg-background">

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
        <div className="absolute inset-0 bg-background/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50"></div>
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

            {/* Heading with Reveal effect */}
            <h1 className="mb-6 md:mb-8 font-semibold tracking-tighter leading-[1.2] md:leading-[1.1]">
              <RevealText
                text="Clear marketing decisions for Montana business owners"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem]"
                highlightWords={["marketing", "decisions"]}
                highlightClassName="text-transparent bg-clip-text bg-gradient-to-br from-[#fbbf24] via-primary to-[#78350f]"

                delay={0.5}
              />
            </h1>


            {/* Subhead */}
            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-secondary mb-8 md:mb-10 max-w-2xl leading-relaxed font-normal">
              Clear thinking around paid ads, buyer behavior, and practical use of AI— so you stop guessing, stop wasting money, and feel confident again.
            </motion.p>

            {/* CTA Group */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Magnetic amount={0.2}>
                <a
                  href={CONTACT_LINKS.calendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex h-16 overflow-hidden rounded-full p-[1px] focus:outline-none group shadow-[0_0_40px_-5px_rgba(180,83,9,0.35)] w-full sm:w-auto transition-all hover:scale-[1.02] active:scale-95 duration-300"

                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0a0a0a] px-10 text-base font-medium text-white backdrop-blur-3xl gap-3 transition-colors group-hover:bg-background whitespace-nowrap">
                    Start with a conversation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </a>

              </Magnetic>

              <div className="flex items-center gap-2 text-sm text-secondary">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="md:whitespace-nowrap">Find out what to turn off before you spend another dime.</span>
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
            <DecisionStack disableSpotlight={true} />

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
