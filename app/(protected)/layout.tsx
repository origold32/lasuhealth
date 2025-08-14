import React, { ReactNode } from "react";
import AuthGuard from "@/auth/auth-guard";

type Props = { children: ReactNode };

const ProtectedLayout = (props: Props) => {
  return <AuthGuard authPath="/login">{props.children}</AuthGuard>;
};

export default ProtectedLayout;
