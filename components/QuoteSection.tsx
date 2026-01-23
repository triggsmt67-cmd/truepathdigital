import React from 'react';
import { motion } from 'framer-motion';

const QuoteSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#080808] relative flex justify-center items-center border-b border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.2] mb-8"
        >
          "Good design is invisible. Great design is <span className="text-primary relative inline-block">
            unforgettable
            <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-primary/30 rounded-full blur-[2px]"></span>
          </span>."
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-500 font-sans font-normal tracking-wider uppercase"
        >
          — Joe Sparano
        </motion.p>
      </div>
    </section>
  );
};

export default QuoteSection;