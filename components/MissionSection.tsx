
import React from 'react';
import { motion } from 'framer-motion';

const MissionSection: React.FC = () => {
    return (
        <section className="pt-6 pb-12 md:pt-8 md:pb-20 bg-background relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="max-w-5xl mx-auto">
                    {/* Subtle Label - Secondary */}
                    <div className="flex items-center gap-3 mb-12 opacity-50">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-xs font-medium text-secondary uppercase tracking-widest">Introduction</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Primary Statement - Large & Confident */}
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-12 max-w-4xl">
                            Most marketing problems don’t start with the platform.
                        </h2>

                        <div className="grid md:grid-cols-12 gap-12">
                            {/* Empty column for offset layout if desired, or just full width text */}
                            <div className="md:col-span-12 lg:col-span-10 space-y-8 text-lg md:text-2xl text-secondary font-light leading-relaxed">
                                <p>
                                    They start with unclear buyers, noisy advice, and too many tools doing too little.
                                </p>
                                <p>
                                    AI has made execution easier than ever.<br className="hidden md:block" />
                                    It’s also made decision-making harder.
                                </p>

                                {/* Role Declaration - Distinct but connected */}
                                <p className="text-white/90 pt-4">
                                    My role is to slow the chaos down, clarify what actually matters, and help you make marketing decisions you can stand behind.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
