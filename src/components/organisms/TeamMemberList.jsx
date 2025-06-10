import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { userService } from '@/services';
import MemberCard from '@/components/molecules/MemberCard';
import LoadingPlaceholder from '@/components/molecules/LoadingPlaceholder';
import ErrorDisplay from '@/components/molecules/ErrorDisplay';
import EmptyDisplay from '@/components/molecules/EmptyDisplay';

const TeamMemberList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to load team members');
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <LoadingPlaceholder type="team" count={6} />;
  }

  if (error) {
    return <ErrorDisplay title="Failed to load team" message={error} onRetry={() => window.location.reload()} />;
  }

  if (users.length === 0) {
    return (
      <EmptyDisplay
        iconName="Users"
        title="No team members"
        message="Invite team members to start collaborating"
        actionButtonText="Invite Members"
        onActionButtonClick={() => toast.info('Invite functionality not implemented')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user, index) => (
        <MemberCard key={user.id} user={user} index={index} />
      ))}
    </div>
  );
};

export default TeamMemberList;