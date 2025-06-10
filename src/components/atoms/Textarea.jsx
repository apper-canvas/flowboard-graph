import React from 'react';

const Textarea = ({ value, onChange, className, placeholder, rows = 3, ...props }) => {
    const combinedClassName = `w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 ${className || ''}`;
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={combinedClassName}
            {...props}
        />
    );
};

export default Textarea;