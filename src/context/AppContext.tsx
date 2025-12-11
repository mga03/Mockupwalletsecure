import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Insurance, User } from '../types';

interface AppContextType {
  user: User | null;
  insurances: Insurance[];
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  addInsurance: (insurance: Omit<Insurance, 'id'>) => void;
  updateInsurance: (id: string, insurance: Omit<Insurance, 'id'>) => void;
  deleteInsurance: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { email: 'demo@walletsecure.com', password: 'demo123', name: 'Usuario Demo' }
  ]);
  const [insurances, setInsurances] = useState<Insurance[]>([
    {
      id: '1',
      title: 'Seguro Coche',
      company: 'Mapfre',
      policyNumber: 'POL-2024-001',
      category: 'coche',
      expiryDate: new Date('2025-12-15'),
      phoneNumber: '+34 900 100 200',
      imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400'
    },
    {
      id: '2',
      title: 'Seguro Salud',
      company: 'Sanitas',
      policyNumber: 'POL-2024-002',
      category: 'salud',
      expiryDate: new Date('2025-06-20'),
      phoneNumber: '+34 902 102 400',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400'
    },
    {
      id: '3',
      title: 'Seguro Hogar',
      company: 'AXA',
      policyNumber: 'POL-2024-003',
      category: 'casa',
      expiryDate: new Date('2025-03-10'),
      phoneNumber: '+34 900 123 123',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
    },
    {
      id: '4',
      title: 'Seguro Móvil',
      company: 'Apple Care',
      policyNumber: 'POL-2024-004',
      category: 'electronica',
      expiryDate: new Date('2024-11-01'),
      phoneNumber: '+34 900 150 503',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
    }
  ]);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    if (users.find(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser = { email, password, name };
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addInsurance = (insurance: Omit<Insurance, 'id'>) => {
    const newInsurance: Insurance = {
      ...insurance,
      id: Date.now().toString()
    };
    setInsurances([...insurances, newInsurance]);
  };

  const updateInsurance = (id: string, insurance: Omit<Insurance, 'id'>) => {
    setInsurances(insurances.map(ins => 
      ins.id === id ? { ...insurance, id } : ins
    ));
  };

  const deleteInsurance = (id: string) => {
    setInsurances(insurances.filter(ins => ins.id !== id));
  };

  return (
    <AppContext.Provider value={{
      user,
      insurances,
      login,
      register,
      logout,
      addInsurance,
      updateInsurance,
      deleteInsurance
    }}>
      {children}
    </AppContext.Provider>
  );
};
