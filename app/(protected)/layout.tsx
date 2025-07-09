import React, { ReactNode } from "react";
import ProtectedLayout from "./_components/protected-layout";
import AuthGuard from "@/auth/auth-guard";

type Props = { children: ReactNode };

const Layout = (props: Props) => {
  return (
    <AuthGuard authPath="/login">
      <ProtectedLayout {...props} />
    </AuthGuard>
  );
};

export default Layout;
