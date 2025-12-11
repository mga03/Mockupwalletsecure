import { ArrowLeft, Phone, Trash2, Edit, Calendar, Building2, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface InsuranceDetailProps {
  insuranceId: string;
  onBack: () => void;
  onEdit: () => void;
}

export const InsuranceDetail = ({ insuranceId, onBack, onEdit }: InsuranceDetailProps) => {
  const { insurances, deleteInsurance } = useApp();
  const insurance = insurances.find(ins => ins.id === insuranceId);

  if (!insurance) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Seguro no encontrado</p>
      </div>
    );
  }

  const handleDelete = () => {
    deleteInsurance(insuranceId);
    toast.success('Seguro eliminado correctamente');
    onBack();
  };

  const handleCall = () => {
    if (insurance.phoneNumber) {
      toast.success(`Llamando a ${insurance.phoneNumber}...`);
      // In a real app: window.location.href = `tel:${insurance.phoneNumber}`;
    } else {
      toast.error('No hay número de teléfono registrado');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const isExpired = (date: Date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1>Detalle del Seguro</h1>
          </div>
          <Button
            onClick={onEdit}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-800"
          >
            <Edit className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Image */}
        {insurance.imageUrl && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={insurance.imageUrl}
              alt={insurance.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Main Info */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-gray-900 mb-1">{insurance.title}</h2>
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                isExpired(insurance.expiryDate)
                  ? 'bg-red-100 text-red-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {isExpired(insurance.expiryDate) ? 'Vencido' : 'Activo'}
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Compañía</p>
                <p className="text-gray-900">{insurance.company}</p>
              </div>
            </div>

            {insurance.policyNumber && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Número de Póliza</p>
                  <p className="text-gray-900">{insurance.policyNumber}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Fecha de Vencimiento</p>
                <p className="text-gray-900">{formatDate(insurance.expiryDate)}</p>
              </div>
            </div>

            {insurance.phoneNumber && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono de Asistencia</p>
                  <p className="text-gray-900">{insurance.phoneNumber}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {insurance.phoneNumber && (
            <Button
              onClick={handleCall}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar a Asistencia
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full py-6"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Borrar Seguro
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminará permanentemente este seguro de tu Wallet Secure.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
