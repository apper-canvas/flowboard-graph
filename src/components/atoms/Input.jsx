import React from 'react';

const Input = ({ label, value, onChange, className, type = 'text', placeholder, ...props }) => {
    const combinedClassName = `w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 ${className || ''}`;
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={combinedClassName}
            {...props}
        />
    );
};

export default Input;