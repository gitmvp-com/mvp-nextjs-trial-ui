'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrialExpiredPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B1120] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-neutral-dark rounded-xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Clock className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
          Trial Expired
        </h1>
        
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          Your 48-hour trial period has ended. In a real app, you would upgrade to continue using the service.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/')}
            className="w-full px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-medium"
          >
            Go to Home
          </button>
          
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
            className="w-full px-8 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-all font-medium"
          >
            Start New Trial
          </button>
        </div>
      </motion.div>
    </div>
  );
}
