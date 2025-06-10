import React from 'react';

const Heading = ({ level = 1, children, className, ...props }) => {
    const Tag = `h${level}`;
    const baseClasses = {
        1: 'text-2xl font-heading font-bold text-surface-900',
        2: 'text-xl font-medium text-surface-900',
        3: 'text-lg font-medium text-surface-900',
        4: 'font-medium text-surface-900',
        5: 'text-sm font-medium text-surface-900',
        6: 'text-xs font-medium text-surface-900',
    };
    const combinedClassName = `${baseClasses[level]} ${className || ''}`;

    return (
        <Tag className={combinedClassName} {...props}>
            {children}
        </Tag>
    );
};

export default Heading;