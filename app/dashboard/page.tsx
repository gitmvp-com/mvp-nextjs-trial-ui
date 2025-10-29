"use client";

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { motion } from 'framer-motion';
import { Users, CreditCard, Activity, TrendingUp, PlusCircle, Clock, Settings, BarChart3 } from 'lucide-react';
import { OnboardingTour } from '@/components/OnboardingTour';

const dashboardMetrics = [
  { title: "Total Users", value: "1,234", change: "+12.3%", icon: <Users className="h-6 w-6 text-primary" />, trend: "up" },
  { title: "Revenue", value: "$12.4k", change: "+8.2%", icon: <CreditCard className="h-6 w-6 text-primary" />, trend: "up" },
  { title: "Active Sessions", value: "432", change: "-3.1%", icon: <Activity className="h-6 w-6 text-primary" />, trend: "down" },
  { title: "Growth Rate", value: "18.2%", change: "+2.4%", icon: <TrendingUp className="h-6 w-6 text-primary" />, trend: "up" }
];

const recentActivity = [
  { id: 1, action: "New user signup", timestamp: "2 minutes ago", icon: <PlusCircle className="h-4 w-4" /> },
  { id: 2, action: "Payment processed", timestamp: "15 minutes ago", icon: <CreditCard className="h-4 w-4" /> },
  { id: 3, action: "Settings updated", timestamp: "1 hour ago", icon: <Settings className="h-4 w-4" /> },
  { id: 4, action: "Session completed", timestamp: "2 hours ago", icon: <Clock className="h-4 w-4" /> }
];

export default function Dashboard() {
  const { user, hasCompletedOnboarding, completeOnboarding } = useAuth();
  const router = useRouter();
  const { isInTrial, trialTimeLeft, isTrialExpired } = useTrialStatus();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (isTrialExpired) {
      router.push('/trial-expired');
    }
  }, [user, isTrialExpired, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <OnboardingTour isFirstTime={!hasCompletedOnboarding} onComplete={completeOnboarding} />
      
      <div className="bg-white dark:bg-neutral-dark border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {isInTrial ? `Trial: ${trialTimeLeft}` : "Full Access"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 dark:bg-primary-light/10 rounded-lg">
                  {metric.icon}
                </div>
                <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{metric.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-neutral-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Analytics Overview</h3>
              <BarChart3 className="h-5 w-5 text-slate-400" />
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
              <p className="text-slate-400 dark:text-slate-500">Chart Placeholder</p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 text-sm"
                >
                  <div className="p-2 bg-primary/10 dark:bg-primary-light/10 rounded-lg">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white">{activity.action}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{activity.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
