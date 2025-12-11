import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Calendar as CalendarIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { InsuranceCategory, Insurance } from '../types';
import { toast } from 'sonner@2.0.3';

interface InsuranceFormProps {
  onBack: () => void;
  editingInsurance?: Insurance;
}

export const InsuranceForm = ({ onBack, editingInsurance }: InsuranceFormProps) => {
  const { addInsurance, updateInsurance } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(editingInsurance?.title || '');
  const [company, setCompany] = useState(editingInsurance?.company || '');
  const [policyNumber, setPolicyNumber] = useState(editingInsurance?.policyNumber || '');
  const [category, setCategory] = useState<InsuranceCategory>(editingInsurance?.category || 'coche');
  const [expiryDate, setExpiryDate] = useState<Date>(editingInsurance?.expiryDate || new Date());
  const [phoneNumber, setPhoneNumber] = useState(editingInsurance?.phoneNumber || '');
  const [imageUrl, setImageUrl] = useState(editingInsurance?.imageUrl || '');
  const [imagePreview, setImagePreview] = useState(editingInsurance?.imageUrl || '');

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !company || !category) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const insuranceData = {
      title,
      company,
      policyNumber,
      category,
      expiryDate,
      phoneNumber,
      imageUrl
    };

    if (editingInsurance) {
      updateInsurance(editingInsurance.id, insuranceData);
      toast.success('Seguro actualizado correctamente');
    } else {
      addInsurance(insuranceData);
      toast.success('Seguro guardado en Wallet Secure');
    }

    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>{editingInsurance ? 'Editar Seguro' : 'Añadir Seguro'}</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
          {/* Image Upload */}
          <div>
            <Label>Foto de la Póliza</Label>
            <div
              onClick={handleImageClick}
              className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-900 transition-colors bg-gray-50"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Camera className="w-12 h-12 mb-2" />
                  <p>Toca para subir foto de la póliza</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">¿Qué estás asegurando? *</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Seguro Coche"
              required
              className="mt-1"
            />
          </div>

          {/* Company */}
          <div>
            <Label htmlFor="company">¿Con qué compañía? *</Label>
            <Input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Ej: Mapfre"
              required
              className="mt-1"
            />
          </div>

          {/* Policy Number */}
          <div>
            <Label htmlFor="policyNumber">Número de Póliza (Opcional)</Label>
            <Input
              id="policyNumber"
              type="text"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              placeholder="Ej: POL-2024-001"
              className="mt-1"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber">Teléfono de Asistencia (Opcional)</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Ej: +34 900 100 200"
              className="mt-1"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Categoría *</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as InsuranceCategory)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coche">🚗 Coche</SelectItem>
                <SelectItem value="salud">❤️ Salud</SelectItem>
                <SelectItem value="casa">🏠 Casa</SelectItem>
                <SelectItem value="electronica">📱 Electrónica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expiry Date */}
          <div>
            <Label>¿Cuándo vence? *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left mt-1"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? (
                    new Date(expiryDate).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={(date) => date && setExpiryDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 py-6 mt-8">
            {editingInsurance ? 'Actualizar en Wallet Secure' : 'Guardar en Wallet Secure'}
          </Button>
        </form>
      </div>
    </div>
  );
};
