
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Radio, StopCircle, Wind, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description:
            'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <div className="p-4 space-y-4 h-full flex flex-col">
      <Card className="flex-grow flex flex-col">
        <CardContent className="p-0 relative flex-1">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-t-lg"
            autoPlay
            muted
            playsInline
          />
          <div className="absolute top-2 left-2 flex items-center gap-2">
            <Radio className="text-destructive animate-pulse h-5 w-5" />
            <span className="font-mono text-sm text-white text-glow">
              REC 00:12:34
            </span>
          </div>
        </CardContent>
        <div className="p-2 border-t">
          <Button
            onClick={toggleRecording}
            variant={isRecording ? 'destructive' : 'secondary'}
            className="w-full"
          >
            {isRecording ? (
              <>
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Recording
              </>
            ) : (
              <>
                <Radio className="mr-2 h-4 w-4" />
                Start Recording
              </>
            )}
          </Button>
        </div>
      </Card>

      {!hasCameraPermission && (
        <Alert variant="destructive">
          <AlertTitle>Camera Access Required</AlertTitle>
          <AlertDescription>
            Please allow camera access to use this feature.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full h-48">
            <Image
              src="https://picsum.photos/800/400"
              alt="Map view of current route"
              fill
              className="object-cover rounded-t-lg opacity-50"
              data-ai-hint="street map night"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute top-4 left-4">
              <p className="text-sm text-muted-foreground">Current Location</p>
              <p className="font-semibold font-headline text-glow">
                123 Cyberpunk Ave, Night City
              </p>
            </div>
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
            <div className="text-2xl font-bold font-headline text-glow">
              58 km/h
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heading</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-glow">
              NNE
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
