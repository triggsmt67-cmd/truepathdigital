import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FeatureSplit: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-background relative overflow-hidden border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Intro - Small & Subtle */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <span className="text-secondary/40 text-sm md:text-base font-light tracking-wide">
            Why marketing feels harder than it should
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: The Problem */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col opacity-80"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-secondary/40 mb-6">
              The Reactive Loop
            </span>

            <h3 className="text-2xl md:text-3xl font-medium text-white/90 mb-6 leading-tight">
              When everything feels urgent, <br />nothing feels clear.
            </h3>

            <div className="text-secondary/60 font-light text-lg leading-relaxed space-y-6 mb-8">
              <p>
                Spreadsheets. Gut calls. Constant tweaks. <br className="hidden md:block" />
                Most marketing doesn’t fail — it just never settles.
              </p>
              <p>
                When every metric demands attention, decisions get rushed.
                You stay busy, but clarity keeps slipping.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "Chasing metrics after the fact",
                "Changing tactics too often",
                "Conflicting reports",
                "Decisions made under pressure"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-secondary/40">
                  <div className="w-1 h-1 rounded-full bg-secondary/20"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: The Resolution */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col relative"
          >
            {/* Subtle backlight for right column */}
            <div className="absolute -left-10 top-0 w-full h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-30"></div>

            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6 relative z-10">
              The True Path Protocol
            </span>

            <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 leading-tight relative z-10">
              From reaction to <br />reasoned decisions.
            </h3>

            <div className="text-secondary font-light text-lg leading-relaxed space-y-6 mb-8 relative z-10">
              <p>
                Clarity doesn’t come from doing more. <br className="hidden md:block" />
                It comes from slowing the system down enough to see signal.
              </p>
              <p>
                When decisions are grounded in context, marketing stops feeling chaotic — and starts feeling manageable.
              </p>
            </div>

            <ul className="space-y-3 relative z-10">
              {[
                "One priority at a time",
                "Fewer, intentional changes",
                "Signals you can explain",
                "Decisions made with context"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-secondary font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSplit;