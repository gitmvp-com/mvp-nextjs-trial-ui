"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { TypewriterEffect } from '@/components/TypewriterEffect';
import { FaGithub, FaDiscord, FaProductHunt, FaXTwitter } from 'react-icons/fa6';
import { Lock, CreditCard, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link as ScrollLink } from 'react-scroll';
import { VideoModal } from '@/components/VideoModal';

const workflowSteps = [
  { title: "Step One", description: "First step of your workflow" },
  { title: "Step Two", description: "Second step of your workflow" },
  { title: "Step Three", description: "Third step of your workflow" },
  { title: "Step Four", description: "Fourth step of your workflow" }
];

const platforms = [
  { name: 'GitHub', icon: FaGithub },
  { name: 'Discord', icon: FaDiscord },
  { name: 'Product Hunt', icon: FaProductHunt },
  { name: 'X (Twitter)', icon: FaXTwitter }
];

const workflowSections = [
  { id: "overview", title: "Overview", description: "Everything you need to build modern apps" },
  { id: "features", title: "Features", description: "Powerful features out of the box", metrics: [
    { label: "Components", value: "50+" },
    { label: "Dark Mode", value: "Built-in" },
    { label: "TypeScript", value: "100%" }
  ]},
  { id: "pricing", title: "Pricing", description: "Simple, transparent pricing" }
];

const featureCards = [
  { title: "Dark Mode", description: "Built-in theme management", icon: <Moon className="h-6 w-6 text-primary" /> },
  { title: "Trial System", description: "48-hour trial period", icon: <Lock className="h-6 w-6 text-primary" /> },
  { title: "No Setup", description: "No backend required", icon: <CreditCard className="h-6 w-6 text-primary" /> }
];

export default function LandingPage() {
  const { user } = useAuth();
  const { isInTrial } = useTrialStatus();
  const [activeSection, setActiveSection] = useState("overview");
  const router = useRouter();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] relative">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-darker/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 overflow-x-auto hide-scrollbar">
            {workflowSections.map((section, index) => (
              <ScrollLink
                key={section.id}
                to={section.id}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onSetActive={() => setActiveSection(section.id)}
                className="flex items-center cursor-pointer group min-w-fit mx-4 first:ml-0 last:mr-0"
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-primary dark:bg-primary-light text-white' 
                    : 'bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light group-hover:bg-primary/20'
                }`}>
                  {index + 1}
                </span>
                <span className={`text-sm font-medium transition-colors duration-300 hidden md:block whitespace-nowrap ${
                  activeSection === section.id 
                    ? 'text-primary dark:text-primary-light' 
                    : 'text-slate-600 dark:text-slate-300 group-hover:text-primary'
                }`}>
                  {section.title}
                </span>
              </ScrollLink>
            ))}
          </div>
        </div>
      </nav>

      <div id="overview" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-20 pb-16 sm:pb-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                <span className="block">Next.js MVP Template</span>
                <span className="block text-primary dark:text-primary-light">Production-Ready UI</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                Start building with fake authentication and trial system in minutes.
              </p>
              
              <div className="mt-10 flex gap-4 justify-center">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Watch Demo
                </button>
                <button 
                  onClick={() => router.push('/login')} 
                  className="px-8 py-3 bg-white dark:bg-neutral-dark hover:bg-slate-50 dark:hover:bg-neutral-darker text-primary dark:text-primary-light border-2 border-primary dark:border-primary-light rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Try It Now
                </button>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative">
                <pre className="relative rounded-xl bg-slate-900 p-8 shadow-2xl">
                  <code className="text-sm sm:text-base text-slate-100">
                    <TypewriterEffect text={`// Simple fake auth
import { useFakeAuth } from '@/hooks';

export const App = () => {
  const { user, login } = useFakeAuth();
  
  return (
    <div>
      {user ? '✅ Logged in!' : '👋 Welcome'}
    </div>
  );
}`} />
                  </code>
                </pre>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 1, y: 0 }}
                    className="relative p-4 bg-white/5 dark:bg-neutral-dark border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm rounded-xl shadow-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary dark:bg-primary-light text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="ml-8">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {workflowSections.slice(1).map((section) => (
        <motion.section
          key={section.id}
          id={section.id}
          className="py-20 bg-white dark:bg-[#0B1120]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          onViewportEnter={() => setActiveSection(section.id)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{section.description}</p>
            </div>

            {section.metrics && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {section.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {section.id === "pricing" && (
              <div className="max-w-md mx-auto mt-8 bg-white dark:bg-neutral-dark rounded-xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-center mb-4">Free Trial</h3>
                <p className="text-center text-slate-600 dark:text-slate-300 mb-6">48-hour trial period included</p>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Start Free Trial
                </button>
              </div>
            )}
          </div>
        </motion.section>
      ))}

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="dQw4w9WgXcQ"
      />
    </div>
  );
}
