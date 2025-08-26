import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Car,
  ShieldOff,
  HeartPulse,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  return (
    <div className="p-4 space-y-6">
      <div className="text-left">
        <h2 className="text-2xl font-bold font-headline">Emergency Panel</h2>
        <p className="text-muted-foreground">
          Quick actions for critical situations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button variant="destructive" className="h-24 flex-col gap-2 text-lg">
          <Car className="h-8 w-8" />
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
                    <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person face" />
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
    </div>
  );
}
