import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-[55%_45%]">
      <div className="relative bg-[url('/images/lasu-view.png')] bg-cover bg-left">
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="flex flex-col justify-center items-center text-center px-6 py-12 bg-[#4B2E2B] ">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Welcome to{""}
          <br /> LAGOS STATE UNIVERSITY MEDICAL CENTRE
        </h1>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/login?role=staff">
            <Button className="bg-[#E67E22] hover:bg-[#e67d22cd] cursor-pointer transition">
              Staff
            </Button>
          </Link>
          <Link href="/login?role=student">
            <Button className="bg-[#324C80] hover:bg-[#29548F] cursor-pointer transition">
              Student
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
