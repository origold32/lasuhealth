"use client";

import { useRouter } from "next/navigation";
import { Shield, ArrowLeft } from "lucide-react";
import useAuth from "@/auth/use-auth";
import useUser from "@/hooks/useUser";

const UnauthorizedPage = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { user } = useUser();

  const handleGoToLogin = () => {
    // Clear the current user's token and redirect to appropriate login
    const loginPath = user?.isStaff
      ? "/login?role=staff"
      : "/login?role=student";
    logout(loginPath);
  };

  const handleGoBack = () => {
    // Clear the current user's token and go back to appropriate area
    if (user?.isStaff) {
      router.push("/staff");
    } else {
      router.push("/student");
    }
  };

  const isStaff = user?.isStaff;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <Shield className="mx-auto h-16 w-16 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>

        <p className="text-gray-600 mb-6">
          {isStaff
            ? "You don't have the necessary admin permissions to access this area. Super admin privileges are required."
            : "This area is restricted to staff members only. Students cannot access this section."}
        </p>

        <div className="space-y-3">
          {isStaff ? (
            <>
              <button
                onClick={handleGoToLogin}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Login with Admin Account
              </button>

              <button
                onClick={handleGoBack}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Staff Area
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/student")}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Student Area
              </button>

              <button
                onClick={handleGoToLogin}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Login as Different User
              </button>
            </>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-6">
          If you believe this is an error, please contact your administrator.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
