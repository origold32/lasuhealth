"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@lasuhealth/components/ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const fullFacultyNames = [
  "Allied Health Sciences",
  "Arts",
  "Basic Medical Sciences",
  "Clinical Sciences",
  "Dentistry",
  "Education",
  "Engineering",
  "Law",
  "Management Sciences",
  "Science",
  "Social Sciences",
  "Transport",
];

const facultyAcronyms = [
  "FAHS",
  "FA",
  "FBMS",
  "FCS",
  "FD",
  "FE",
  "FENG",
  "FL",
  "FMS",
  "FOS",
  "FSS",
  "FT",
];

const facultyValues = [
  400, 220, 160, 650, 390, 870, 140, 300, 500, 600, 700, 800,
];

const data = {
  labels: facultyAcronyms,
  datasets: [
    {
      label: "Total Monthly visit",
      data: facultyValues,
      backgroundColor: "#D16EFF",
      borderRadius: 8,
      barThickness: 40,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      backgroundColor: "#000",
      titleColor: "#fff",
      bodyColor: "#fff",
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          const index = context.dataIndex;
          const fullName = fullFacultyNames[index];
          return `${fullName}: ${context.raw}`;
        },
      },
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 200,
        color: "#040404",
      },
      grid: {
        color: "#F1F1F1",
      },
    },
    x: {
      ticks: {
        color: "#040404",
      },
      grid: {
        display: false,
      },
    },
  },
};

export default function FacultyDepartmentVisit() {
  return (
    <Card className="bg-white border border-[#F7F9FC] p-4">
      <CardHeader>
        <CardTitle className="font-bold text-[#040404]">
          Visits by Faculty/Departments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={data} options={options} />

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-[#040404]">
          {fullFacultyNames.map((name, idx) => (
            <div key={name} className="flex justify-between">
              <span>{name}</span>
              <span className="font-semibold text-[#D16EFF]">
                {facultyValues[idx]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
