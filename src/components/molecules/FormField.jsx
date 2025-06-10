import React from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';

const FormField = ({ id, label, type = 'text', value, onChange, options, rows, placeholder, required = false, className, labelClassName, inputClassName, ...props }) => {
    const renderInput = () => {
        switch (type) {
            case 'select':
                return (
                    <Select id={id} value={value} onChange={onChange} className={inputClassName} {...props}>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </Select>
                );
            case 'textarea':
                return (
                    <Textarea id={id} value={value} onChange={onChange} rows={rows} placeholder={placeholder} className={inputClassName} {...props} />
                );
            default:
                return (
                    <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={inputClassName} {...props} />
                );
        }
    };

    return (
        <div className={className}>
            <Label htmlFor={id} className={labelClassName}>
                {label} {required && '*'}
            </Label>
            {renderInput()}
        </div>
    );
};

export default FormField;