import React from 'react';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const FilterChip = ({ label, value, onClear, bgColor, textColor }) => {
    return (
        <Badge bgColor={bgColor} textColor={textColor}>
            {label}: {value}
            <Button
                onClick={onClear}
                className={`ml-1 px-0 py-0 text-current hover:text-opacity-80 transition-opacity duration-200`}
                type="button"
            >
                <ApperIcon name="X" className="w-3 h-3" />
            </Button>
        </Badge>
    );
};

export default FilterChip;