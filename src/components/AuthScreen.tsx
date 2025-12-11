import { useState } from 'react';
import { Shield, Mail, Lock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, register } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showForgotPassword) {
      toast.success('Se ha enviado un enlace de recuperación a tu correo');
      setShowForgotPassword(false);
      return;
    }

    if (isLogin) {
      const success = login(email, password);
      if (success) {
        toast.success('¡Bienvenido a Wallet Secure!');
      } else {
        toast.error('Credenciales incorrectas');
      }
    } else {
      if (!name || !email || !password) {
        toast.error('Por favor completa todos los campos');
        return;
      }
      const success = register(email, password, name);
      if (success) {
        toast.success('¡Cuenta creada exitosamente!');
      } else {
        toast.error('El usuario ya existe');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <Shield className="w-16 h-16 text-blue-900 mb-2" />
            <h1 className="text-blue-900">Wallet Secure</h1>
          </div>

          {showForgotPassword ? (
            <>
              <h2 className="text-blue-900 mb-6">Recuperar Contraseña</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
                  Enviar Enlace
                </Button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-sm text-blue-900 hover:underline"
                >
                  Volver al inicio de sesión
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-blue-900 mb-6">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-900 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}

                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
                  {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </Button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setName('');
                      setEmail('');
                      setPassword('');
                    }}
                    className="text-sm text-blue-900 hover:underline"
                  >
                    {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                  </button>
                </div>
              </form>

              <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  <strong>Demo:</strong> demo@walletsecure.com / demo123
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
