import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrgSchema, CreateOrgInput } from '../../features/onboarding/validators/onboardingSchemas';
import { toast } from 'sonner';
import AuthCard from '../../features/auth/components/AuthCard';

export default function CreateOrg() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateOrgInput>({
    resolver: zodResolver(createOrgSchema)
  });

  async function onSubmit(data: CreateOrgInput) {
    try {
      const res = await fetch('/api/create-org', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.error || 'Failed to create organization');
        return;
      }
      toast.success('Organization created');
      // Redirect to onboarding welcome or settings
      window.location.replace(`/onboarding/welcome?org=${json.org_id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Unexpected error');
    }
  }
