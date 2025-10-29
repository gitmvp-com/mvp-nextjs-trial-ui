import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useTrialStatus() {
  const { user } = useAuth();
  const [isInTrial, setIsInTrial] = useState(false);
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [trialTimeLeft, setTrialTimeLeft] = useState('');

  useEffect(() => {
    if (!user) {
      setIsInTrial(false);
      setIsTrialExpired(false);
      return;
    }

    const trialStartTime = localStorage.getItem('trialStartTime');
    
    if (!trialStartTime) {
      setIsInTrial(false);
      setIsTrialExpired(true);
      return;
    }

    const checkTrialStatus = () => {
      const startTime = new Date(trialStartTime);
      const now = new Date();
      const hoursPassed = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      const TRIAL_HOURS = 48;
      
      if (hoursPassed < TRIAL_HOURS) {
        setIsInTrial(true);
        setIsTrialExpired(false);
        
        const hoursLeft = Math.floor(TRIAL_HOURS - hoursPassed);
        const minutesLeft = Math.floor((TRIAL_HOURS - hoursPassed - hoursLeft) * 60);
        setTrialTimeLeft(`${hoursLeft}h ${minutesLeft}m left`);
      } else {
        setIsInTrial(false);
        setIsTrialExpired(true);
        setTrialTimeLeft('Expired');
      }
    };

    checkTrialStatus();
    const interval = setInterval(checkTrialStatus, 60000);

    return () => clearInterval(interval);
  }, [user]);

  return { isInTrial, isTrialExpired, trialTimeLeft };
}
