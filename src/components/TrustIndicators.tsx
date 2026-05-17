import { Shield, CheckCircle, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Shield,
      title: "Government Approved",
      description: "All medicines from licensed pharmacies",
      color: "text-success"
    },
    {
      icon: CheckCircle,
      title: "Verified Doctors",
      description: "Qualified healthcare professionals",
      color: "text-primary"
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description: "Fixed routes, confirmed delivery",
      color: "text-warning"
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className={`${indicator.color} mb-4 flex justify-center`}>
                <indicator.icon className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-bold mb-2">{indicator.title}</h3>
              <p className="text-muted-foreground">{indicator.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;