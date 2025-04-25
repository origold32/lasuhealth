import { NextResponse } from "next/server";
import apiClient from "../server-utils/utils";
import { AxiosError } from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { matric, staffId, password } = body;

    if ((!matric && !staffId) || !password) {
      return NextResponse.json(
        { success: false, message: "Missing credentials" },
        { status: 400 }
      );
    }

    const payload = {
      password,
      ...(matric ? { matric } : { staffId }),
    };

    const { data } = await apiClient.post("/auth/login", payload);

    return NextResponse.json({
      success: true,
      user: data.user,
      token: data.token,
    });
  } catch (error: unknown) {
    let message = "Something went wrong";
    let status = 500;

    if (
      error &&
      typeof error === "object" &&
      "isAxiosError" in error &&
      (error as AxiosError).response
    ) {
      const axiosError = error as AxiosError;
      status = axiosError.response?.status || 500;
      type ErrorResponseData = { message?: string };
      const errorData = axiosError.response?.data as ErrorResponseData;
      message = errorData?.message || message;
    }

    return NextResponse.json({ success: false, message }, { status });
  }
}
