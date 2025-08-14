"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { createRemoteMutationFetcher } from "@/swr";
import { useUrlState } from "@/hooks/useUrlState";
import Image from "next/image";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import InputV1 from "@/components/input-v1";
import useAuth from "@/auth/use-auth";

type UserRole = "student" | "staff";

export default function Page() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role] = useUrlState<UserRole>("role", "student");
  const { login } = useAuth();

  const { trigger: loginTrigger, isMutating: loggingIn } = useSWRMutation(
    "/auth/login",
    createRemoteMutationFetcher("post"),
    {
      onSuccess: (data) => {
        const user = data?.data;
        login(data?.data?.token);
        toast.success("Login successful!");
      },
    }
  );

  const isFormValid = identifier.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await loginTrigger({
        candidateId: identifier,
        password,
      });
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  const isStaff = role === "staff";
  const labelText = isStaff ? "Email Address" : "Matric Number";
  const placeholderText = isStaff
    ? "Enter your email"
    : "Enter your matric number";
  const inputType = isStaff ? "email" : "text";

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <Image src="/images/favicon.png" alt="" width={150} height={150} />
        <p className="text-[#555555] font-bold">
          {isStaff
            ? "Fulltime Medical Staff Sign In"
            : "Fulltime Undergraduate Students Sign In"}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputV1
          label={labelText}
          name="identifier"
          type={inputType}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder={placeholderText}
          autoComplete=""
          required
        />

        <div className="relative">
          <InputV1
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete=""
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="text-sm font-bold text-[#555555] text-center">
          <p>Forgot your password?</p>
          <Link
            href="/forgot-password"
            className="text-[#506CA4] hover:underline"
          >
            CLICK HERE to Reset Your Password.
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-2">
          <Button
            type="submit"
            disabled={loggingIn || !isFormValid}
            className={cn(
              "bg-[#324C80] text-white hover:bg-[#29548F] cursor-pointer w-full"
            )}
          >
            {loggingIn ? "Logging in..." : "Login"}
          </Button>
          <Link href="/" className="w-full">
            <Button className="w-full bg-[#E67E22] hover:bg-[#e67d22cd] cursor-pointer transition">
              Home
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
