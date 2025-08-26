'use client';
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Route, MapPin, Share2, TrendingUp, Wind } from "lucide-react";
import { useState, useEffect } from "react";

export default function GpsPage() {
    const [speed, setSpeed] = useState(45);
    const [heading, setHeading] = useState("NW");
    const headings = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed(prev => Math.max(0, prev + Math.floor((Math.random() - 0.4) * 5)));
            setHeading(headings[Math.floor(Math.random() * headings.length)]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);


  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="relative w-full h-64">
            <Image
              src="https://picsum.photos/800/600"
              alt="Map view of current location"
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint="street map"
            />
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Current Location</p>
              <p className="font-semibold">123 Market St, San Francisco</p>
            </div>
            <Button variant="outline" size="icon">
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
          <Button className="w-full justify-start gap-2">
            <Route className="h-4 w-4" />
            Start Route Recording
          </Button>
          <Button variant="secondary" className="w-full justify-start gap-2">
            <Share2 className="h-4 w-4" />
            Emergency Location Sharing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
