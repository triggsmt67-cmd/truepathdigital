import React from 'react';
import { motion } from 'framer-motion';

const QuoteSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.15] mb-8"
        >
          The hardest part of marketing isn’t doing more.<br className="hidden md:block" />
          It’s deciding what <span className="text-primary">not</span> to do.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-sm md:text-base text-gray-500 font-sans tracking-wide"
        >
          Clarity comes from subtraction, not activity.
        </motion.p>
      </div>
    </section>
  );
};

export default QuoteSection;