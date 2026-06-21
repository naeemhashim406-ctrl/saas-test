import React from 'react';
import AuthCard from '../../features/auth/components/AuthCard';
import InviteForm from '../../features/onboarding/components/InviteForm';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function Invite() {
  const { user, loading } = useAuth();
  const [orgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    // In a full app, fetch user's current organization; placeholder uses metadata
    if (user && (user as any).user_metadata?.organization_id) setOrgId((user as any).user_metadata.organization_id as string);
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">Please sign in to invite members.</div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <AuthCard title="Invite teammates" subtitle="Add your team to VisaFlow">
        {orgId ? <InviteForm organizationId={orgId} /> : <p className="text-sm text-slate-400">No organization found. Create one first.</p>}
      </AuthCard>
    </div>
  );
}
