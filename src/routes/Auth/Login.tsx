import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { magicLinkSchema, MagicLinkInput } from '../../features/auth/validators/authSchemas';
import { supabase } from '../../lib/supabaseClient';
import AuthCard from '../../features/auth/components/AuthCard';
import SuccessState from '../../features/auth/components/SuccessState';
import { toast } from 'sonner';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MagicLinkInput>({
    resolver: zodResolver(magicLinkSchema)
  });

  const [sent, setSent] = useState(false);

  async function onSubmit(data: MagicLinkInput) {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email: data.email, options: { emailRedirectTo: window.location.origin + '/auth/callback' } });
      if (error) {
        toast.error(error.message || 'Unable to send magic link');
      } else {
        setSent(true);
        toast.success('Magic link sent — check your inbox');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Unexpected error');
    }
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/auth/callback' } });
    if (error) toast.error(error.message || 'Google sign-in failed');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <AuthCard title="Sign in to VisaFlow" subtitle="Fast, secure access for your team">
        {sent ? (
          <SuccessState emailSent />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Email</span>
              <input
                {...register('email')}
                type="email"
                className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@company.com"
                aria-label="Email"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
            </label>

            <div className="flex gap-3 items-center">
              <button
                type="submit"
                className="flex-1 inline-flex justify-center items-center rounded-lg bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-white font-medium shadow-md motion-safe:transform motion-safe:active:scale-95"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send Magic Link'}
              </button>
              <button type="button" onClick={signInWithGoogle} className="inline-flex items-center gap-2 px-3 py-2 bg-white/6 rounded-lg text-white">
                Sign in with Google
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-1">By continuing, you agree to VisaFlow's Terms.</p>
          </form>
        )}
      </AuthCard>
    </div>
  );
}
