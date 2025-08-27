// StudentAppointments.tsx - Appointments view component
import LoadingSkeleton from "@/components/loaders/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DateFormatterToText from "@/components/date-formatter-to-text";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Status, statusConfig } from "@/types/status-color";

type Props = {
  student: any;
  isLoading: boolean;
};

export default function StudentAppointments({ student, isLoading }: Props) {
  // Mock data - replace with actual API call
  const appointments = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Consultation",
      doctor: "Dr. Smith",
      location: "Room 101",
      status: "COMPLETED",
    },
    {
      id: 2,
      date: "2024-01-20",
      time: "2:00 PM",
      type: "Follow-up",
      doctor: "Dr. Johnson",
      location: "Room 205",
      status: "PENDING",
    },
    {
      id: 3,
      date: "2024-01-10",
      time: "11:30 AM",
      type: "Check-up",
      doctor: "Dr. Williams",
      location: "Room 103",
      status: "SCHEDULED",
    },
  ];

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-sm rounded-md h-fit">
        <div className="flex items-center justify-between p-4">
          <h6 className="text-sm font-semibold">Appointments</h6>
          <Button size="sm" className="bg-[#1363DF]">
            Schedule New Appointment
          </Button>
        </div>

        <div className="border-t">
          {appointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Calendar className="mx-auto h-12 w-12 mb-4" />
              <p>No appointments scheduled</p>
            </div>
          ) : (
            <div className="divide-y">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">
                          <DateFormatterToText date={appointment.date} />
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>

                      <Badge
                        style={{
                          backgroundColor:
                            statusConfig[appointment.status as Status]?.color,
                        }}
                      >
                        {statusConfig[appointment.status as Status]?.label}
                      </Badge>
                    </div>

                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{appointment.type}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{appointment.doctor}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">
                        {appointment.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Appointments Summary */}
      <div className="bg-white shadow-sm rounded-md p-4">
        <h6 className="text-sm font-semibold mb-3">Quick Stats</h6>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1363DF]">
              {appointments.filter((a) => a.status === "confirmed").length}
            </div>
            <div className="text-xs text-gray-600">Confirmed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {appointments.filter((a) => a.status === "pending").length}
            </div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter((a) => a.status === "completed").length}
            </div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
