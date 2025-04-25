"use client";

import { useState } from "react";
import { Button } from "@lasuhealth/components/ui/button";
import { Checkbox } from "@lasuhealth/components/ui/checkbox";
import { Input } from "@lasuhealth/components/ui/input";
import { Label } from "@lasuhealth/components/ui/label";
import Link from "next/link";
import { cn } from "@lasuhealth/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const isFormValid = identifier.trim() !== "" && password.trim() !== "";

  const login = async () => {
    try {
      const isMatric = /^[0-9]{4,}$/.test(identifier.trim());
      const payload = {
        password,
        ...(isMatric ? { matric: identifier } : { staffId: identifier }),
      };

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        }

        if (data.user.role === "STUDENT") {
          router.push("/student/dashboard");
        } else if (data.user.role === "STAFF") {
          router.push("/staff/dashboard");
        } else {
          toast.error("Unknown role detected.");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    login();
  };

  return (
    <div className='min-h-screen bg-[url("/uploads/lasu-view.png")] bg-cover bg-center flex items-center justify-center'>
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-8 shadow-lg space-y-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-[#000B3B]">
            Sign in with your work email
          </h2>
          <p className="text-[#5C5959] font-medium">
            Please provide your details and password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="identifier"
              className="text-sm text-[#040404] font-medium"
            >
              Matric Number / Staff ID
            </Label>
            <Input
              id="identifier"
              name="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-[#D9D9D9] rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#000B3B] focus:border-transparent"
              placeholder="Enter your matric number or staff ID"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="text-sm text-[#040404] font-medium"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#D9D9D9] rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#000B3B] focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                className="border-[#1AB2FF] data-[state=checked]:border-[#1AB2FF] focus-visible:ring-[#1AB2FF] focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-[#040404] font-medium"
              >
                Remember me
              </Label>
            </div>
            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-[#1AB2FF] hover:text-[#1ab3ffb7]"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!isFormValid}
            className={cn(
              "w-full font-medium transition-colors duration-200",
              isFormValid
                ? "bg-black text-white hover:bg-[#2C2C2C]"
                : "bg-[#F0F2F5] text-[#667185] cursor-not-allowed"
            )}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
