"use client";

import { useState, useRef } from "react";
import { FaStethoscope } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import StudentGroupIcon from "../../../public/uploads/student-group-icon";
import PillIcon from "../../../public/uploads/pill-icon";
import AllergiesIcon from "../../../public/uploads/allergies-icon";
import StudentInformation from "./student-info";
import ParentInformation from "./parent-info";
import MedicalHistory from "./medical-history";
import Allergies from "./allergies";
import Password from "./password";
import { ScrollArea } from "@lasuhealth/components/ui/scroll-area";
import { cn } from "@lasuhealth/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@lasuhealth/components/ui/tooltip";
import { toast } from "sonner";

const steps = [
  {
    title: "Student Information",
    icon: <StudentGroupIcon />,
    content: StudentInformation,
  },
  {
    title: "Parent or Guardian",
    icon: <PillIcon />,
    content: ParentInformation,
  },
  {
    title: "Medical History",
    icon: <FaStethoscope />,
    content: MedicalHistory,
  },
  {
    title: "Allergies",
    icon: <AllergiesIcon />,
    content: Allergies,
  },
  {
    title: "Password",
    icon: <TbPasswordUser />,
    content: Password,
  },
];

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const formRefs = useRef<(HTMLFormElement | null)[]>([]);
  const [totalSteps] = useState(steps.length);

  const CurrentComponent = steps[currentStep].content;

  const handleNext = () => {
    const currentForm = formRefs.current[currentStep];
    if (currentForm?.checkValidity()) {
      if (currentStep === steps.length - 1) {
        currentForm.requestSubmit();
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    } else {
      currentForm?.reportValidity();
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#00000066]">
      <div className="h-auto w-[95%] md:w-3/5 bg-white rounded-lg shadow-lg py-4 px-8 space-y-4 overflow-y-auto">
        <div className="grid md:grid-cols-2 justify-between items-end">
          <h2 className="text-2xl font-semibold">
            Complete your Medical Record
          </h2>
          <div className="flex flex-col items-end space-y-2">
            <p className="text-sm font-medium">
              {currentStep + 1}/{totalSteps}
            </p>
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-10 h-2 rounded-full transition-all",
                    index <= currentStep ? "bg-[#2CB8FF]" : "bg-[#E7F7FF]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <TooltipProvider>
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    disabled={index > currentStep}
                    className={cn(
                      "flex items-center px-2 py-2 gap-1 rounded transition-colors",
                      index === currentStep
                        ? "text-[#1AB2FF]"
                        : "text-[#040404]"
                    )}
                  >
                    {step.icon}
                    <span className="hidden md:inline text-sm font-medium">
                      {step.title}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="md:hidden">
                  <p>{step.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        <ScrollArea className="h-[58vh]">
          <form
            ref={(el) => {
              formRefs.current[currentStep] = el;
            }}
            onSubmit={(e) => {
              e.preventDefault();
              try {
                console.log("Submit final form data here");
                toast.success("Form submitted successfully!");
              } catch {
                toast.error("Form submission failed!");
              }
            }}
            className="space-y-4"
          >
            <CurrentComponent />
          </form>
        </ScrollArea>

        <div className="flex justify-between">
          {currentStep > 0 ? (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 text-sm bg-[#FBEAE9] text-[#D42620] rounded-full hover:opacity-90"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className={cn(
              "px-4 py-2 text-sm rounded-full text-white",
              currentStep === steps.length - 1
                ? "bg-[#229602] hover:bg-[#22c55e]"
                : "bg-[#2CB8FF] hover:bg-[#29a8e5]"
            )}
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
