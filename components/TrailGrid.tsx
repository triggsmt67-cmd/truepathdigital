
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, Goal, CheckCircle } from 'lucide-react';

const TrailGrid: React.FC = () => {
    return (
        <section id="how-i-work" className="py-12 md:py-16 relative bg-background overflow-hidden">
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
                        <h2 className="text-3xl md:text-6xl lg:text-7xl font-semibold text-white tracking-normal leading-[0.95] mb-8">

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
                        <div className="text-lg md:text-xl text-secondary font-light leading-relaxed space-y-8">
                            <p>
                                I start by understanding your buyer, your goals, and what already exists.<br />
                                <span className="text-secondary/60">Not what should exist. Not what someone sold you. What’s actually there.</span>
                            </p>

                            <div>
                                <p className="mb-4 text-white font-medium">From there, the work takes one of two paths:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></div>
                                        <span>Clarifying the decisions that are holding everything else up</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></div>
                                        <span>Building only what’s necessary to support those decisions</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4 border-l-2 border-primary/30 pl-6">
                                <p className="text-white font-medium text-xl">
                                    The goal is always the same:
                                </p>
                                <p className="text-secondary">
                                    fewer unknowns, less stress, and marketing you can actually trust.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrailGrid;
