// StudentMedicalRecords.tsx - Medical records view component
import LoadingSkeleton from "@/components/loaders/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DateFormatterToText from "@/components/date-formatter-to-text";
import {
  FileText,
  Heart,
  Thermometer,
  Activity,
  Download,
  Eye,
} from "lucide-react";

type Props = {
  student: any;
  isLoading: boolean;
};

export default function StudentMedicalRecords({ student, isLoading }: Props) {
  // Mock data - replace with actual API call
  const medicalRecords = [
    {
      id: 1,
      date: "2024-01-15",
      type: "General Check-up",
      doctor: "Dr. Smith",
      diagnosis: "Healthy",
      notes: "Regular health screening completed successfully",
      attachments: ["blood_test_results.pdf", "x_ray_chest.jpg"],
    },
    {
      id: 2,
      date: "2024-01-10",
      type: "Blood Test",
      doctor: "Dr. Johnson",
      diagnosis: "Normal ranges",
      notes: "All blood parameters within normal limits",
      attachments: ["lab_report_jan_10.pdf"],
    },
    {
      id: 3,
      date: "2023-12-20",
      type: "Vaccination",
      doctor: "Nurse Williams",
      diagnosis: "Immunization complete",
      notes: "Hepatitis B booster shot administered",
      attachments: ["vaccination_card.pdf"],
    },
  ];

  const vitalSigns = [
    {
      label: "Blood Pressure",
      value: "120/80 mmHg",
      status: "normal",
      icon: Heart,
    },
    { label: "Heart Rate", value: "72 BPM", status: "normal", icon: Activity },
    {
      label: "Temperature",
      value: "98.6°F",
      status: "normal",
      icon: Thermometer,
    },
    { label: "Weight", value: "70 kg", status: "normal", icon: Activity },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Latest Vital Signs */}
      <div className="bg-white shadow-sm rounded-md p-4">
        <h6 className="text-sm font-semibold mb-4">Latest Vital Signs</h6>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vitalSigns.map((vital, index) => {
            const IconComponent = vital.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 border rounded-lg"
              >
                <IconComponent className="h-5 w-5 text-[#1363DF]" />
                <div>
                  <div className="text-xs text-gray-500">{vital.label}</div>
                  <div className="font-semibold">{vital.value}</div>
                  <Badge className={`mt-1 ${getStatusColor(vital.status)}`}>
                    {vital.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Medical History */}
      <div className="bg-white shadow-sm rounded-md">
        <div className="flex items-center justify-between p-4">
          <h6 className="text-sm font-semibold">Medical History</h6>
          <Button size="sm" className="bg-[#1363DF]">
            Add New Record
          </Button>
        </div>

        <div className="border-t">
          {medicalRecords.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FileText className="mx-auto h-12 w-12 mb-4" />
              <p>No medical records available</p>
            </div>
          ) : (
            <div className="divide-y">
              {medicalRecords.map((record) => (
                <div key={record.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-[#1363DF] bg-opacity-10 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-[#1363DF]" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-sm font-semibold">
                            {record.type}
                          </h4>
                          <span className="text-xs text-gray-500">
                            <DateFormatterToText date={record.date} />
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Doctor:</span>
                            <span className="ml-2 font-medium">
                              {record.doctor}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Diagnosis:</span>
                            <span className="ml-2 font-medium">
                              {record.diagnosis}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Attachments:</span>
                            <span className="ml-2 font-medium">
                              {record.attachments.length} files
                            </span>
                          </div>
                        </div>

                        {record.notes && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-600">
                              Notes:
                            </span>
                            <p className="text-sm text-gray-800 mt-1">
                              {record.notes}
                            </p>
                          </div>
                        )}

                        {record.attachments.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {record.attachments.map((attachment, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded text-xs"
                              >
                                <FileText className="h-3 w-3" />
                                <span>{attachment}</span>
                                <button
                                  title="Download"
                                  className="hover:text-[#1363DF]"
                                >
                                  <Download className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Medical Summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white shadow-sm rounded-md p-4">
          <h6 className="text-sm font-semibold mb-3">Allergies & Conditions</h6>
          <div className="space-y-2">
            <Badge variant="outline">No known allergies</Badge>
            <Badge variant="outline">No chronic conditions</Badge>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-md p-4">
          <h6 className="text-sm font-semibold mb-3">Current Medications</h6>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">No current medications</p>
          </div>
        </div>
      </div>
    </div>
  );
}
