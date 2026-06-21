import React from 'react';
import AuthCard from '../../features/auth/components/AuthCard';
import LeadCard from '../../features/leads/components/LeadCard';

const sample = [{ id: '1', title: 'New lead: John Doe', contact_email: 'john@example.com' }];

export default function Leads() {
  return (
    <div className="min-h-screen p-6 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl text-white font-semibold mb-4">Leads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sample.map(l => (
            <LeadCard key={l.id} lead={l} />
          ))}
        </div>
      </div>
    </div>
  );
}
