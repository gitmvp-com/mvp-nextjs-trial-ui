'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('fakeUser');
    const onboardingStatus = localStorage.getItem('hasCompletedOnboarding');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (onboardingStatus) {
      setHasCompletedOnboarding(JSON.parse(onboardingStatus));
    }
    
    setIsLoading(false);
  }, []);

  const signInWithEmail = async (email: string) => {
    const fakeUser = {
      email,
      id: Math.random().toString(36).substring(7)
    };
    
    localStorage.setItem('fakeUser', JSON.stringify(fakeUser));
    
    const existingTrialStart = localStorage.getItem('trialStartTime');
    if (!existingTrialStart) {
      localStorage.setItem('trialStartTime', new Date().toISOString());
    }
    
    setUser(fakeUser);
  };

  const signOut = async () => {
    localStorage.removeItem('fakeUser');
    setUser(null);
  };

  const completeOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setHasCompletedOnboarding(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signInWithEmail,
      signOut,
      hasCompletedOnboarding,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
