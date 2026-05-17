import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill, Video, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete healthcare solutions for rural communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Essential Medicines */}
          <Card className="p-8">
            <div className="text-primary mb-4">
              <Pill className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Essential Medicines</h3>
            <p className="text-muted-foreground mb-6">
              Common medicines for fever, pain, diabetes, blood pressure
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• Paracetamol, pain relief</li>
              <li>• Diabetes medications</li>
              <li>• Blood pressure tablets</li>
              <li>• Cold & cough medicines</li>
            </ul>
            <Link to="/medicines">
              <Button className="w-full">View All Medicines</Button>
            </Link>
          </Card>

          {/* Doctor Consultation */}
          <Card className="p-8">
            <div className="text-primary mb-4">
              <Video className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Doctor Consultation</h3>
            <p className="text-muted-foreground mb-6">
              Video calls and phone consultations with qualified doctors
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• Video consultation</li>
              <li>• Phone consultation</li>
              <li>• Prescription validation</li>
              <li>• Health guidance</li>
            </ul>
            <Link to="/doctors">
              <Button className="w-full">Book Consultation</Button>
            </Link>
          </Card>
        </div>

        {/* Emergency Support */}
        <Card className="p-8 bg-warning/10 border-warning">
          <div className="text-center">
            <div className="text-warning mb-4 flex justify-center">
              <Clock className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Emergency Support</h3>
            <p className="text-muted-foreground mb-6">
              24/7 emergency guidance and urgent medicine delivery
            </p>
            <ul className="space-y-2 mb-6 text-sm max-w-md mx-auto">
              <li>• 24/7 phone support</li>
              <li>• Emergency consultations</li>
              <li>• Urgent deliveries</li>
              <li>• First aid guidance</li>
            </ul>
            <a href="tel:1800-123-4567">
              <Button size="lg" className="bg-warning hover:bg-warning/90 text-warning-foreground">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Help
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ServicesSection;