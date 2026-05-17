import { Button } from "@/components/ui/button";
import { Phone, Pill, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-healthcare.jpg";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Rural healthcare delivery" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              {t('heroDescription')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/medicines">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-4 w-full sm:w-auto">
                  <Pill className="mr-2 h-5 w-5" />
                  {t('orderMedicines')}
                </Button>
              </Link>
              <Link to="/doctors">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4 w-full sm:w-auto"
                >
                  <Video className="mr-2 h-5 w-5" />
                  {t('consultDoctor')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Phone Call Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8 max-w-sm w-full">
              <div className="text-center">
                <div className="bg-success rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-success-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">Need Help Ordering?</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Our trained staff can help you place orders over the phone
                </p>
                <div className="bg-success rounded-lg p-4 mb-4">
                  <p className="text-success-foreground font-bold text-2xl">1800-123-4567</p>
                  <p className="text-success-foreground text-sm">Free | 24/7 Available</p>
                </div>
                <a href="tel:1800-123-4567" className="w-full">
                  <Button 
                    size="lg" 
                    className="w-full bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;