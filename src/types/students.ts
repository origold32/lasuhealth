// Student Medical Record Types

import { Faculty, Department } from "./student-discipline";

export interface StudentInformationType {
  passport: File | null;
  lastName: string;
  firstName: string;
  otherName: string;
  matricNo: string;
  dob: string;
  age: number;
  sex: "Male" | "Female";
  nationality: string;
  ethnicGroup: string;
  religion: string;
  faculty: Faculty;
  department: Department;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "Separated";
}

export interface ParentInformationType {
  parentName: string;
  officeAddress: string;
  fatherPhone: string;
  motherPhone: string;
  parentHomeAddress: string;
  guardianName: string;
  guardianRelationship:
    | "Father"
    | "Mother"
    | "Uncle"
    | "Aunt"
    | "Brother"
    | "Sister"
    | "Other";
  guardianPhone: string;
  guardianHomeAddress: string;
}

export interface MedicalHistoryType {
  mentalDisease?: string;
  respiratoryIssues?: string;
  chestDisease?: string;
  heartTrouble?: string;
  kidneyBladderDisease?: string;
  stomachLiverDisease?: string;
  digestiveTrouble?: string;
  otherIllness?: string;
  relativeTuberculosis?: string;
  relativeNervousDisease?: string;
  // Female-specific fields
  femaleBreastSexualDisease?: string;
  abnormalPeriod?: string;
  // all students
  presentComplaints?: string;
}

export interface AllergiesType {
  drugAllergy?: string;
  foodAllergy?: string;
  environmentalAllergy?: string;
  insectAllergy?: string;
  latexAllergy?: string;
  otherAllergies?: string;
}

export interface CompleteStudentMedicalRecordType {
  studentInfo: StudentInformationType;
  parentInfo: ParentInformationType;
  medicalHistory: MedicalHistoryType;
  allergies: AllergiesType;
}
