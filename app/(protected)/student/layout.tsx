import React, { ReactNode } from "react";
import RoleBasedAuthGuard from "@/auth/role-based-auth-guard";
import ProtectedLayout from "../_components/protected-layout";

type Props = { children: ReactNode };

const StudentLayout = (props: Props) => {
  return (
    <RoleBasedAuthGuard
      authPath="/login?role=student"
      requiredRole="student"
      unauthorizedPath="/unauthorized"
    >
      <ProtectedLayout>
        <div className="student-dashboard">{props.children}</div>
      </ProtectedLayout>
    </RoleBasedAuthGuard>
  );
};

export default StudentLayout;
