import React from 'react';

const Select = ({ children, value, onChange, className, ...props }) => {
    const combinedClassName = `w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 ${className || ''}`;
    return (
        <select
            value={value}
            onChange={onChange}
            className={combinedClassName}
            {...props}
        >
            {children}
        </select>
    );
};

export default Select;