import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import AuthCard from '../../features/auth/components/AuthCard';

export default function AcceptInvite() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [status, setStatus] = useState<'pending'|'accepted'|'invalid'|'loading'>('loading');

  useEffect(() => {
    async function accept() {
      if (!token) {
        setStatus('invalid');
        return;
      }

      try {
        // Call server-side function to validate token and create membership
        const res = await fetch('/api/accept-invite', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token })
        });
        const json = await res.json();
        if (!res.ok) {
          setStatus('invalid');
          return;
        }

        // If invite requires sign-in, redirect to sign-in with next param
        if (json.require_signin) {
          window.location.replace(`/auth/login?next=/app&invite_token=${token}`);
          return;
        }

        setStatus('accepted');
      } catch (err) {
        console.error(err);
        setStatus('invalid');
      }
    }

    accept();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <AuthCard title="Accepting invite" subtitle="Finalizing membership to the organization">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
          {status === 'loading' && <p className="text-slate-300">Processing your invite…</p>}
          {status === 'accepted' && <p className="text-white">Invite accepted — redirecting…</p>}
          {status === 'invalid' && <p className="text-rose-400">Invalid or expired invite.</p>}
        </motion.div>
      </AuthCard>
    </div>
  );
}
