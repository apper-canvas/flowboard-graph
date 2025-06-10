import React from 'react';

const Badge = ({ children, className, bgColor = 'bg-surface-100', textColor = 'text-surface-800' }) => {
    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} ${className || ''}`}>
            {children}
        </span>
    );
};

export default Badge;