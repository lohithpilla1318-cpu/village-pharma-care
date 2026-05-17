import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, Package, RefreshCw, Shield, Clock, Star, Check } from "lucide-react";
import Header from "@/components/Header";
import { useState } from "react";

const subscriptionPlans = [
  {
    id: 1,
    name: "Diabetes Care Pack",
    description: "Monthly supply of diabetes medicines",
    price: 150,
    originalPrice: 200,
    medicines: [
      { name: "Metformin 500mg", quantity: "60 tablets" },
      { name: "Glimepiride 2mg", quantity: "30 tablets" },
      { name: "Blood glucose strips", quantity: "50 strips" }
    ],
    frequency: "Monthly",
    savings: 600, // per year
    popular: true
  },
  {
    id: 2,
    name: "Blood Pressure Pack",
    description: "Regular BP medication delivery",
    price: 120,
    originalPrice: 160,
    medicines: [
      { name: "Amlodipine 5mg", quantity: "30 tablets" },
      { name: "Losartan 50mg", quantity: "30 tablets" }
    ],
    frequency: "Monthly",
    savings: 480,
    popular: false
  },
  {
    id: 3,
    name: "Heart Health Pack",
    description: "Comprehensive heart care medicines",
    price: 180,
    originalPrice: 240,
    medicines: [
      { name: "Atorvastatin 20mg", quantity: "30 tablets" },
      { name: "Aspirin 75mg", quantity: "30 tablets" },
      { name: "Metoprolol 50mg", quantity: "30 tablets" }
    ],
    frequency: "Monthly",
    savings: 720,
    popular: false
  },
  {
    id: 4,
    name: "Senior Care Pack",
    description: "Complete elderly care medicines",
    price: 200,
    originalPrice: 280,
    medicines: [
      { name: "Calcium + Vitamin D", quantity: "60 tablets" },
      { name: "Multivitamin", quantity: "30 tablets" },
      { name: "Joint pain relief", quantity: "30 tablets" }
    ],
    frequency: "Monthly",
    savings: 960,
    popular: false
  }
];

const Subscriptions = () => {
  const [activeSubscriptions, setActiveSubscriptions] = useState<number[]>([]);

  const toggleSubscription = (planId: number) => {
    setActiveSubscriptions(prev => 
      prev.includes(planId) 
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 py-8 bg-gradient-to-r from-primary to-primary-dark rounded-2xl text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Medicine Subscriptions</h1>
          <p className="text-xl mb-6">Never run out of your regular medicines with our auto-delivery service</p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <RefreshCw className="mr-1 h-4 w-4" />
              Auto Delivery
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Shield className="mr-1 h-4 w-4" />
              Save up to 30%
            </Badge>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Package className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Regular Delivery</h3>
            <p className="text-sm text-muted-foreground">Medicines delivered monthly to your doorstep</p>
          </Card>
          <Card className="p-6 text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Best Prices</h3>
            <p className="text-sm text-muted-foreground">Save 20-30% compared to regular purchases</p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Never Miss</h3>
            <p className="text-sm text-muted-foreground">Automatic reminders and refills</p>
          </Card>
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Flexible</h3>
            <p className="text-sm text-muted-foreground">Pause, modify or cancel anytime</p>
          </Card>
        </div>

        {/* Subscription Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Choose Your Subscription Plan</h2>
          <p className="text-muted-foreground mb-8">Select from our curated medicine packs for common chronic conditions</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={`p-6 relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₹{plan.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{plan.originalPrice}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">per {plan.frequency.toLowerCase()}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {plan.medicines.map((medicine, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-3 w-3 text-success" />
                        <span>{medicine.name} - {medicine.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <span className="text-success font-medium">Save ₹{plan.savings}/year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`subscription-${plan.id}`} className="text-sm">
                      {activeSubscriptions.includes(plan.id) ? 'Active' : 'Subscribe'}
                    </Label>
                    <Switch
                      id={`subscription-${plan.id}`}
                      checked={activeSubscriptions.includes(plan.id)}
                      onCheckedChange={() => toggleSubscription(plan.id)}
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    variant={activeSubscriptions.includes(plan.id) ? "outline" : "default"}
                  >
                    {activeSubscriptions.includes(plan.id) ? 'Manage Subscription' : 'Start Subscription'}
                  </Button>
                  <div className="text-xs text-muted-foreground text-center">
                    Next delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Subscriptions */}
        {activeSubscriptions.length > 0 && (
          <Card className="p-6 bg-gradient-to-r from-success/5 to-success-dark/5 border-success/20">
            <h3 className="text-xl font-bold mb-4">Your Active Subscriptions</h3>
            <div className="space-y-4">
              {activeSubscriptions.map(planId => {
                const plan = subscriptionPlans.find(p => p.id === planId);
                return plan ? (
                  <div key={planId} className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div>
                      <h4 className="font-medium">{plan.name}</h4>
                      <p className="text-sm text-muted-foreground">Next delivery in 7 days</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">₹{plan.price}/month</div>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                  </div>
                ) : null;
              })}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Monthly Savings:</span>
                  <span className="text-xl font-bold text-success">
                    ₹{activeSubscriptions.reduce((sum, planId) => {
                      const plan = subscriptionPlans.find(p => p.id === planId);
                      return sum + (plan ? plan.originalPrice - plan.price : 0);
                    }, 0)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;