import React from 'react';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Container from '@/components/atoms/Container';

const SectionHeader = ({ title, description, titleLevel = 2, className, titleClassName, descriptionClassName, motionProps }) => {
    return (
        <Container className={className} motionProps={motionProps}>
            <Heading level={titleLevel} className={titleClassName}>{title}</Heading>
            {description && <Paragraph className={`mt-1 ${descriptionClassName || ''}`}>{description}</Paragraph>}
        </Container>
    );
};

export default SectionHeader;