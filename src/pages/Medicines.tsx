import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, ShoppingCart, Phone, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 15,
    originalPrice: 20,
    description: "For fever, headache, and body pain",
    rating: 4.8,
    reviews: 194,
    inStock: true,
    prescriptionRequired: false,
    tablets: 10
  },
  {
    id: 2,
    name: "Metformin 500mg",
    category: "Diabetes",
    price: 45,
    originalPrice: 50,
    description: "For diabetes management",
    rating: 4.7,
    reviews: 124,
    inStock: true,
    prescriptionRequired: true,
    tablets: 10
  },
  {
    id: 3,
    name: "Amlodipine 5mg",
    category: "Blood Pressure",
    price: 35,
    originalPrice: 40,
    description: "For high blood pressure control",
    rating: 4.6,
    reviews: 124,
    inStock: true,
    prescriptionRequired: true,
    tablets: 10
  },
  {
    id: 4,
    name: "Cetirizine 10mg",
    category: "Allergy",
    price: 25,
    originalPrice: 30,
    description: "For allergy and cold symptoms",
    rating: 4.5,
    reviews: 124,
    inStock: true,
    prescriptionRequired: false,
    tablets: 10
  },
  {
    id: 5,
    name: "Omeprazole 20mg",
    category: "Acidity",
    price: 30,
    originalPrice: 35,
    description: "For acidity and stomach problems",
    rating: 4.4,
    reviews: 124,
    inStock: false,
    prescriptionRequired: false,
    capsules: 10
  },
  {
    id: 6,
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    price: 55,
    originalPrice: 60,
    description: "For bacterial infections",
    rating: 4.9,
    reviews: 124,
    inStock: true,
    prescriptionRequired: true,
    capsules: 10
  }
];

const categories = ["All", "Pain Relief", "Diabetes", "Blood Pressure", "Allergy", "Acidity", "Antibiotic"];

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

const Medicines = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  const filteredMedicines = medicines.filter(medicine => {
    const matchesCategory = selectedCategory === "All" || medicine.category === selectedCategory;
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (medicineId: number) => {
    const medicine = medicines.find(m => m.id === medicineId);
    if (!medicine) return;

    const existingItem = cartItems.find(item => item.id === medicineId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === medicineId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        originalPrice: medicine.originalPrice,
        quantity: 1,
        tablets: medicine.tablets,
        capsules: medicine.capsules,
        prescriptionRequired: medicine.prescriptionRequired,
      };
      setCartItems([...cartItems, newItem]);
    }

    toast({
      title: "Added to Cart",
      description: `${medicine.name} has been added to your cart.`,
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const isInCart = (medicineId: number) => {
    return cartItems.some(item => item.id === medicineId);
  };

  const getCartItemQuantity = (medicineId: number) => {
    const item = cartItems.find(item => item.id === medicineId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Essential Medicines</h1>
            <p className="text-muted-foreground">Order medicines and get them delivered to your village</p>
          </div>
          <div className="flex gap-4">
            <Link to="/subscriptions">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Subscriptions
              </Button>
            </Link>
            {cartItems.length > 0 && (
              <Button 
                onClick={() => setShowCart(true)}
                className="relative"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart ({cartItems.length})
                <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search medicines..."
              className="pl-10 text-lg py-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{medicine.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{medicine.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{medicine.category}</Badge>
                    {medicine.prescriptionRequired && (
                      <Badge variant="destructive">Prescription Required</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm">{medicine.rating} ({medicine.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{medicine.price}</div>
                  {medicine.originalPrice > medicine.price && (
                    <div className="text-sm text-muted-foreground line-through">₹{medicine.originalPrice}</div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {medicine.tablets ? `${medicine.tablets} tablets` : `${medicine.capsules} capsules`}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {medicine.inStock ? (
                  <Button
                    className="flex-1"
                    onClick={() => addToCart(medicine.id)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isInCart(medicine.id) ? `In Cart (${getCartItemQuantity(medicine.id)})` : "Add to Cart"}
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1" disabled>
                    Out of Stock
                  </Button>
                )}
                <Badge className={medicine.inStock ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                  {medicine.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Need Help Section */}
        <Card className="p-8 bg-primary/5 border-primary">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help Ordering?</h3>
            <p className="text-muted-foreground mb-6">
              Our trained staff can help you place orders over the phone
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Phone className="mr-2 h-5 w-5" />
              Call 1800-123-4567
            </Button>
          </div>
        </Card>

        {/* Cart Modal */}
        {showCart && (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onClose={() => setShowCart(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Medicines;