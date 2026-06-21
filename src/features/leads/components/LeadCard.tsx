import React from 'react';

export default function LeadCard({ lead }: { lead: any }) {
  return (
    <div className="bg-white/4 rounded-xl p-4 shadow-md">
      <h4 className="text-white font-medium">{lead.title}</h4>
      <p className="text-sm text-slate-300 mt-1">{lead.contact_email || lead.contact_phone}</p>
    </div>
  );
}
