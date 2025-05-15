import { IoMailOutline } from "react-icons/io5";
import departments from "@lasuhealth/store/department.json";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiPlus } from "react-icons/pi";

const faculties = [
  "Allied Health Sciences",
  "Arts",
  "Basic Medical Sciences",
  "Clinical Sciences",
  "Dentistry",
  "Education",
  "Engineering",
  "Law",
  "Management Sciences",
  "Science",
  "Social Sciences",
  "Transport",
];

const maritalStatus = ["Single", "Married", "Divorced", "Widowed", "Separated"];
export default function StudentInformation() {
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col space-y-2">
        <label htmlFor="passport">Upload Passport</label>
        <div
          className="relative border-2 border-[#1AB2FF] border-dashed rounded-md p-2 w-20 aspect-square cursor-pointer hover:bg-[#1AB2FFCC]"
          onClick={() => document.getElementById("passport")?.click()}
        >
          <input
            type="file"
            id="passport"
            accept="image/*"
            className="hidden"
          />
          <PiPlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#1AB2FF] text-3xl" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Gold"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Ori"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="otherName">Other Name</label>
          <input
            type="text"
            id="otherName"
            placeholder="Oriola"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="matricNo">Matric No</label>
          <input
            type="text"
            id="matricNo"
            placeholder="210591001"
            maxLength={9}
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            placeholder="20"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
            // min={0}
            // max={100}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="sex">Sex</label>
          <select
            id="sex"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
            defaultValue="Select"
          >
            <option value="Select" disabled>
              Select your sex
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            placeholder="Nigerian"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="ethnicGroup">Ethnic Group</label>
          <input
            type="text"
            id="ethnicGroup"
            placeholder="Yoruba"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="religion">Religion</label>
          <input
            type="text"
            id="religion"
            placeholder="Islam"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="faculty">Faculty</label>
          <select
            id="faculty"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
            defaultValue="Select your faculty"
          >
            <option value="Select your faculty" disabled>
              Select your faculty
            </option>
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
            defaultValue="Select your department"
          >
            <option value="Select your department" disabled>
              Select your department
            </option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email Address</label>
          <div className="relative w-full">
            <IoMailOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#292D32]" />
            <input
              type="email"
              id="email"
              placeholder="origold1@gmail.com"
              className="border border-[#ECECEC] rounded-md p-2 pl-10 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="08123456789"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="home">Home Address</label>
          <div className="relative w-full">
            <HiOutlineLocationMarker className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#292D32]" />
            <input
              type="text"
              id="home"
              placeholder="5, Itelorun Street, Ijesha, Lagos"
              className="border border-[#ECECEC] rounded-md p-2 pl-10 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="maritalStatus">Marital Status</label>
          <select
            id="maritalStatus"
            className="border border-[#ECECEC] rounded-md p-2 w-full"
            defaultValue="Select your marital status"
          >
            <option value="Select your marital status" disabled>
              Select your marital status
            </option>
            {maritalStatus.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
