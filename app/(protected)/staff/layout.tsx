import React, { ReactNode } from "react";
import RoleBasedAuthGuard from "@/auth/role-based-auth-guard";
import ProtectedLayout from "../_components/protected-layout";

type Props = { children: ReactNode };

const StaffLayout = (props: Props) => {
  return (
    <RoleBasedAuthGuard
      authPath="/login?role=staff"
      requiredRole="staff"
      unauthorizedPath="/unauthorized"
    >
      <ProtectedLayout>
        <div className="staff-dashboard">{props.children}</div>
      </ProtectedLayout>
    </RoleBasedAuthGuard>
  );
};

export default StaffLayout;
