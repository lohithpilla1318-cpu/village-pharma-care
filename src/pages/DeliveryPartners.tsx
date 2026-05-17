import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Star, Clock, Truck, Users } from "lucide-react";
import Header from "@/components/Header";

const deliveryPartners = [
  {
    id: 1,
    name: "Lakshmi ASHA Worker",
    location: "Ramachandrapuram Village",
    area: "Within 5km radius",
    phone: "+91 98765 43210",
    rating: 4.9,
    deliveries: 340,
    languages: ["Telugu", "Hindi"],
    availability: "Mon-Sat 8AM-6PM",
    verified: true,
    type: "ASHA Worker"
  },
  {
    id: 2,
    name: "Ravi Medical Delivery",
    location: "Kakinada Rural",
    area: "10km coverage area",
    phone: "+91 98765 43211",
    rating: 4.8,
    deliveries: 290,
    languages: ["Telugu", "English"],
    availability: "Daily 7AM-8PM",
    verified: true,
    type: "Medical Courier"
  },
  {
    id: 3,
    name: "Priya Health Helper",
    location: "Peddapuram Block",
    area: "Rural health coverage",
    phone: "+91 98765 43212",
    rating: 4.9,
    deliveries: 215,
    languages: ["Telugu", "Tamil"],
    availability: "Mon-Sat 9AM-5PM",
    verified: true,
    type: "ASHA Worker"
  }
];

const DeliveryPartners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 py-8 bg-gradient-to-r from-primary to-primary-dark rounded-2xl text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Trusted Delivery Partners</h1>
          <p className="text-xl mb-6">ASHA workers and medical couriers bringing healthcare to your doorstep</p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Users className="mr-1 h-4 w-4" />
              Community Verified
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Truck className="mr-1 h-4 w-4" />
              Same Day Delivery
            </Badge>
          </div>
        </div>

        {/* Delivery Coverage Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <p className="text-muted-foreground">Villages Covered</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">200+</div>
            <p className="text-muted-foreground">ASHA Workers</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <p className="text-muted-foreground">On-Time Delivery</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-muted-foreground">Emergency Support</p>
          </Card>
        </div>

        {/* Available Delivery Partners */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Available in Your Area</h2>
          <p className="text-muted-foreground mb-8">Our trusted network of ASHA workers and medical delivery partners</p>
          
          <div className="space-y-6">
            {deliveryPartners.map((partner) => (
              <Card key={partner.id} className="p-6">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  {/* Partner Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{partner.name}</h3>
                      {partner.verified && (
                        <Badge className="bg-success text-success-foreground">
                          <Users className="mr-1 h-3 w-3" />
                          Verified {partner.type}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{partner.location} • {partner.area}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="font-medium">{partner.rating}</span>
                      <span className="text-sm text-muted-foreground">({partner.deliveries} deliveries)</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {partner.languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-success" />
                      <span>Available: {partner.availability}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="text-center">
                    <div className="text-lg font-bold mb-2">Direct Contact</div>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{partner.phone}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Call for delivery updates
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <Button className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Partner
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      View Coverage
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Become a Partner Section */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary-dark/5 border-primary/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Become a Delivery Partner</h2>
            <p className="text-muted-foreground mb-6">
              Join our network of ASHA workers and help deliver healthcare to rural communities
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">₹5,000-15,000</div>
                <div className="text-sm text-muted-foreground">Monthly earnings</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">Flexible Hours</div>
                <div className="text-sm text-muted-foreground">Work on your schedule</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">Community Impact</div>
                <div className="text-sm text-muted-foreground">Help your neighbors</div>
              </div>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Apply to Join Network
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryPartners;