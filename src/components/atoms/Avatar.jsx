import React from 'react';

const Avatar = ({ initials, className, bgColor = 'bg-gradient-purple', textColor = 'text-white' }) => {
    return (
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center font-medium ${textColor} ${className || ''}`}>
            {initials}
        </div>
    );
};

export default Avatar;