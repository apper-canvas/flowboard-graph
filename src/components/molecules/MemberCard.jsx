import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '@/components/atoms/Avatar';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const MemberCard = ({ user, index }) => {
    const initials = user.name.split(' ').map(n => n[0]).join('');
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
            <div className="flex items-start space-x-4">
                <Avatar initials={initials} />
                <div className="flex-1 min-w-0">
                    <Heading level={4} className="break-words">{user.name}</Heading>
                    <Paragraph className="text-sm break-words">{user.email}</Paragraph>
                    <div className="flex items-center space-x-2 mt-3">
                        <Badge bgColor="bg-green-100" textColor="text-green-800">
                            Active
                        </Badge>
                        <Paragraph className="text-xs text-surface-500">Member</Paragraph>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <Button className="p-1 text-surface-400 hover:text-surface-600 transition-colors duration-200">
                        <ApperIcon name="MoreVertical" className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default MemberCard;