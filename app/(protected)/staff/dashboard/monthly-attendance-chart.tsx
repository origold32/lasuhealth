"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaDownload } from "react-icons/fa";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const { RangePicker } = DatePicker;

export default function MonthlyAttendanceChart() {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs("01-01-2025"),
    dayjs("12-20-2025"),
  ]);

  const labels = [...Array(12).keys()].map((i) =>
    new Date(2000, i).toLocaleString("default", { month: "short" })
  );

  const chartDataValues = [
    220, 720, 520, 340, 650, 450, 1000, 850, 600, 280, 450, 100,
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Monthly visit",
        data: chartDataValues,
        borderColor: "#F3BD18",
        backgroundColor: "transparent",
        pointBackgroundColor: "#F3BD18",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 4,
          boxHeight: 4,
          padding: 15,
          font: {
            size: 10,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: "nearest" as const,
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            return `${
              context.dataset.label
            }: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#F2F4F7",
        },
        beginAtZero: true,
        min: 0,
        max: 1200,
        ticks: {
          stepSize: 200,
          callback: function (tickValue: string | number) {
            const value =
              typeof tickValue === "number" ? tickValue : parseFloat(tickValue);
            return value.toLocaleString();
          },
        },
      },
    },
  };

  const handleExportCSV = () => {
    const startDate = dateRange[0]?.toDate() || new Date();
    const endDate = dateRange[1]?.toDate() || new Date();
    exportToCSV(chartDataValues, labels, startDate, endDate);
  };

  const exportToCSV = (
    data: number[],
    labels: string[],
    from: Date,
    to: Date
  ) => {
    const rows = [["Month", "Visits"]];

    labels.forEach((label, index) => {
      const monthDate = new Date(2025, index, 1);
      if (monthDate >= from && monthDate <= to) {
        rows.push([label, data[index].toString()]);
      }
    });

    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    const filename = `monthly-attendance_${from
      .toISOString()
      .slice(0, 10)}_to_${to.toISOString().slice(0, 10)}.csv`;
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="h-full bg-white border border-[#F7F9FC] p-4">
      <CardHeader>
        <CardTitle>
          <div className="grid md:grid-cols-[35%_65%] justify-between gap-4 md:items-center">
            <h2 className="font-bold text-[#040404]">Monthly Attendance</h2>
            <div className="grid grid-cols-[65%_35%] items-center gap-2">
              <RangePicker
                value={dateRange}
                onChange={(dates) => setDateRange(dates ?? [null, null])}
                format="DD-MM-YYYY"
                style={{ height: 32, fontSize: 12 }}
                allowClear={false}
              />

              <button
                onClick={handleExportCSV}
                className="bg-[#EB5017] flex items-center justify-center gap-2 text-white px-2 md:px-3 py-2 rounded-md text-[10px] hover:bg-[#d63d11] transition-colors"
              >
                <span>Export CSV</span>
                <FaDownload />
              </button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-screen relative">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
