"use client"

import {
  LineChart,
  Line,
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
    year: "2015",
    "Atlantique Nord": 342,
    "Méditerranée": 315,
    "Mer des Caraïbes": 487,
    "Pacifique Sud": 523,
    "Océan Indien": 498,
  },
  {
    year: "2017",
    "Atlantique Nord": 335,
    "Méditerranée": 302,
    "Mer des Caraïbes": 470,
    "Pacifique Sud": 510,
    "Océan Indien": 485,
  },
  {
    year: "2019",
    "Atlantique Nord": 328,
    "Méditerranée": 290,
    "Mer des Caraïbes": 452,
    "Pacifique Sud": 495,
    "Océan Indien": 468,
  },
  {
    year: "2021",
    "Atlantique Nord": 318,
    "Méditerranée": 278,
    "Mer des Caraïbes": 430,
    "Pacifique Sud": 480,
    "Océan Indien": 450,
  },
  {
    year: "2023",
    "Atlantique Nord": 308,
    "Méditerranée": 265,
    "Mer des Caraïbes": 410,
    "Pacifique Sud": 470,
    "Océan Indien": 430,
  },
  {
    year: "2025",
    "Atlantique Nord": 298,
    "Méditerranée": 256,
    "Mer des Caraïbes": 392,
    "Pacifique Sud": 458,
    "Océan Indien": 412,
  },
]

const chartConfig = {
  "Atlantique Nord": {
    label: "Atlantique Nord",
    color: "var(--chart-1)",
  },
  "Méditerranée": {
    label: "Méditerranée",
    color: "var(--chart-2)",
  },
  "Mer des Caraïbes": {
    label: "Mer des Caraïbes",
    color: "var(--chart-3)",
  },
  "Pacifique Sud": {
    label: "Pacifique Sud",
    color: "var(--chart-4)",
  },
  "Océan Indien": {
    label: "Océan Indien",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
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
            domain={[250, 550]}
          />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          {Object.entries(chartConfig).map(([dataKey, config]) => (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              stroke={config.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
