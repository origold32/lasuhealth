import React from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ReusableApiForm from "@/components/reusable-api-form";
import { FormItem } from "@/components/form-builder";
import { Mail } from "lucide-react";

type Props = {};

const ForgotPassword = (props: Props) => {
  const formItems: FormItem[] = [
    {
      name: "email",
      type: "input",
      inputProps: {
        type: "email",
        label: "Email",
        required: true,
        placeholder: "Email Address",
        className: "mb-10",
        rightElement: <Mail size={22} />,
      },
    },
  ];
  return (
    <div className="relative z-10 w-[95%] md:w-full max-w-md rounded-md bg-white px-8 py-4 shadow-lg space-y-4">
      <ReusableApiForm
        redirectUrlonSuccess="/dashboard"
        submitUrl="/auth/login"
        title="Forgot your password?"
        caption="Provide your email address to start password recovery"
        formItems={formItems}
        formButtonText="Continue"
        loadingText="Sending recovery email"
      />

      <div className="mt-4 text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
