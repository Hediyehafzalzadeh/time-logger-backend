"use client";

import React, { useEffect, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { convertToRealFormat } from "./Logger";
import { Sector } from "recharts";


const chartConfig = {};

const TaskHistoryChart = ({ taskHistory }) => {
  const [historyData, setHistoryData] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(null);

  useEffect(() => {
    if (taskHistory && taskHistory.length > 0) {
      setHistoryData(taskHistory);
    }
  }, [taskHistory]);

  const generateColors = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const hue = Math.floor((360 / count) * i);
      return `hsl(${hue}, 70%, 60%)`;
    });
  };

  const colors = useMemo(
    () => generateColors(historyData.length),
    [historyData],
  );

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="flex flex-col basis-1/2 mx-auto ">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0 font-sans">
          <CardTitle>Pie Chart - Based On Task Name</CardTitle>
          
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <Pie
                data={historyData}
                dataKey="duration"
                nameKey="name"
                innerRadius={50}
                outerRadius={100}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {historyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
                <Legend className="text-black flex-wrap gap-2 *:basis-1/4 *:justify-center" />
                {/* <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className=" flex-wrap gap-2 *:basis-1/4 *:justify-center"
              /> */}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskHistoryChart;

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
        {payload.name}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};
