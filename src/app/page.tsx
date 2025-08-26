'use client';
import {
  Gauge,
  Radar,
  Camera,
  BatteryFull,
  Thermometer,
  Zap,
} from "lucide-react";
import SensorCard from "@/components/dashboard/SensorCard";
import PowerChart from "@/components/dashboard/PowerChart";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [accelerometer, setAccelerometer] = useState(0.98);
  const [gyroscope, setGyroscope] = useState(3.2);
  const [lidar, setLidar] =useState(12.5);
  const [battery, setBattery] = useState(88);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAccelerometer(prev => parseFloat((prev + (Math.random() - 0.5) * 0.1).toFixed(2)));
      setGyroscope(prev => parseFloat((prev + (Math.random() - 0.5) * 0.5).toFixed(1)));
      setLidar(prev => parseFloat((prev + (Math.random() - 0.5) * 1).toFixed(1)));
      setBattery(prev => Math.max(0, prev - 0.1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  if (loading || !user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 grid-cols-2">
        <SensorCard icon={Gauge} title="Accelerometer" value={`${accelerometer}g`} />
        <SensorCard icon={Zap} title="Gyroscope" value={`${gyroscope}°/s`} />
        <SensorCard icon={Radar} title="LiDAR" value={`${lidar}m`} />
        <SensorCard
          icon={Camera}
          title="Camera"
          value="Online"
          valueClassName="text-green-500"
        />
      </div>

      <SensorCard icon={BatteryFull} title="System Status">
        <div className="space-y-2 mt-2">
          <div className="flex justify-between items-center text-sm">
            <span>Battery</span>
            <span>{battery.toFixed(0)}%</span>
          </div>
          <Progress value={battery} className="h-2" />
        </div>
      </SensorCard>

      <SensorCard icon={Thermometer} title="Temperature">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">24.5°C</span>
          <span className="text-sm text-muted-foreground">Optimal</span>
        </div>
      </SensorCard>

      <PowerChart />
    </div>
  );
}
