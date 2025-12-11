import { useEffect } from 'react';
import { Shield } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center">
      <div className="animate-pulse">
        <Shield className="w-24 h-24 text-emerald-400" strokeWidth={1.5} />
      </div>
      <h1 className="text-white mt-6 tracking-wide">Wallet Secure</h1>
      <p className="text-blue-200 mt-2">Tus seguros, siempre seguros</p>
      <div className="mt-12">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
