import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function AuthCard({ title = 'Welcome back', subtitle = '', children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="w-full max-w-md bg-gradient-to-b from-white/6 to-white/4 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/6 mx-4"
    >
      <header className="mb-4">
        <h2 className="text-lg md:text-2xl font-semibold text-white leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-300 mt-1">{subtitle}</p>}
      </header>

      <main className="space-y-4">{children}</main>

      <footer className="mt-6 text-center text-xs text-slate-400">Need help? Contact support@visaflow.example</footer>
    </motion.div>
  );
}
