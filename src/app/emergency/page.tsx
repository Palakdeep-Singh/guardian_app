
'use client';

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Car,
  ShieldOff,
  HeartPulse,
  Phone,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { reportAccident, AccidentReport } from "@/ai/flows/accident-report";
import { generateAudio, AudioResponse } from "@/ai/flows/tts";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"

const emergencyContacts = [
  {
    name: "Jane Doe",
    relation: "Spouse",
    avatar: "https://picsum.photos/seed/jane/40/40",
  },
  {
    name: "John Smith",
    relation: "Father",
    avatar: "https://picsum.photos/seed/john/40/40",
  },
  {
    name: "Emergency Services",
    relation: "911/112",
    avatar: "",
  },
];

export default function EmergencyPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [accidentDetails, setAccidentDetails] = useState<AccidentReport | null>(null);
  const [audio, setAudio] = useState<AudioResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleReportAccident = async () => {
    setIsLoading(true);
    try {
      const location = await new Promise<{ latitude: number, longitude: number }>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        )
      });
      
      const report = await reportAccident(location);
      setAccidentDetails(report);

      const audioResponse = await generateAudio({ text: report.callScript });
      setAudio(audioResponse);

      setIsDialogOpen(true);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Reporting Accident",
        description: error.message || "Could not get location or generate report.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-left">
        <h2 className="text-2xl font-bold font-headline">Emergency Panel</h2>
        <p className="text-muted-foreground">
          Quick actions for critical situations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button
          variant="destructive"
          className="h-24 flex-col gap-2 text-lg"
          onClick={handleReportAccident}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <Car className="h-8 w-8" />
          )}
          Report Accident
        </Button>
        <Button variant="destructive" className="h-24 flex-col gap-2 text-lg">
          <ShieldOff className="h-8 w-8" />
          Report Theft
        </Button>
        <Button variant="destructive" className="h-24 flex-col gap-2 text-lg">
          <HeartPulse className="h-8 w-8" />
          Medical Emergency
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {emergencyContacts.map((contact) => (
              <li
                key={contact.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={contact.avatar}
                      alt={contact.name}
                      data-ai-hint="person face"
                    />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {contact.relation}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {accidentDetails && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Accident Reported</AlertDialogTitle>
              <AlertDialogDescription>
                The following details have been logged. An automated alert is ready.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="text-sm space-y-2">
                <p><strong>Time:</strong> {accidentDetails.time}</p>
                <p><strong>Location:</strong> {accidentDetails.location}</p>
                <p><strong>Report:</strong> {accidentDetails.report}</p>
                {audio && (
                  <div>
                    <p><strong>Simulated Call:</strong></p>
                    <audio controls src={audio.media} className="w-full mt-2">
                        Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsDialogOpen(false)}>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
