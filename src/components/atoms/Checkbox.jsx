import React from 'react';

const Checkbox = ({ checked, onChange, className, ...props }) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={`sr-only peer ${className || ''}`}
            {...props}
        />
    );
};

export default Checkbox;