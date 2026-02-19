import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    disabled?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = "",
    spotlightColor = "rgba(255, 107, 0, 0.15)",
    disabled = false
}) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the spotlight movement
    const springConfig = { damping: 20, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        mouseX.set(event.clientX - left);
        mouseY.set(event.clientY - top);
    };

    const background = useTransform(
        [smoothX, smoothY],
        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`
    );

    return (
        <div
            ref={containerRef}
            onMouseMove={!disabled ? handleMouseMove : undefined}
            onMouseEnter={!disabled ? () => setIsHovered(true) : undefined}
            onMouseLeave={!disabled ? () => setIsHovered(false) : undefined}
            className={`relative overflow-hidden ${className}`}
        >
            {!disabled && (
                <motion.div
                    className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
                    style={{
                        background,
                        opacity: isHovered ? 1 : 0,
                    }}
                />
            )}
            {children}
        </div>
    );

};
