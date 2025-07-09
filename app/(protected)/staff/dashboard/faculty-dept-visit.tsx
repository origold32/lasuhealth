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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

        <table className="w-full text-sm text-[#040404] mt-6">
          <tbody>
            {Array.from({ length: Math.ceil(fullFacultyNames.length / 3) }).map(
              (_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-[#d5d5d5] last:border-b-0"
                >
                  {Array.from({ length: 3 }).map((_, colIndex) => {
                    const index = rowIndex * 3 + colIndex;
                    if (index >= fullFacultyNames.length)
                      return <td key={colIndex} />;

                    return (
                      <td
                        key={colIndex}
                        className="p-2 align-top w-1/3 border-l first:border-l-0 border-[#d5d5d5]"
                      >
                        <div className="flex justify-between pr-2">
                          <span>{fullFacultyNames[index]}</span>
                          <span className="font-semibold text-[#D16EFF]">
                            {facultyValues[index]}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
