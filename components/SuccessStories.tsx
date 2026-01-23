import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Minus, Plus, CreditCard, Server, Database } from 'lucide-react';
import { ClientSuccess } from '../types';

interface ExtendedClient extends ClientSuccess {
    category: string;
    icon: React.ElementType;
}

const clients: ExtendedClient[] = [
    { 
        name: 'Midday Financial', 
        result: '40% reduction in lead cost', 
        metric: '-40% CPA',
        category: 'FINTECH',
        icon: CreditCard
    },
    { 
        name: 'Vercel', 
        result: '2x Velocity in feature shipments', 
        metric: '2x Speed',
        category: 'INFRASTRUCTURE',
        icon: Server
    },
    { 
        name: 'Supabase', 
        result: 'Automated 15,000 hrs of manual entry', 
        metric: '15k Hrs Saved',
        category: 'DATABASE',
        icon: Database
    }
];

const SuccessStories: React.FC = () => {
  const [activeindex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="case-studies" className="py-20 bg-background border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="text-6xl md:text-8xl font-semibold mb-16 tracking-tighter">Success Stories</h2>
        
        <div className="flex flex-col border-t border-white/10">
            {clients.map((client, index) => (
                <div 
                    key={index}
                    className="group border-b border-white/10 cursor-pointer transition-colors hover:bg-white/[0.02]"
                    onClick={() => setActiveIndex(activeindex === index ? null : index)}
                >
                    <div className="py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        {/* Category */}
                        <div className="w-48">
                            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase group-hover:text-primary transition-colors">
                                {client.category}
                            </span>
                        </div>
                        
                        {/* Company Name */}
                        <div className="flex-1 flex items-center gap-4">
                            <client.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            <h3 className="text-3xl font-medium text-gray-300 group-hover:text-white transition-colors">
                                {client.name}
                            </h3>
                        </div>

                        {/* Action Icon */}
                        <div className="hidden md:block">
                            <div className={`p-2 rounded-full border border-white/10 transition-colors ${activeindex === index ? 'bg-white text-black border-white' : 'text-gray-500 group-hover:text-white'}`}>
                                {activeindex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                        </div>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                        {activeindex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pb-12 pl-0 md:pl-48 grid md:grid-cols-3 gap-8">
                                    <div className="col-span-2">
                                        <p className="text-lg text-gray-400 leading-relaxed border-l-2 border-primary/50 pl-6">
                                            {client.result}. Utilizing our TRAIL methodology, we re-engineered their data pipelines to eliminate manual bottlenecks.
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                         <div className="text-4xl font-bold text-white mb-2">{client.metric}</div>
                                         <div className="text-sm text-gray-500 uppercase tracking-wider">Verified Impact</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;