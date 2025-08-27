import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SensorCardProps {
  icon: LucideIcon;
  title: string;
  value?: string;
  children?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

const SensorCard = React.memo(function SensorCard({
  icon: Icon,
  title,
  value,
  children,
  className,
  valueClassName,
}: SensorCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-center">
        {value && (
          <div className={cn("text-2xl font-bold", valueClassName)}>
            {value}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
});

export default SensorCard;
