
import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';

const solutions = [
    {
        role: "Strategic Insight",
        title: "Buyer clarity",
        description: "Understanding how people actually find and trust your business today—not how they used to.",
        tags: ["Consumer Psychology", "Market Attribution", "Trust Frameworks"],
        icon: Search
    },
    {
        role: "Resource Optimization",
        title: "Paid growth decisions",
        description: "Knowing what’s working, what’s wasting money, and what to stop doing—before you spend more.",
        tags: ["Google Ads Audit", "CPA Reduction", "Budget Scaling"],
        icon: TrendingUp
    },
    {
        role: "Operational Efficiency",
        title: "AI, used carefully",
        description: "Automation where it reduces effort and noise—not where it creates new confusion.",
        tags: ["Process Mapping", "Tool Integration", "Noise Reduction"],
        icon: ShieldAlert
    }
];

const Solutions: React.FC = () => {
    return (
        <section id="solutions" className="py-10 md:py-16 bg-[#121212] relative overflow-hidden border-b border-white/5 scroll-mt-20">
            {/* Abstract Background Grid/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-8 md:mb-12 max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight"
                    >
                        Help with Items
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl font-normal"
                    >
                        Clear decisions across your primary growth levers.
                    </motion.p>
                </div>

                {/* 3-Column Card Grid */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="group relative flex flex-col h-full bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(255,107,0,0.15)]"
                        >
                            {/* Icon Header */}
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]">
                                    <solution.icon className="w-8 h-8 group-hover:animate-pulse" strokeWidth={1.5} />
                                </div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full group-hover:border-primary/30 group-hover:text-primary transition-colors">
                                    {solution.role}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 mb-8">
                                <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight">
                                    {solution.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed font-normal">
                                    {solution.description}
                                </p>
                            </div>

                            {/* Tags List */}
                            <div className="space-y-3 pt-6 border-t border-white/5">
                                {solution.tags.map((tag, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                                        <ArrowRight className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Solutions;
