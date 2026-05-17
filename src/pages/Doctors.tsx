import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, Clock, Shield, Star, Users } from "lucide-react";
import Header from "@/components/Header";
import VideoCall from "@/components/VideoCall";
import { useToast } from "@/hooks/use-toast";

const consultationTypes = [
  { type: "Video Call", icon: Video, price: "₹149", duration: "15 min", features: ["HD Video", "Screen Share", "Record Session"], buttonText: "Start Video Call", buttonVariant: "default" },
  { type: "Audio Call", icon: Phone, price: "₹99", duration: "15 min", features: ["Clear Audio", "Call Recording"], buttonText: "Start Audio Call", buttonVariant: "outline" },
  {
    type: "Emergency Consult",
    icon: Clock,
    price: "500",
    duration: "Immediate response",
    features: [
      "Available 24/7",
      "Immediate response",
      "Emergency guidance",
      "Connect within 5 mins"
    ],
    buttonText: "Emergency Call",
    buttonVariant: "destructive" as const
  }
];

const doctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "General Medicine",
    experience: "12 years experience",
    rating: 4.9,
    reviews: 340,
    languages: ["Hindi", "English"],
    availability: "Today 2:00 PM",
    price: 200,
    verified: true
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialization: "Diabetes & Heart",
    experience: "15 years experience",
    rating: 4.8,
    reviews: 290,
    languages: ["Hindi", "English", "Bengali"],
    availability: "Today 4:30 PM",
    price: 300,
    verified: true
  },
  {
    id: 3,
    name: "Dr. Meera Patel",
    specialization: "Women & Child Health",
    experience: "10 years experience",
    rating: 4.9,
    reviews: 215,
    languages: ["Hindi", "English", "Gujarati"],
    availability: "Tomorrow 10:00 AM",
    price: 250,
    verified: true
  }
];

const Doctors = () => {
  const [activeCall, setActiveCall] = useState<string | null>(null);
  const { toast } = useToast();

  const startVideoCall = (doctorName: string) => {
    setActiveCall(doctorName);
  };

  const startAudioCall = (doctorName: string) => {
    toast({
      title: "Audio Call Started",
      description: `Connecting with Dr. ${doctorName}...`,
    });
    // In a real app, this would initiate an audio call
  };

  const endCall = () => {
    setActiveCall(null);
  };

  if (activeCall) {
    return <VideoCall doctorName={activeCall} onEndCall={endCall} />;
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 py-8 bg-gradient-to-r from-primary to-primary-dark rounded-2xl text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Consult Qualified Doctors</h1>
          <p className="text-xl mb-6">Get medical advice from certified doctors via video call or phone</p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Shield className="mr-1 h-4 w-4" />
              Government Verified
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Shield className="mr-1 h-4 w-4" />
              Prescription Valid
            </Badge>
          </div>
        </div>

        {/* Consultation Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {consultationTypes.map((consultation, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4 flex justify-center">
                <consultation.icon className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">{consultation.type}</h3>
              <div className="text-2xl font-bold text-primary mb-1">₹{consultation.price}</div>
              <p className="text-sm text-muted-foreground mb-4">{consultation.duration}</p>
              <ul className="space-y-2 mb-6 text-sm">
                {consultation.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
                      <Button 
                        variant={consultation.buttonVariant as any} 
                        className="w-full"
                        onClick={() => consultation.type === "Video Call" ? startVideoCall("General Practitioner") : startAudioCall("General Practitioner")}
                      >
                        {consultation.buttonText}
                      </Button>
            </Card>
          ))}
        </div>

        {/* Available Doctors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
          <p className="text-muted-foreground mb-8">Choose from our verified panel of experienced doctors</p>
          
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="p-6">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  {/* Doctor Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{doctor.name}</h3>
                      {doctor.verified && (
                        <Badge className="bg-success text-success-foreground">
                          <Shield className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{doctor.specialization} • {doctor.experience}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex gap-1">
                      {doctor.languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Availability & Price */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">₹{doctor.price}</div>
                    <p className="text-sm text-muted-foreground mb-2">consultation</p>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-success" />
                      <span>Next available: {doctor.availability}</span>
                    </div>
                  </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => startVideoCall(doctor.name)}>
                        <Video className="h-4 w-4 mr-1" />
                        Video Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => startAudioCall(doctor.name)}>
                        <Phone className="h-4 w-4 mr-1" />
                        Audio Call
                      </Button>
                    </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;