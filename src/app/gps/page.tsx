
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Route, MapPin, Share2, TrendingUp, Wind, StopCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { addLocation } from "@/services/firestore";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map/Map'), {
  loading: () => <div className="flex items-center justify-center h-full bg-muted"><p>Loading Map...</p></div>,
  ssr: false,
});

export default function GpsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [speed, setSpeed] = useState(45);
    const [heading, setHeading] = useState("NW");
    const [isRecording, setIsRecording] = useState(false);
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const headings = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed(prev => Math.max(0, prev + Math.floor((Math.random() - 0.4) * 5)));
            setHeading(headings[Math.floor(Math.random() * headings.length)]);
        }, 3000);

        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            if (isRecording && user) {
              addLocation(user.uid, { latitude, longitude });
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            toast({ variant: 'destructive', title: "GPS Error", description: "Could not get your location."})
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );

        return () => {
            clearInterval(interval);
            navigator.geolocation.clearWatch(watchId);
        };
    }, [isRecording, user, toast]);

    const handleToggleRecording = () => {
        setIsRecording(!isRecording);
        toast({
            title: isRecording ? 'Route Recording Stopped' : 'Route Recording Started',
            description: isRecording ? 'Your route is no longer being recorded.' : 'Your route is now being recorded.',
        });
    };

    const handleShareLocation = () => {
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
      <Card>
        <CardContent className="p-0">
          <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
            {location ? <Map location={location} /> : <div className="flex items-center justify-center h-full bg-muted"><p>Locating...</p></div>}
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Current Location</p>
              <p className="font-semibold">{location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Locating...'}</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleShareLocation}>
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Speed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{speed} km/h</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heading</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{heading}</div>
          </CardContent>
        </Card>
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
