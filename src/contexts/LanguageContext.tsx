import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'english' | 'hindi' | 'telugu' | 'tamil' | 'malayalam' | 'kannada';

interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translations = {
  // Header
  medicines: {
    english: 'Medicines',
    hindi: 'दवाएं',
    telugu: 'మందులు',
    tamil: 'மருந்துகள்',
    malayalam: 'മരുന്നുകൾ',
    kannada: 'ಔಷಧಗಳು'
  },
  consultDoctor: {
    english: 'Consult Doctor',
    hindi: 'डॉक्टर से सलाह',
    telugu: 'వైద్యుడిని సంప్రదించండి',
    tamil: 'மருத்துவரை அணுகவும்',
    malayalam: 'ഡോക്ടറെ കാണുക',
    kannada: 'ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ'
  },
  deliveryPartners: {
    english: 'Delivery Partners',
    hindi: 'डिलीवरी पार्टनर',
    telugu: 'డెలివరీ భాగస్వాములు',
    tamil: 'டெலிவரி பார்ட்னர்கள்',
    malayalam: 'ഡെലിവറി പാർട്ണർമാർ',
    kannada: 'ವಿತರಣಾ ಪಾಲುದಾರರು'
  },
  emergency: {
    english: 'Emergency',
    hindi: 'आपातकाल',
    telugu: 'అత్యవసరం',
    tamil: 'அவசரநிலை',
    malayalam: 'അത്യാവശ്യം',
    kannada: 'ತುರ್ತುಸ್ಥಿತಿ'
  },
  // Home page
  heroTitle: {
    english: 'Healthcare Delivered to Your Village',
    hindi: 'आपके गांव में स्वास्थ्य सेवा',
    telugu: 'మీ గ్రామానికి ఆరోగ్య సేవ',
    tamil: 'உங்கள் கிராமத்திற்கு சுகாதார சேवை',
    malayalam: 'നിങ്ങളുടെ ഗ്രാമത്തിലേക്ക് ആരോഗ്യ സേവ',
    kannada: 'ನಿಮ್ಮ ಹಳ್ಳಿಗೆ ಆರೋಗ್ಯ ಸೇವೆ'
  },
  heroDescription: {
    english: 'Get medicines and doctor consultations delivered right to your doorstep. Quality healthcare for rural communities.',
    hindi: 'दवाएं और डॉक्टर की सलाह सीधे आपके घर तक पहुंचाएं। ग्रामीण समुदायों के लिए गुणवत्तापूर्ण स्वास्थ्य सेवा।',
    telugu: 'మందులు మరియు వైద్య సలహలను మీ ఇంటి వరకు పొందండి. గ్రామీణ సమాజాలకు నాణ్యమైన ఆరోగ్య సేవ.',
    tamil: 'மருந்துகள் மற்றும் மருத்துவர் ஆலோசனைகளை உங்கள் வீட்டு வாசலுக்கே பெறுங்கள். கிராமப்புற சமூகங்களுக்கான தரமான சுகாதார சேவை.',
    malayalam: 'മരുന്നുകളും ഡോക്ടറുടെ ഉപദേശവും നിങ്ങളുടെ വീട്ടുവാതിലിൽ എത്തിച്ചു നൽകുന്നു. ഗ്രാമീണ സമൂഹങ്ങൾക്കുള്ള ഗുണനിലവാരമുള്ള ആരോഗ്യ സേവ.',
    kannada: 'ಔಷಧಗಳು ಮತ್ತು ವೈದ್ಯರ ಸಲಹೆಗಳನ್ನು ನಿಮ್ಮ ಮನೆಯ ಬಾಗಿಲಿಗೆ ತಲುಪಿಸುತ್ತೇವೆ. ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಿಗೆ ಗುಣಮಟ್ಟದ ಆರೋಗ್ಯ ಸೇವೆ.'
  },
  orderMedicines: {
    english: 'Order Medicines',
    hindi: 'दवा ऑर्डर करें',
    telugu: 'మందులు ఆర్డర్ చేయండి',
    tamil: 'மருந்துகளை ஆர்டர் செய்யுங்கள்',
    malayalam: 'മരുന്നുകൾ ഓർഡർ ചെയ്യുക',
    kannada: 'ಔಷಧಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಿ'
  },
  // Cart
  cart: {
    english: 'Cart',
    hindi: 'कार्ट',
    telugu: 'కార్ట్',
    tamil: 'கார்ட்',
    malayalam: 'കാർട്ട്',
    kannada: 'ಕಾರ್ಟ್'
  },
  deliveryAddress: {
    english: 'Delivery Address',
    hindi: 'डिलीवरी पता',
    telugu: 'డెలివరీ చిరునామా',
    tamil: 'டெலிவரி முகவரி',
    malayalam: 'ഡെലివറി വിലാസം',
    kannada: 'ವಿತರಣಾ ವಿಳಾಸ'
  },
  paymentMethod: {
    english: 'Payment Method',
    hindi: 'भुगतान विधि',
    telugu: 'చెల్లింపు పద్ధతి',
    tamil: 'பணம் செலுத்தும் முறை',
    malayalam: 'പേയ്മെന്റ് രീതി',
    kannada: 'ಪಾವತಿ ವಿಧಾನ'
  },
  placeOrder: {
    english: 'Place Order',
    hindi: 'ऑर्डर दें',
    telugu: 'ఆర్డర్ ఇవ్వండి',
    tamil: 'ஆர்டர் செய்யுங்கள்',
    malayalam: 'ഓർഡർ ചെയ്യുക',
    kannada: 'ಆರ್ಡರ್ ಮಾಡಿ'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};