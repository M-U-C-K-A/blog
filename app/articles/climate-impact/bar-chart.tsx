"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"

const data = [
  {
    zone: "Atlantique Nord",
    "2015": 342,
    "2025": 298,
  },
  {
    zone: "Méditerranée",
    "2015": 315,
    "2025": 256,
  },
  {
    zone: "Mer des Caraïbes",
    "2015": 487,
    "2025": 392,
  },
  {
    zone: "Pacifique Sud",
    "2015": 523,
    "2025": 458,
  },
  {
    zone: "Océan Indien",
    "2015": 498,
    "2025": 412,
  },
]

const chartConfig = {
  "2015": {
    label: "2015",
    color: "var(--chart-1)",
  },
  "2025": {
    label: "2025",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function BarChartComponent() {
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="zone"
            stroke="hsl(var(--chart-axis))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--chart-axis))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 550]}
          />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          {Object.entries(chartConfig).map(([dataKey, config]) => (
            <Bar
              key={dataKey}
              dataKey={dataKey}
              fill={config.color}
              radius={[4, 4, 0, 0]}
              barSize={52}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
