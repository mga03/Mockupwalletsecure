import { useState } from 'react';
import { LogOut, Plus, Car, Heart, Home, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { InsuranceCategory } from '../types';

interface HomeScreenProps {
  onAddNew: () => void;
  onViewDetail: (id: string) => void;
}

export const HomeScreen = ({ onAddNew, onViewDetail }: HomeScreenProps) => {
  const { user, insurances, logout } = useApp();

  const getCategoryIcon = (category: InsuranceCategory) => {
    switch (category) {
      case 'coche':
        return <Car className="w-8 h-8 text-blue-900" />;
      case 'salud':
        return <Heart className="w-8 h-8 text-blue-900" />;
      case 'casa':
        return <Home className="w-8 h-8 text-blue-900" />;
      case 'electronica':
        return <Smartphone className="w-8 h-8 text-blue-900" />;
    }
  };

  const isExpired = (date: Date) => {
    return new Date(date) < new Date();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1>Mis Seguros</h1>
            <p className="text-blue-200 text-sm mt-1">
              Hola, {user?.name}
            </p>
          </div>
          <Button
            onClick={logout}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-800"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Insurance Cards */}
      <div className="max-w-4xl mx-auto p-4 pb-24">
        {insurances.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tienes seguros registrados</p>
            <p className="text-gray-400 text-sm mt-2">
              Pulsa el botón + para añadir uno nuevo
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {insurances.map((insurance) => {
              const expired = isExpired(insurance.expiryDate);
              return (
                <div
                  key={insurance.id}
                  onClick={() => onViewDetail(insurance.id)}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      {getCategoryIcon(insurance.category)}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${expired ? 'bg-red-500' : 'bg-emerald-400'}`} />
                  </div>

                  <h3 className="text-gray-900 mb-1">{insurance.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{insurance.company}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      Vence: {formatDate(insurance.expiryDate)}
                    </span>
                    {expired && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                        Vencido
                      </span>
                    )}
                    {!expired && (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                        Activo
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onAddNew}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
