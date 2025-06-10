import React from 'react';
import Container from '@/components/atoms/Container';

const LoadingPlaceholder = ({ type = 'page', count = 1 }) => {
    if (type === 'page') {
        return (
            <Container className="p-6 space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-surface-200 rounded w-1/4 mb-4"></div>
                    <div className="h-12 bg-surface-200 rounded mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[...Array(count)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <div className="h-6 bg-surface-200 rounded"></div>
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className="h-32 bg-surface-200 rounded"></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        );
    }

    if (type === 'team') {
        return (
            <Container className="p-6 space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-surface-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(count)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-surface-200 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-surface-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-surface-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        );
    }
    return null;
};

export default LoadingPlaceholder;