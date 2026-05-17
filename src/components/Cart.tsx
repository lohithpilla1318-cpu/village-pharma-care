import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";  
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Trash2, ShoppingCart, Check, MapPin, Home, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  tablets?: number;
  capsules?: number;
  prescriptionRequired: boolean;
}

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClose: () => void;
}

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClose }: CartProps) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState({
    houseNo: "",
    buildingName: "",
    landmark: "",
    pincode: ""
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = subtotal - total;

  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery", icon: "💵" },
    { id: "upi", name: "UPI", icon: "📱" },
    { id: "phonepe", name: "PhonePe", icon: "💜" },
    { id: "paytm", name: "Paytm", icon: "💙" },
    { id: "gpay", name: "Google Pay", icon: "🔵" },
  ];

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    toast({
      title: "Order Placed Successfully!",
      description: "Your medicines will be delivered soon.",
    });
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-success mb-2">Order Placed!</h2>
          <p className="text-muted-foreground mb-6">
            Your order has been confirmed and will be delivered within 2-3 days.
          </p>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Order Total:</span>
              <span className="font-bold">₹{total}</span>
            </div>
            <div className="flex justify-between text-success">
              <span>You Saved:</span>
              <span className="font-bold">₹{savings}</span>
            </div>
          </div>
          <Button onClick={onClose} className="w-full">
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some medicines to get started</p>
          <Button onClick={onClose}>Continue Shopping</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t('cart')}</h2>
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {item.prescriptionRequired && (
                        <Badge variant="destructive" className="text-xs">Prescription Required</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {item.tablets ? `${item.tablets} tablets` : `${item.capsules} capsules`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-primary">₹{item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Price Summary */}
          <div className="space-y-3 my-6">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-success font-bold">
              <span>You Save:</span>
              <span>-₹{savings}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          <Separator />

          {/* Delivery Address */}
          <div className="my-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Delivery Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="houseNo" className="text-sm font-medium">House/Flat No.*</Label>
                <Input
                  id="houseNo"
                  placeholder="H.No 123, Flat 2B"
                  value={address.houseNo}
                  onChange={(e) => setAddress(prev => ({ ...prev, houseNo: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="buildingName" className="text-sm font-medium">Building/Area Name</Label>
                <Input
                  id="buildingName"
                  placeholder="Sri Venkateswara Apartments"
                  value={address.buildingName}
                  onChange={(e) => setAddress(prev => ({ ...prev, buildingName: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="landmark" className="text-sm font-medium">Near Landmark*</Label>
                <Input
                  id="landmark"
                  placeholder="Near Primary School, Temple"
                  value={address.landmark}
                  onChange={(e) => setAddress(prev => ({ ...prev, landmark: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pincode" className="text-sm font-medium">Pincode*</Label>
                <Input
                  id="pincode"
                  placeholder="533003"
                  value={address.pincode}
                  onChange={(e) => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Methods */}
          <div className="my-6">
            <h3 className="font-bold mb-4">{t('paymentMethod')}</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer flex-1">
                    <span className="text-lg">{method.icon}</span>
                    <span>{method.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Place Order Button */}
          <Button 
            onClick={handlePlaceOrder} 
            className="w-full h-12 text-lg"
            size="lg"
          >
            {t('placeOrder')} - ₹{total}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Cart;