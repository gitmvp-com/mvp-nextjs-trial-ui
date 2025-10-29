import { Fragment, useState, useEffect, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface OnboardingTourProps {
  isFirstTime: boolean;
  onComplete: () => void;
}

interface Step {
  title: string;
  description: React.ReactNode;
}

export function OnboardingTour({ isFirstTime, onComplete }: OnboardingTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo<Step[]>(() => [
    {
      title: "Welcome to Your Dashboard",
      description: (
        <div className="flex flex-col gap-2">
          <p>This is your main dashboard where you can view all your metrics and activity.</p>
        </div>
      )
    },
    {
      title: "Monitor Your Metrics",
      description: (
        <div className="flex flex-col gap-2">
          <p>Keep track of important metrics like users, revenue, and growth rate.</p>
        </div>
      )
    },
    {
      title: "View Analytics",
      description: (
        <div className="flex flex-col gap-2">
          <p>The analytics section shows visual representations of your data.</p>
        </div>
      )
    },
    {
      title: "Track Recent Activity",
      description: (
        <div className="flex flex-col gap-2">
          <p>Stay updated with the latest activities and events in real-time.</p>
        </div>
      )
    }
  ], []);

  useEffect(() => {
    if (isFirstTime) {
      setIsOpen(true);
    }
  }, [isFirstTime]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsOpen(false);
    onComplete();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => {}} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-[400px] min-h-[250px] max-w-[calc(100%-2rem)]">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {steps[currentStep].title}
            </h2>

            <div className="min-h-[120px] mt-4">
              <div className="text-gray-600 dark:text-gray-300">
                {steps[currentStep].description}
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <button
                onClick={handlePrevious}
                className={`bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full ${currentStep === 0 ? 'invisible' : ''}`}
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {currentStep + 1} of {steps.length}
                </span>
                <button
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 ml-2 rounded-full"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
