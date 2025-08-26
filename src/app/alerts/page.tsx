import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Siren, ShieldQuestion, Construction, Contact } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AlertVariant = "default" | "destructive" | "secondary" | "outline" | null | undefined;

const alerts = [
  {
    type: "Critical",
    title: "Potential Collision Detected",
    description: "Sudden deceleration detected. Please verify your status.",
    time: "2 min ago",
    icon: Siren,
    variant: "destructive" as AlertVariant,
  },
  {
    type: "High",
    title: "Possible Theft Attempt",
    description: "Unusual movement detected while parked. System is armed.",
    time: "1 hour ago",
    icon: ShieldQuestion,
    variant: "default" as AlertVariant,
  },
  {
    type: "Medium",
    title: "System Maintenance",
    description: "LiDAR sensor requires calibration. Schedule maintenance soon.",
    time: "3 days ago",
    icon: Construction,
    variant: "secondary" as AlertVariant,
  },
  {
    type: "Low",
    title: "Emergency Contact Updated",
    description: "Jane Doe's contact information has been verified.",
    time: "1 week ago",
    icon: Contact,
    variant: "secondary" as AlertVariant,
  },
];

export default function AlertsPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="text-left">
        <h2 className="text-2xl font-bold font-headline">Alert Center</h2>
        <p className="text-muted-foreground">
          Review and manage all system alerts.
        </p>
      </div>
      {alerts.map((alert, index) => (
        <Card key={index} className={cn(alert.variant === 'destructive' && 'border-destructive bg-destructive/10')}>
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                 <alert.icon className="h-6 w-6 text-primary" />
                 <div className="flex-1">
                    <CardTitle className="text-base">{alert.title}</CardTitle>
                 </div>
              </div>
              <Badge variant={alert.variant}>{alert.type}</Badge>
            </div>
             <CardDescription className="pt-2">{alert.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
             <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
             <Button size="sm" variant={index === 0 ? "default" : "secondary"}>Acknowledge</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
