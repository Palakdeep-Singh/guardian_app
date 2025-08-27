
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, Wind } from "lucide-react";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { addLocation } from "@/services/firestore";

const GpsDisplay = memo(({ isRecording }: { isRecording: boolean }) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [speed, setSpeed] = useState(45);
    const [heading, setHeading] = useState("NW");
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>({ latitude: 34.0522, longitude: -118.2437 });
    const headings = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    
    const locationRef = useRef(location);
    locationRef.current = location;
    
    const isRecordingRef = useRef(isRecording);
    isRecordingRef.current = isRecording;

    const userRef = useRef(user);
    userRef.current = user;

    const storeLocation = useCallback(() => {
        if (isRecordingRef.current && userRef.current && locationRef.current) {
            addLocation(userRef.current.uid, locationRef.current);
        }
    }, []);

    useEffect(() => {
        let locationInterval: NodeJS.Timeout;
        let simulationTimeout: NodeJS.Timeout;

        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            clearTimeout(simulationTimeout); // Real GPS signal found, cancel simulation fallback
            clearInterval(locationInterval); // Stop simulation updates
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Geolocation error, starting simulation:", error);
            toast({ variant: 'destructive', title: "GPS Error", description: "Using simulated location data."})
            // Fallback to simulation if real GPS fails
            locationInterval = setInterval(() => {
                setLocation(prev => ({
                    latitude: (prev?.latitude ?? 34.0522) + (Math.random() - 0.5) * 0.001,
                    longitude: (prev?.longitude ?? -118.2437) + (Math.random() - 0.5) * 0.001,
                }));
            }, 1000);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
        
        // If no real GPS signal after 3 seconds, start simulation
        simulationTimeout = setTimeout(() => {
            if (!location) {
                toast({ title: "GPS Timeout", description: "No GPS signal. Using simulated data." });
                locationInterval = setInterval(() => {
                     setLocation(prev => ({
                        latitude: (prev?.latitude ?? 34.0522) + (Math.random() - 0.5) * 0.001,
                        longitude: (prev?.longitude ?? -118.2437) + (Math.random() - 0.5) * 0.001,
                    }));
                }, 1000);
            }
        }, 3000);

        const speedHeadingInterval = setInterval(() => {
            setSpeed(prev => Math.max(0, prev + Math.floor((Math.random() - 0.4) * 5)));
            setHeading(headings[Math.floor(Math.random() * headings.length)]);
        }, 3000);

        const recordInterval = setInterval(storeLocation, 5000);

        return () => {
            clearInterval(speedHeadingInterval);
            clearInterval(locationInterval);
            clearInterval(recordInterval);
            clearTimeout(simulationTimeout);
            navigator.geolocation.clearWatch(watchId);
        };
    }, [storeLocation, toast]);
    
  return (
    <div className="space-y-4 h-full flex flex-col">
       <Card className="flex-1">
        <CardHeader>
          <CardTitle>Current Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Coordinates</p>
              <p className="font-semibold font-mono">{location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Locating...'}</p>
            </div>
            <MapPin className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardContent>
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
    </div>
  );
});

GpsDisplay.displayName = 'GpsDisplay';

export default GpsDisplay;
