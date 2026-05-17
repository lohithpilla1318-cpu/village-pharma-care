import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoCallProps {
  doctorName: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ doctorName, onEndCall }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Start video call simulation
    startVideoCall();
    
    // Start timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      stopVideoCall();
    };
  }, []);

  const startVideoCall = async () => {
    try {
      // Get user media (camera and microphone)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      toast({
        title: "Video Call Connected",
        description: `Connected with Dr. ${doctorName}`,
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast({
        title: "Camera Access Required",
        description: "Please allow camera and microphone access for video calls",
        variant: "destructive",
      });
    }
  };

  const stopVideoCall = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    stopVideoCall();
    toast({
      title: "Call Ended",
      description: `Call duration: ${formatTime(callDuration)}`,
    });
    onEndCall();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex justify-between items-center">
            <span>Video Call with Dr. {doctorName}</span>
            <span className="text-lg font-mono">{formatTime(callDuration)}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col gap-4">
          {/* Video Container */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Remote Video (Doctor) */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={remoteVideoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='20' fill='white' text-anchor='middle'%3EDr. ${doctorName}%3C/text%3E%3C/svg%3E"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                Dr. {doctorName}
              </div>
            </div>

            {/* Local Video (Patient) */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                You
              </div>
              {!isVideoOn && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <VideoOff className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 py-4">
            <Button
              variant={isVideoOn ? "default" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full w-14 h-14"
            >
              {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>
            
            <Button
              variant={isAudioOn ? "default" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              className="rounded-full w-14 h-14"
            >
              {isAudioOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              onClick={handleEndCall}
              className="rounded-full w-14 h-14"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoCall;