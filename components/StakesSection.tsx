
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, UserCheck, AlertCircle, Sparkles } from 'lucide-react';

const StakesSection: React.FC = () => {
  return (
    <section id="who-this-is-for" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Headline (5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <h2 className="text-4xl md:text-6xl font-semibold text-white mb-8 tracking-tight leading-[1]">
              This work is for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">business owners who are done guessing.</span>
            </h2>
            <div className="hidden lg:block relative h-64">
              <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full" />
              <UserCheck className="w-32 h-32 text-primary/10 absolute top-10 left-10" />
            </div>
          </motion.div>

          {/* Points & Fit (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-12"
          >
            {/* List */}
            <ul className="space-y-8">
              {[
                "don’t know which marketing advice to trust anymore",
                "want clarity before committing more money",
                "care more about understanding than hype"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-6 group">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-xl md:text-2xl text-secondary font-normal leading-relaxed lowercase">{item}</span>
                </li>
              ))}
            </ul>

            {/* Closer / Fit Statement */}
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-16 h-16 text-primary" />
              </div>
              <div className="space-y-6 relative z-10">
                <p className="text-lg md:text-xl text-secondary font-normal leading-relaxed">
                  If you’re looking for someone to “just run ads,” this won’t be a good fit.
                </p>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                  If you want to understand why things work — and make the next decision with confidence — we’ll work well together.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StakesSection;
