
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Route, Share2, StopCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import GpsDisplay from "@/components/gps/GpsDisplay";

export default function GpsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isRecording, setIsRecording] = useState(false);

    const handleToggleRecording = () => {
        setIsRecording(!isRecording);
        toast({
            title: !isRecording ? 'Route Recording Started' : 'Route Recording Stopped',
            description: !isRecording ? 'Your route is now being recorded.' : 'Your route is no longer being recorded.',
        });
    };

    const handleShareLocation = () => {
        // This is a placeholder. A real implementation would get the current location from state management.
        const location = { latitude: 34.0522, longitude: -118.2437 };
        if (location) {
            const url = `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=16/${location.latitude}/${location.longitude}`;
            navigator.clipboard.writeText(url);
            toast({
                title: 'Location Shared',
                description: 'A link to your current location has been copied to your clipboard.',
            });
        } else {
             toast({ variant: 'destructive', title: "No Location", description: "Could not get your location to share."})
        }
    };
    
  return (
    <div className="p-4 space-y-4">

      <div className="h-96">
        <GpsDisplay isRecording={isRecording} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Route Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start gap-2" onClick={handleToggleRecording} variant={isRecording ? 'destructive' : 'default'}>
            {isRecording ? <StopCircle className="h-4 w-4" /> : <Route className="h-4 w-4" />}
            {isRecording ? 'Stop Route Recording' : 'Start Route Recording'}
          </Button>
          <Button variant="secondary" className="w-full justify-start gap-2" onClick={handleShareLocation}>
            <Share2 className="h-4 w-4" />
            Emergency Location Sharing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
