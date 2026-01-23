
import React from 'react';
import { motion } from 'framer-motion';

const MissionSection: React.FC = () => {
    return (
        <section className="py-10 md:py-16 bg-background relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-xs font-medium text-gray-600 mb-8 uppercase tracking-widest border-l border-primary pl-4">Introduction</div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-normal leading-tight tracking-tight text-white/50 text-left mb-8">
                            Most marketing problems <span className="text-white font-medium">don’t start with the platform.</span>
                        </h2>
                        <div className="space-y-6 text-lg md:text-2xl text-gray-400 leading-relaxed font-normal">
                            <p>
                                They start with unclear buyers, noisy advice, and too many tools doing too little.
                                AI has made execution easier than ever—but it’s also made decision-making harder.
                            </p>
                            <p>
                                My role is to <span className="text-white font-medium">slow the chaos down</span>, clarify what actually matters,
                                and help you make marketing decisions you can stand behind.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
