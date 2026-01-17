import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedSection = ({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.6,
    once = true
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-100px' });

    const directions = {
        up: { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
        down: { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
        left: { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
        right: { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
        fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
        scale: { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 } },
    };

    const variants = directions[direction];

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            variants={{
                initial: variants.initial,
                animate: {
                    ...variants.animate,
                    transition: { duration, delay, ease: 'easeOut' }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
