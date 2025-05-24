"use client";
import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  ScriptableContext,
} from "chart.js";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={className}>{children}</h3>
);

const CardContent: React.FC<CardContentProps> = ({ children }) => (
  <div>{children}</div>
);

export default function AgeSexVisit() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new ChartJS(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "Male",
            data: [65, 35],
            backgroundColor: ["#3FB8F7", "transparent"],
            borderWidth: 0,
          },
          {
            label: "Female",
            data: [80, 20],
            backgroundColor: ["#FF74C3", "transparent"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          //   tooltip: {
          //     callbacks: {
          //       label: function (context) {
          //         const datasetLabel = context.dataset.label;
          //         const value = context.parsed;
          //         if (value === 0) return "";
          //         return datasetLabel + ": " + value + "%";
          //       },
          //     },
          //     filter: function (tooltipItem) {
          //       return tooltipItem.parsed !== 0;
          //     },
          //   },
        },
        interaction: {
          intersect: false,
        },
        cutout: (context: ScriptableContext<"doughnut">) =>
          context.datasetIndex === 0 ? "45%" : "75%",
        radius: (context: ScriptableContext<"doughnut">) =>
          context.datasetIndex === 0 ? "60%" : "95%",
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <Card className="bg-white border border-[F7F9FC] p-4 rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle className="font-bold text-[#040404]">
          Visit Patient by Age and Sex
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="relative h-80 flex items-center justify-center">
            <canvas ref={chartRef} className="max-w-full max-h-full" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#333333]">120+</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-[#3FB8F7] rounded-full" />
                <span className="font-medium text-[#333333]">Male</span>
              </div>
              <span className="text-[#333333]">25-65 Age</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-[#FF74C3] rounded-full" />
                <span className="font-medium text-[#333333]">Female</span>
              </div>
              <span className="text-[#333333]">0-25 Age</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
