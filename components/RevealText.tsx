import React from 'react';
import { motion } from 'framer-motion';

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
    highlightWords?: string[];
    highlightClassName?: string;
}

export const RevealText: React.FC<RevealTextProps> = ({
    text,
    className = "",
    delay = 0,
    once = true,
    highlightWords = [],
    highlightClassName = ""
}) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 120,
                duration: 0.8,
            },
        },
        hidden: {
            opacity: 0,
            y: "110%",
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
        >
            {words.map((word, index) => {
                const isHighlighted = highlightWords.some(h => word.toLowerCase().includes(h.toLowerCase()));

                return (
                    <span
                        key={index}
                        className={`overflow-hidden inline-block mr-[0.25em] py-[0.1em] my-[-0.1em] ${isHighlighted ? highlightClassName : ""}`}
                    >
                        <motion.span
                            variants={child}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    </span>
                );
            })}
        </motion.div>
    );
};
