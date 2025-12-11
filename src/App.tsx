import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { InsuranceForm } from './components/InsuranceForm';
import { InsuranceDetail } from './components/InsuranceDetail';
import { Toaster } from './components/ui/sonner';

type Screen = 'splash' | 'auth' | 'home' | 'form' | 'detail';

function AppContent() {
  const { user, insurances } = useApp();
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSplashComplete = () => {
    setCurrentScreen('auth');
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setSelectedInsuranceId(null);
    setCurrentScreen('form');
  };

  const handleViewDetail = (id: string) => {
    setSelectedInsuranceId(id);
    setCurrentScreen('detail');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentScreen('form');
  };

  const handleBackToHome = () => {
    setSelectedInsuranceId(null);
    setIsEditing(false);
    setCurrentScreen('home');
  };

  // Auto navigate to home after login
  if (user && currentScreen === 'auth') {
    setCurrentScreen('home');
  }

  // Auto navigate to auth after logout
  if (!user && currentScreen !== 'auth' && currentScreen !== 'splash') {
    setCurrentScreen('auth');
  }

  const selectedInsurance = selectedInsuranceId
    ? insurances.find(ins => ins.id === selectedInsuranceId)
    : undefined;

  return (
    <>
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      
      {currentScreen === 'auth' && (
        <AuthScreen />
      )}
      
      {currentScreen === 'home' && user && (
        <HomeScreen onAddNew={handleAddNew} onViewDetail={handleViewDetail} />
      )}
      
      {currentScreen === 'form' && user && (
        <InsuranceForm
          onBack={handleBackToHome}
          editingInsurance={isEditing ? selectedInsurance : undefined}
        />
      )}
      
      {currentScreen === 'detail' && user && selectedInsuranceId && (
        <InsuranceDetail
          insuranceId={selectedInsuranceId}
          onBack={handleBackToHome}
          onEdit={handleEdit}
        />
      )}
      
      <Toaster position="top-center" />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
