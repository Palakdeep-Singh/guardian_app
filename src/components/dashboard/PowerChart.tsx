"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { time: "12 PM", power: 2.5 },
  { time: "1 PM", power: 2.8 },
  { time: "2 PM", power: 2.6 },
  { time: "3 PM", power: 3.1 },
  { time: "4 PM", power: 2.9 },
  { time: "5 PM", power: 3.2 },
  { time: "6 PM", power: 3.0 },
];

const chartConfig = {
  power: {
    label: "Power (W)",
    color: "hsl(var(--primary))",
  },
};

export default function PowerChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Power Consumption</CardTitle>
        <CardDescription>Last 6 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `${value}W`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="power" fill="var(--color-power)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
