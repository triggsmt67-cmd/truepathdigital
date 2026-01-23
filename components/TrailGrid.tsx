
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, Goal, CheckCircle } from 'lucide-react';

const TrailGrid: React.FC = () => {
    return (
        <section id="how-i-work" className="py-12 md:py-16 relative bg-[#121417] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block font-medium">Methodology</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[0.95] mb-8">
                            How I Work
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
                            <p className="text-xl md:text-2xl text-white font-medium italic leading-relaxed">
                                "I don’t start with tools, tactics, or templates."
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Narrative */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="text-lg md:text-xl text-gray-400 leading-relaxed font-normal space-y-6">
                            <p>
                                I start by understanding your buyer, your goals, and what already exists.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 py-4">
                                <div className="flex items-start gap-3">
                                    <Target className="w-5 h-5 text-primary shrink-0 mt-1" />
                                    <span className="text-gray-300">Sometimes that leads to clearer decisions.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Goal className="w-5 h-5 text-primary shrink-0 mt-1" />
                                    <span className="text-gray-300">Sometimes it leads to building something new.</span>
                                </div>
                            </div>
                            <p className="text-white font-medium border-l-2 border-primary/30 pl-6">
                                The goal is always the same: fewer unknowns, less stress, and marketing you can actually trust.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#121417] bg-gray-800 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 font-mono">Supporting Montana owners today</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrailGrid;
