
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al login después de 2 segundos
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Book className="h-16 w-16 text-amber-700 animate-pulse" />
          <h1 className="text-6xl font-bold text-amber-700 font-serif">
            ARS
          </h1>
        </div>
        <p className="text-xl text-amber-600 mb-4">
          Bienvenido a tu librería virtual
        </p>
        <div className="animate-pulse">
          <p className="text-sm text-gray-500">
            Redirigiendo...
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
