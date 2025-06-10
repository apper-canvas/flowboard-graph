import React from 'react';
import Label from '@/components/atoms/Label';
import Checkbox from '@/components/atoms/Checkbox';
import Paragraph from '@/components/atoms/Paragraph';

const ToggleSwitch = ({ id, label, description, checked, onChange, className }) => {
    return (
        <div className={`flex items-center justify-between ${className || ''}`}>
            <div>
                <Label htmlFor={id} className="text-sm font-medium text-surface-700 mb-0">
                    {label}
                </Label>
                {description && <Paragraph className="text-xs text-surface-500 mt-0">{description}</Paragraph>}
            </div>
            <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
                <Checkbox
                    id={id}
                    checked={checked}
                    onChange={onChange}
                />
                <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;