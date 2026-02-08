
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Zap } from 'lucide-react';

const ComparisonSection: React.FC = () => {
    return (
        <section id="comparison" className="py-20 md:py-24 relative border-b border-white/5 bg-background overflow-hidden">
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start relative">

                    {/* Vertical Divider (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-1/2"></div>

                    {/* Left Side: The Reactive Loop (Problem) */}
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col justify-center pr-4 md:pr-12 text-opacity-80"
                    >
                        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-6 block">
                            The Reactive Loop
                        </span>

                        <h3 className="text-2xl md:text-3xl font-medium text-white/90 mb-6 tracking-tight leading-tight">
                            When Everything Feels Urgent, <br className="hidden md:block" />Nothing Feels Clear
                        </h3>

                        <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed">
                            <p>
                                Spreadsheets. Gut calls. Constant tweaks. <br />
                                Most marketing doesn’t fail — it just never settles.
                            </p>
                            <p>
                                When every metric demands attention, decisions get rushed. You stay busy, but clarity keeps slipping.
                            </p>
                        </div>

                        {/* Optional Subdued List */}
                        <ul className="mt-8 space-y-3">
                            {["Chasing metrics after the fact", "Changing tactics too often", "Decisions made under pressure"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                                    <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right Side: The True Path Protocol (Solution) */}
                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col justify-center pl-0 md:pl-4 relative"
                    >
                        {/* Soft Ambient Light */}
                        <div className="absolute -left-20 top-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-40"></div>

                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6 block">
                            The True Path Protocol
                        </span>

                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 tracking-tight leading-tight">
                            From Reaction to <br className="hidden md:block" />Reasoned Decisions
                        </h3>

                        <div className="space-y-6 text-gray-300 font-light text-lg leading-relaxed">
                            <p>
                                Clear inputs. Fewer moves. Better timing. <br />
                                Instead of reacting to noise, we slow the system down enough to see signal.
                            </p>
                            <p>
                                That’s when marketing becomes manageable — and decisions start to compound.
                            </p>
                        </div>

                        {/* Confident List */}
                        <ul className="mt-8 space-y-3">
                            {["One priority at a time", "Fewer, intentional changes", "Decisions made with context"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
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

export default ComparisonSection;
