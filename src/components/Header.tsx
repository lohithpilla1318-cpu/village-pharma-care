import { Button } from "@/components/ui/button";
import { Phone, Heart, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-foreground" />
            <span className="text-xl font-bold text-primary-foreground">RuralCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/medicines" className="text-primary-foreground hover:text-accent transition-colors">
              {t('medicines')}
            </Link>
            <Link to="/doctors" className="text-blue-300 hover:text-blue-100 transition-colors font-medium">
              {t('consultDoctor')}
            </Link>
            <Link to="/delivery-partners" className="text-primary-foreground hover:text-accent transition-colors">
              {t('deliveryPartners')}
            </Link>
            <a href="tel:1800-123-4567" className="text-primary-foreground hover:text-accent transition-colors">
              {t('emergency')}
            </a>
          </nav>

          {/* Phone Number & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:1800-123-4567" className="flex items-center space-x-2 bg-primary-foreground/10 rounded-lg px-3 py-1 hover:bg-primary-foreground/20 transition-colors">
              <Phone className="h-4 w-4 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">1800-123-4567</span>
            </a>
            <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
              <SelectTrigger className="w-32 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
                <SelectItem value="telugu">తెలుగు</SelectItem>
                <SelectItem value="tamil">தமிழ்</SelectItem>
                <SelectItem value="malayalam">മലയാളം</SelectItem>
                <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/20">
            <nav className="flex flex-col space-y-4">
              <Link to="/medicines" className="text-primary-foreground hover:text-accent transition-colors">
                {t('medicines')}
              </Link>
              <Link to="/doctors" className="text-blue-300 hover:text-blue-100 transition-colors font-medium">
                {t('consultDoctor')}
              </Link>
              <Link to="/delivery-partners" className="text-primary-foreground hover:text-accent transition-colors">
                {t('deliveryPartners')}
              </Link>
              <a href="tel:1800-123-4567" className="text-primary-foreground hover:text-accent transition-colors">
                {t('emergency')}
              </a>
              <a href="tel:1800-123-4567" className="flex items-center space-x-2 pt-2">
                <Phone className="h-4 w-4 text-primary-foreground" />
                <span className="text-primary-foreground font-medium">1800-123-4567</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;