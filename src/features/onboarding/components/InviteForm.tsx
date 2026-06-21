import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InviteMemberInput, inviteMemberSchema } from '../validators/onboardingSchemas';
import { toast } from 'sonner';

export default function InviteForm({ organizationId }: { organizationId: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema)
  });

  async function onSubmit(data: InviteMemberInput) {
    try {
      // Replace with your deployed Edge Function URL or Supabase function endpoint
      const res = await fetch('/api/create-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, organization_id: organizationId })
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.error || 'Failed to send invite');
        return;
      }
      toast.success('Invite sent');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Unexpected error');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        <span className="text-sm text-slate-400">Email</span>
        <input {...register('email')} className="mt-1 block w-full rounded-md px-3 py-2 bg-white/3 text-white" />
        {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
      </label>

      <label className="block">
        <span className="text-sm text-slate-400">Role</span>
        <input {...register('role_name')} className="mt-1 block w-full rounded-md px-3 py-2 bg-white/3 text-white" placeholder="Manager" />
        {errors.role_name && <p className="text-xs text-rose-400">{errors.role_name.message}</p>}
      </label>

      <label className="block">
        <span className="text-sm text-slate-400">Message (optional)</span>
        <textarea {...register('message')} className="mt-1 block w-full rounded-md px-3 py-2 bg-white/3 text-white" rows={3}></textarea>
      </label>

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-500 rounded-md text-white">
          {isSubmitting ? 'Sending…' : 'Send invite'}
        </button>
      </div>
    </form>
  );
}
