import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, MapPin, BrainCircuit, CheckCircle2, ArrowDown, ArrowRight } from 'lucide-react';
import { CONTACT_LINKS } from '../constants/links';

const stackItems = [
    {
        title: 'Paid Ads Data',
        subtitle: 'What’s actually happening in your accounts',
        icon: Activity,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20'
    },
    {
        title: 'Buyer Behavior',
        subtitle: 'How real people are responding—not just clicks',
        icon: Users,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20'
    },
    {
        title: 'Local Market Context',
        subtitle: 'Montana seasonality, demand, and constraints',
        icon: MapPin,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20'
    },
    {
        title: 'AI Analysis',
        subtitle: 'Used as support, not a decision-maker',
        icon: BrainCircuit,
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        border: 'border-orange-400/20'
    }
];

const DecisionStack: React.FC = () => {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="rounded-[32px] bg-[#121417]/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center">
                        Intelligent Decision Stack
                    </h3>
                </div>

                {/* Stack Content */}
                <div className="p-6 space-y-3 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[2.85rem] top-10 bottom-24 w-px bg-gradient-to-b from-white/5 via-white/10 to-transparent z-0 dashed-line" />

                    {stackItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.15), duration: 0.5, ease: "easeOut" }}
                            className={`relative z-10 flex items-center gap-4 p-4 rounded-2xl border bg-[#181a1d] transition-colors hover:bg-[#1c1e22] group ${item.border} border-opacity-30 hover:border-opacity-50`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={`font-semibold text-sm mb-0.5 text-gray-200 group-hover:text-white transition-colors`}>
                                    {item.title}
                                </div>
                                <div className="text-xs text-gray-500 font-medium leading-snug">
                                    {item.subtitle}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Flow Indicator to Final Decision */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 24 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        className="flex justify-center items-center text-gray-600"
                    >
                        <ArrowDown className="w-4 h-4 animate-bounce opacity-50" />
                    </motion.div>

                    {/* Final Output */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
                        className="relative z-10"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-orange-600/50 rounded-2xl blur opacity-30 animate-pulse"></div>
                        <div className="relative flex items-center gap-4 p-5 rounded-2xl border border-primary/30 bg-[#1A1D21] shadow-[0_4px_20px_-5px_rgba(255,107,0,0.15)] group">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-white text-base mb-0.5">
                                    One Clear Next Decision
                                </div>
                                <div className="text-xs text-primary/80 font-medium uppercase tracking-wider">
                                    The Final Output
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DecisionStack;
