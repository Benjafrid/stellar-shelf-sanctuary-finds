
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    updateQuantity(bookId, newQuantity);
    if (newQuantity === 0) {
      toast.success('Producto eliminado del carrito');
    }
  };

  const handleRemoveItem = (bookId: string) => {
    removeFromCart(bookId);
    toast.success('Producto eliminado del carrito');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al catálogo
              </Button>
            </Link>
            <h1 className="text-3xl font-playfair font-bold text-book-coffee">
              Carrito de Compras
            </h1>
          </div>

          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto text-book-coffee/30 mb-6" />
            <h2 className="text-2xl font-playfair font-semibold text-book-coffee mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-book-coffee/70 mb-8">
              Explora nuestro catálogo y encuentra tu próximo libro favorito
            </p>
            <Link to="/">
              <Button className="bg-book-coffee hover:bg-book-burgundy text-book-cream">
                Explorar catálogo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al catálogo
            </Button>
          </Link>
          <h1 className="text-3xl font-playfair font-bold text-book-coffee">
            Carrito de Compras
          </h1>
          <Badge variant="secondary" className="ml-4 bg-book-gold text-book-coffee">
            {getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.book.id} className="bg-book-cream border-book-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.book.coverUrl}
                        alt={`Portada de ${item.book.title}`}
                        className="w-20 h-28 object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-playfair font-semibold text-lg text-book-coffee mb-1">
                        {item.book.title}
                      </h3>
                      <p className="text-book-coffee/80 text-sm mb-2">
                        {item.book.author}
                      </p>
                      <Badge variant="secondary" className="bg-book-gold text-book-coffee text-xs mb-3">
                        {item.book.genre}
                      </Badge>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.book.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium text-book-coffee w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.book.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-book-coffee font-playfair">
                            ${(item.book.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-book-coffee/60">
                            ${item.book.price} c/u
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-book-coffee/60 hover:text-book-burgundy"
                      onClick={() => handleRemoveItem(item.book.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-book-cream border-book-gold/20 sticky top-8">
              <CardHeader>
                <CardTitle className="font-playfair text-book-coffee">
                  Resumen del pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-book-coffee">
                  <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'})</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-book-coffee">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                
                <hr className="border-book-gold/20" />
                
                <div className="flex justify-between text-xl font-bold text-book-coffee font-playfair">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full bg-book-coffee hover:bg-book-burgundy text-book-cream mt-6"
                  size="lg"
                  onClick={() => toast.success('¡Pedido realizado con éxito!')}
                >
                  Proceder al pago
                </Button>
                
                <Link to="/">
                  <Button variant="outline" className="w-full mt-2">
                    Continuar comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
