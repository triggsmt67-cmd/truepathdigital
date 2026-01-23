import React from 'react';
import { motion } from 'framer-motion';

interface SectionSeparatorProps {
  number: string;
  title: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ number, title }) => {
  return (
    <div className="relative w-full flex items-center justify-center py-12 md:py-20 overflow-hidden pointer-events-none z-20">
      
      {/* 1. The Path (Vertical Lines) */}
      {/* Top Line descending */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-50"></div>
      
      {/* 2. The Horizon (Horizontal Line with Glow) */}
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[1px]"></div>
      
      {/* 3. The Node (Center Badge) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-[0_0_20px_-5px_rgba(0,0,0,1)] ring-1 ring-white/5">
            <span className="text-[10px] font-mono font-bold text-primary tracking-widest">
                {number}
            </span>
            <span className="w-px h-3 bg-white/20"></span>
            <span className="text-[10px] font-mono font-medium text-gray-400 tracking-[0.2em] uppercase whitespace-nowrap">
                {title}
            </span>
        </div>
        
        {/* Glow effect behind badge */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10 opacity-50"></div>
      </motion.div>

    </div>
  );
};

export default SectionSeparator;