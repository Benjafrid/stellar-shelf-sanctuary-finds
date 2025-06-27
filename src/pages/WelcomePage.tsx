
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
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Book className="h-16 w-16 text-book-coffee animate-scale-in" />
          <h1 className="text-6xl font-bold text-book-coffee font-playfair">
            ARS
          </h1>
        </div>
        <p className="text-xl text-book-coffee/70 mb-4">
          Bienvenido a tu librería virtual
        </p>
        <div className="animate-pulse">
          <p className="text-sm text-muted-foreground">
            Redirigiendo...
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
