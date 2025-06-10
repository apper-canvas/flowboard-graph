import React from 'react';
import { motion } from 'framer-motion';

const Container = ({ children, className, motionProps, ...props }) => {
    const Component = motionProps ? motion.div : 'div';
    return (
        <Component className={className} {...motionProps} {...props}>
            {children}
        </Component>
    );
};

export default Container;