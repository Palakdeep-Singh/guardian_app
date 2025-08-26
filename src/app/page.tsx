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

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 grid-cols-2">
        <SensorCard icon={Gauge} title="Accelerometer" value="0.98g" />
        <SensorCard icon={Zap} title="Gyroscope" value="3.2°/s" />
        <SensorCard icon={Radar} title="LiDAR" value="12.5m" />
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
            <span>88%</span>
          </div>
          <Progress value={88} className="h-2" />
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
