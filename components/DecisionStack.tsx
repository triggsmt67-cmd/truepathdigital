import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, MapPin, BrainCircuit, CheckCircle2, ArrowDown, ArrowRight } from 'lucide-react';
import { CONTACT_LINKS } from '../constants/links';
import { SpotlightCard } from './SpotlightCard';


const stackItems = [
    {
        title: 'Paid Ads Data',
        subtitle: 'What’s actually happening in your accounts',
        icon: Activity,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
        spotlight: 'rgba(96, 165, 250, 0.15)'
    },
    {
        title: 'Buyer Behavior',
        subtitle: 'How real people are responding—not just clicks',
        icon: Users,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20',
        spotlight: 'rgba(192, 132, 252, 0.15)'
    },
    {
        title: 'Local Market Context',
        subtitle: 'Montana seasonality, demand, and constraints',
        icon: MapPin,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20',
        spotlight: 'rgba(52, 211, 153, 0.15)'
    },
    {
        title: 'AI Analysis',
        subtitle: 'Used as support, not a decision-maker',
        icon: BrainCircuit,
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        border: 'border-orange-400/20',
        spotlight: 'rgba(251, 146, 60, 0.15)'
    }
];

interface DecisionStackProps {
    disableSpotlight?: boolean;
}

const DecisionStack: React.FC<DecisionStackProps> = ({ disableSpotlight = false }) => {

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="rounded-[32px] bg-background/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest text-center">
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
                            className="relative z-10"
                        >
                            <SpotlightCard
                                className={`flex items-center gap-4 p-4 rounded-2xl border bg-background/50 ${item.border} border-opacity-30`}
                                spotlightColor={item.spotlight}
                                disabled={disableSpotlight}
                            >

                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color} opacity-90`}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className={`font-semibold text-sm mb-0.5 text-gray-200`}>
                                        {item.title}
                                    </div>
                                    <div className="text-xs text-secondary/60 font-medium leading-snug">
                                        {item.subtitle}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}


                    {/* Flow Indicator to Final Decision */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 24 }}
                        transition={{ delay: 0.85, duration: 0.3 }}
                        className="flex justify-center items-center text-gray-700"
                    >
                        <ArrowDown className="w-4 h-4 text-secondary/20" />
                    </motion.div>

                    {/* Final Output - Clickable Button */}
                    <motion.a
                        href={CONTACT_LINKS.calendar}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: 1.25, duration: 0.6, type: "spring", stiffness: 100 }}
                        className="relative z-10 block cursor-pointer group/btn no-underline"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-amber-900/40 rounded-2xl blur opacity-0 group-hover/btn:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative flex items-center justify-between p-5 rounded-2xl border border-primary/40 bg-background shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] group-hover/btn:border-primary/60 group-hover/btn:shadow-[0_15px_35px_-10px_rgba(180,83,9,0.2)] transition-all duration-300">

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 opacity-90 group-hover/btn:opacity-100 transition-opacity">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-white text-[1.05rem] mb-0.5 group-hover/btn:text-primary transition-colors duration-300">
                                        Review My Current Setup
                                    </div>
                                    <div className="text-xs text-secondary/60 font-medium leading-relaxed group-hover/btn:text-white/70 transition-colors duration-300">
                                        ↳ Takes 15 minutes. No sales pitch. <br />I'll call your cell.
                                    </div>
                                </div>
                            </div>

                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                                <ArrowRight className="w-4 h-4 text-secondary group-hover/btn:text-white transition-colors" />
                            </div>
                        </div>
                    </motion.a>
                </div>
            </div>
        </div>
    );
};

export default DecisionStack;
