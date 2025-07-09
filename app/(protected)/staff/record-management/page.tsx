/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import students from "@/store/students.json";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { PiCaretUpDown, PiPlus } from "react-icons/pi";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="px-4 relative space-y-4">
      <h1 className="flex items-center gap-2 text-2xl font-semibold text-[#040404]">
        Record Management
      </h1>

      <div className="bg-white rounded-md shadow-sm p-2 space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative">
            <FaSearch
              className="absolute top-1/2 left-5 -translate-y-1/2"
              color="#333333"
            />
            <Input
              type="text"
              placeholder="Search"
              className="border border-[#D0D5DD] rounded-md pl-10 py-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 border border-[#D0D5DD] rounded-md flex items-center gap-2 cursor-pointer">
              <IoFilter />
              <span>Filter</span>
            </div>
            <div className="flex items-center justify-center bg-[#1363DF] text-white rounded-md py-2 px-4 gap-2 text-sm cursor-pointer">
              <span>Add New Record</span>
              <PiPlus />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            {["Matric Number", "Name", "Department", "Date Created", ""].map(
              (header, index) => (
                <TableHead
                  key={index}
                  className="bg-[#F9FAFB] text-left text-[#6B7280] text-sm py-4 cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    {header} {header && <PiCaretUpDown />}
                  </div>
                </TableHead>
              )
            )}
          </TableHeader>

          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <TableCell
                    key={`skeleton-cell-${cellIndex}`}
                    className="text-left py-4"
                  >
                    <LoadingSkeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : students.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-6"
              >
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            students.map((student, index) => (
              <TableRow key={index}>
                <TableCell className="py-3">
                  {student.studentInfo.matricNo}
                </TableCell>
                <TableCell className="py-3">
                  {student.studentInfo.lastName},{" "}
                  {student.studentInfo.firstName}{" "}
                  {student.studentInfo.otherName}
                </TableCell>
                <TableCell className="py-3">
                  {student.studentInfo.department}
                </TableCell>
                <TableCell className="py-3">
                  {new Date(student.createdAt).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="py-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </Table>
      </div>
    </div>
  );
}
