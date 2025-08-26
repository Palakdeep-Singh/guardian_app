'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Car,
  Users,
  PlusCircle,
  Trash2,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <div className="text-left">
        <h2 className="text-2xl font-bold font-headline">Settings</h2>
        <p className="text-muted-foreground">
          Manage your profile, vehicles, and contacts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <User className="h-6 w-6" />
            <CardTitle>My Profile</CardTitle>
          </div>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="e.g., Tony Stark" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="e.g., tony@stark.com" />
          </div>
          <Button>Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Car className="h-6 w-6" />
            <CardTitle>My Vehicles</CardTitle>
          </div>
          <CardDescription>
            Manage your registered vehicle information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg space-y-2">
             <div className="space-y-2">
                <Label htmlFor="vehicle-name-1">Vehicle Name</Label>
                <Input id="vehicle-name-1" placeholder="e.g., Mark II Bike" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-model-1">Model</Label>
                <Input id="vehicle-model-1" placeholder="e.g., Stark Industries EV" />
              </div>
              <Button variant="destructive" size="sm" className="gap-2">
                <Trash2 /> Remove
              </Button>
          </div>
          <Button variant="outline" className="w-full gap-2">
            <PlusCircle />
            Add Vehicle
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
           <div className="flex items-center gap-4">
            <Users className="h-6 w-6" />
            <CardTitle>Emergency Contacts</CardTitle>
          </div>
          <CardDescription>
            These contacts will be notified in an emergency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg space-y-2">
                 <div className="space-y-2">
                    <Label htmlFor="contact-name-1">Contact Name</Label>
                    <Input id="contact-name-1" placeholder="e.g., Pepper Potts" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone-1">Phone Number</Label>
                    <Input id="contact-phone-1" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                   <Button variant="destructive" size="sm" className="gap-2">
                    <Trash2 /> Remove
                  </Button>
            </div>
          <Button variant="outline" className="w-full gap-2">
            <PlusCircle />
            Add Contact
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
