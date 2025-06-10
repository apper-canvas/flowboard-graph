import React from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import TeamMemberList from '@/components/organisms/TeamMemberList';
import { toast } from 'react-toastify';

const TeamPage = () => {
  return (
    <div className="p-6 space-y-6 max-w-full">
      <PageHeader
        title="Team Members"
        description="Manage your project team and collaboration"
        actionButtonText="Invite Member"
        actionButtonIcon="UserPlus"
        onActionButtonClick={() => toast.info('Invite member functionality not implemented')}
      />
      <TeamMemberList />
    </div>
  );
};

export default TeamPage;