"use client";
import DateFormatterToText from "@/components/date-formatter-to-text";
import { useDrawer } from "@/components/drawer-manager";
import { FormItem } from "@/components/form-builder";
import OverlayManager from "@/components/overlay-manager";
import ReusableApiForm, {
  RAFsubmitHookResponse,
} from "@/components/reusable-api-form";
import { SmartAvatar } from "@/components/smart-avatar";
import AutoTableApi, { TableColProps } from "@/components/table/auto-table-api";
import TitleCaption from "@/components/title-caption";
import TitleCatptionAvartar from "@/components/title-caption-avatar";
import { Button } from "@/components/ui/button";
import { useUrlState } from "@/hooks/useUrlState";
import { useState } from "react";
import { Value } from "react-phone-number-input";
import { mutate } from "swr";

interface Staff {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  invite_code: string;
  invite_accepted: boolean;
  created_at: string;
  join_date: string;
  updated_at: string;
  passport?: string;
}

export default function StaffListPage() {
  const { openDrawer } = useDrawer();
  const [addStaff, setAddStaff] = useUrlState<string | null>("addStaff", null);
  const [role, setRole] = useState<string>("");

  const formItems: FormItem[] = [
    {
      type: "input",
      name: "firstname",
      inputProps: {
        label: "First Name",
      },
    },
    {
      type: "input",
      name: "lastname",
      inputProps: {
        label: "Last Name",
      },
    },
    {
      type: "input",
      name: "email",
      inputProps: {
        label: "Email",
      },
    },
    {
      type: "input-phone",
      name: "phone",
      inputPhoneProps: {
        label: "Phone",
      },
    },
    {
      type: "select",
      name: "staffType",
      selectProps: {
        label: "Role",
        placeholder: "Select a role",
        value: role,
        items: [
          { value: "medical_doctor", content: "Medical Doctor" },
          { value: "nurse", content: "Nurse" },
          {
            value: "health_records_officer",
            content: "Health Records Officer",
          },
          {
            value: "medical_laboratory_scientist",
            content: "Medical Laboratory Scientist",
          },
          { value: "pharmacist", content: "Pharmacist" },
        ],
        onChange: (e) => setRole(e.target.value),
      },
    },
  ];

  const onSubmitHook = async (
    data: Record<string, any>
  ): Promise<RAFsubmitHookResponse> => {
    let continueWithReusableAuthSubmit = true;
    let extraData = {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      phone: data.phone,
      staffType: role,
    };

    return {
      passed: continueWithReusableAuthSubmit,
      extraData,
    };
  };

  const tableCols: TableColProps[] = [
    {
      name: "Name",
      type: "custom",
      dataKey: ["id"],
      render: (data: any, staff: Staff) => {
        const fullName = [staff.firstname, staff.lastname]
          .filter(Boolean)
          .join(" ");
        return (
          <TitleCatptionAvartar
            titleClassName="text-base"
            title={fullName}
            avartarUrl={staff.passport}
          />
        );
      },
    },
    { name: "Email", type: "text", dataKey: ["email"] },
    { name: "Role", type: "text", dataKey: ["role"] },
    {
      name: "Actions",
      type: "custom",
      dataKey: ["id"],
      render: (id: string, staff: Staff) => {
        // const fullName = [staff.firstname, staff.lastname]
        //   .filter(Boolean)
        //   .join(" ");
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              openDrawer({
                // title: `${fullName}`,
                content: <StaffDetails staff={staff} />,
                showClose: true,
              });
            }}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TitleCaption title="Staff List" />
        <Button
          onClick={() => setAddStaff("addStaff")}
          className="bg-gradient-to-r from-[#1B75BC] to-[#29ABE2]"
        >
          Add Staff
        </Button>
      </div>

      <AutoTableApi
        cols={tableCols}
        apiUrl="/staffs"
        apiDataKey="items"
        tableClassName="bg-white rounded-lg w-full"
        tableHeadClassName="bg-white"
        getRowClassName={(row, idx) =>
          idx % 2 !== 1 ? "bg-[#F5F5F5] rounded-lg" : ""
        }
      />

      <OverlayManager
        isOpen={!!addStaff}
        onClose={() => setAddStaff(null)}
        title="Add Staff"
      >
        <ReusableApiForm
          apiActionType="post"
          submitUrl="/staffs"
          formItems={formItems}
          onSubmitHook={onSubmitHook}
          onSuccess={() => {
            mutate("/staffs");
          }}
          formButtonText="Create"
          loadingText="Creating staff..."
          onCancel={() => setAddStaff(null)}
        />
      </OverlayManager>
    </div>
  );
}

function StaffDetails({ staff }: { staff: Staff }) {
  const fullName = [staff.firstname, staff.lastname].filter(Boolean).join(" ");

  const formatRole = (role: string) => {
    return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="space-y-6 p-4">
      <SmartAvatar
        data={staff}
        src={staff.passport}
        getKey={() => staff.id}
        getInitialsName={() => fullName}
        getName={() => fullName}
        showName
        downContent={
          <p className="text-gray-600">Role: {formatRole(staff.role)}</p>
        }
      />

      <div className="space-y-3">
        <h3 className="text-lg font-medium border-b pb-2">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-base">{staff.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="text-base">{staff.phone}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium border-b pb-2">
          Employment Details
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-500">Role</label>
            <p className="text-base">{formatRole(staff.role)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Join Date
            </label>
            <DateFormatterToText date={staff.join_date} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Invite Status
            </label>
            <p className="text-base">
              <span
                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  staff.invite_accepted
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {staff.invite_accepted ? "Accepted" : "Pending"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium border-b pb-2">
          System Information
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-500">
              Staff ID
            </label>
            <p className="font-mono text-sm">{staff.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Created At
            </label>
            <DateFormatterToText date={staff.created_at} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Last Updated
            </label>
            <DateFormatterToText date={staff.updated_at} />
          </div>
        </div>
      </div>
    </div>
  );
}
