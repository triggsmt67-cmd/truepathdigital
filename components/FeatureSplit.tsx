import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Activity, Terminal } from 'lucide-react';

const FeatureSplit: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#0F0F0F] relative overflow-hidden border-b border-white/5">
       {/* Ambient Background Lighting */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-40 translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-blue-500/5 blur-[100px] rounded-full opacity-30 -translate-x-1/3 translate-y-1/4"></div>
       </div>

       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          {/* Left Side: Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 md:mb-6 leading-tight tracking-tight">
              From Traffic to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Revenue.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-lg font-normal">
              Stop chasing vanity metrics. We deploy high-performance web infrastructure and automated ad campaigns that turn cold clicks into qualified clients.
            </p>
            <ul className="space-y-4 md:space-y-5 mb-8 md:mb-10">
              {[
                "Unified Google & Social Ad Strategy",
                "High-Conversion Web Design",
                "Automated Lead Nurture & CRM Sync"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                  <div className="p-1 rounded-full bg-primary/10">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Terminal Button */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-white/[0.03] border border-white/10 font-mono text-xs md:text-sm text-primary hover:bg-white/[0.08] transition-colors cursor-default shadow-lg ring-1 ring-white/5">
               <Terminal className="w-4 h-4" />
               <span>
                 &gt; launch_growth_protocol<span className="animate-[pulse_1s_infinite]">_</span>
               </span>
            </div>
          </motion.div>

          {/* Right Side: Bento Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group perspective-1000 mt-6 lg:mt-0"
          >
             {/* Card Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none scale-90 group-hover:scale-100"></div>
             
             <div className="relative rounded-3xl bg-[#181818] border border-white/10 overflow-hidden shadow-2xl hover:border-white/20 hover:shadow-primary/5 transition-all duration-500">
                
                {/* Visual Area (Mock Dashboard) */}
                <div className="h-64 md:h-80 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent relative p-6 md:p-8 flex flex-col justify-end overflow-hidden border-b border-white/5">
                   
                   {/* Abstract Graph Lines */}
                   <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none scale-110 group-hover:scale-105 transition-transform duration-700" viewBox="0 0 600 350" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M-10 300 L 50 250 L 100 270 L 150 200 L 200 220 L 250 150 L 300 180 L 350 100 L 400 120 L 450 50 L 500 80 L 600 0" fill="none" stroke="#FF6B00" strokeWidth="3" className="drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
                      <path d="M-10 300 L 50 250 L 100 270 L 150 200 L 200 220 L 250 150 L 300 180 L 350 100 L 400 120 L 450 50 L 500 80 L 600 0 V 350 H -10 Z" fill="url(#grad)" opacity="0.3" />
                   </svg>

                   {/* Floating Widget - Lighter and Glassier */}
                   <div className="relative z-10 bg-[#222]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 w-full mx-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="text-[9px] md:text-[11px] font-medium text-gray-400 uppercase tracking-widest">Active Revenue</div>
                        <div className="flex items-center gap-1 text-emerald-400 text-[10px] md:text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
                            <TrendingUp className="w-3 h-3" />
                            +24.5%
                        </div>
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 md:mb-4">$124,500<span className="text-gray-500 text-lg md:text-xl font-medium">.00</span></div>
                      
                      {/* Mini Progress Bar */}
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-white/10 h-1.5 md:h-2 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '75%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="bg-gradient-to-r from-primary to-orange-400 h-full rounded-full shadow-[0_0_15px_#FF6B00]" 
                            />
                        </div>
                        <span className="text-xs text-gray-400 font-mono">75%</span>
                      </div>
                   </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 bg-[#181818] relative z-20">
                   <div className="flex items-start justify-between mb-4 md:mb-6">
                      <div>
                         <h3 className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:text-primary transition-colors tracking-tight">Real-time Clarity</h3>
                         <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-[280px]">
                            Monitor campaign performance and lead quality across your entire digital ecosystem.
                         </p>
                      </div>
                      <div className="p-2.5 md:p-3.5 rounded-2xl bg-white/[0.05] text-primary border border-white/10 shadow-inner group-hover:bg-primary/10 transition-colors">
                         <Activity className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                   </div>
                   
                   <div className="flex gap-2 flex-wrap">
                      {['ADS MANAGER', 'CRM SYNC', 'ANALYTICS'].map(tag => (
                         <span key={tag} className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-md bg-white/[0.03] border border-white/10 text-[9px] md:text-[10px] font-medium text-gray-400 tracking-wider uppercase hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all cursor-default">
                            {tag}
                         </span>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
       </div>
    </section>
  );
};

export default FeatureSplit;