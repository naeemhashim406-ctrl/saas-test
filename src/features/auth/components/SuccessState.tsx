import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function SuccessState({ emailSent = false }: { emailSent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="flex flex-col items-center justify-center gap-4 p-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 360, damping: 20 }}
        className="bg-green-500/10 rounded-full p-3"
      >
        <CheckCircle className="w-8 h-8 text-green-400" />
      </motion.div>

      <div className="text-center">
        <h3 className="text-white font-semibold">Check your inbox</h3>
        <p className="text-slate-300 text-sm">{emailSent ? 'A magic link has been sent to your email. Click it to finish signing in.' : 'Success'}</p>
      </div>
    </motion.div>
  );
}
