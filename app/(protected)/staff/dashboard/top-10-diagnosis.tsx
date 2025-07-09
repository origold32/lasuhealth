"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(ArcElement, Tooltip, Legend);

const diagnoses = [
  { label: "Malaria", value: 121799, color: "#F3BD18" },
  { label: "Anxiety", value: 121799, color: "#131313" },
  { label: "Allergies", value: 66734, color: "#3FB8F7" },
  { label: "Gastritis", value: 21567, color: "#FF74C3" },
  { label: "UTI", value: 11387, color: "#D16EFF" },
  { label: "Headaches", value: 7806, color: "#02B69E" },
];

const total = diagnoses.reduce((sum, d) => sum + d.value, 0);

const pieData = {
  labels: diagnoses.map((d) => d.label),
  datasets: [
    {
      data: diagnoses.map((d) => d.value),
      backgroundColor: diagnoses.map((d) => d.color),
      borderWidth: 1,
    },
  ],
};

export default function Top10Diagnosis() {
  return (
    <Card className="bg-white border border-[#F7F9FC] p-4">
      <CardHeader>
        <CardTitle className="font-bold text-[#040404]">
          Top 10 Common Diagnosis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[280px]">
            <Pie
              data={pieData}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mt-6 w-full space-y-2">
            {diagnoses.map((item) => (
              <div
                key={item.label}
                className="flex justify-between text-sm text-[#2E3A59]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
                <span className="font-medium">
                  {item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
