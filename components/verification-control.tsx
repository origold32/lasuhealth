"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useUrlState } from "@/hooks/useUrlState";
import { FormItem } from "./form-builder";
import ReusableApiForm from "./reusable-api-form";
import TitleCatption from "./title-caption";
import { useRouter } from "next/navigation";
import { useFileUpload } from "@/hooks/useFileUpload";
import Image from "next/image";
import CircularUploadProgress from "./loaders/circular-upload-progress";
import ReusableUploadMedia, { FileType } from "./reusable-upload-media";

export default function VerificationControl() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [verifyUrlState, setVerifyUrlState, clearVerifyUrlState] = useUrlState<
    "0" | "1"
  >("verify");
  const [status, setStatus] = useState<"upload" | "success" | "failed">(
    "upload"
  );

  const open = verifyUrlState === "1";
  const { uploadFile, isUploading, progress } = useFileUpload();

  const closeModal = () => {
    clearVerifyUrlState();
    setFile(null);
    setUploadedUrl(null);
    setStatus("upload");
  };

  const handleFileUpload = async (selected: File | File[] | null) => {
    if (!selected) return;

    const file = Array.isArray(selected) ? selected[0] : selected;

    setFile(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadFile(formData);
      if (res?.data?.url) {
        setUploadedUrl(res.data.url);
        toast.success("File uploaded successfully");
      } else {
        throw new Error("No URL returned");
      }
    } catch (err) {
      toast.error("Failed to upload file");
      setStatus("failed");
    }
  };

  const renderPreview = () => {
    if (!file || !uploadedUrl) return null;

    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";

    return (
      <div className="text-sm text-gray-700 space-y-2">
        <p className="font-medium">File Name: {file.name}</p>
        <div className="relative w-full h-48 border rounded-md shadow overflow-hidden">
          <button
            onClick={() => {
              setFile(null);
              setUploadedUrl(null);
            }}
            className="absolute top-2 right-2 bg-[#D34646] hover:bg-[#862d2d] text-white rounded-full p-1.5 cursor-pointer z-50"
            aria-label="Remove uploaded file"
          >
            <X size={18} />
          </button>
          {isImage && (
            <Image
              src={uploadedUrl}
              alt="Uploaded preview"
              fill
              className="object-contain"
            />
          )}
          {isPDF && (
            <iframe
              src={uploadedUrl}
              title="PDF Preview"
              className="object-contain w-full h-full"
            />
          )}
        </div>
      </div>
    );
  };

  const verificationFormItems: FormItem[] = [
    {
      name: "document",
      type: "custom",
      customContent: (
        <>
          <TitleCatption
            className="mb-2"
            title="Identity Verification"
            titleClassName=" text-3xl text-[#020202] font-semibold"
            caption="Upload a valid document to verify your identity"
            captionClassName=" mb-5 mt-2 text-lg"
          />

          {isUploading ? (
            <div className="flex flex-col justify-center items-center py-10 space-y-4">
              <CircularUploadProgress progress={progress} />
              <p className="text-sm leading-relaxed">Uploading {file?.name}</p>
            </div>
          ) : uploadedUrl ? (
            renderPreview()
          ) : (
            <>
              <ReusableUploadMedia
                uploadConfig={{
                  allowedTypes: ["image", "document"] as FileType[],
                  maxSizeMB: 5,
                  accept: ".svg,.png,.jpg,.jpeg,.pdf",
                  multiple: false,
                }}
                onChange={(files) => {
                  handleFileUpload(files);
                }}
              />
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="bg-[#FEF4E1] text-[#F2A000] flex flex-wrap items-center justify-between w-full p-2 my-2 rounded-md">
        <div className="flex items-center gap-2">
          <div className="bg-white border border-[#EF4444] text-[#EF4444] rounded-full p-2">
            <X size={12} />
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold">
              ID Verification
              {/* <span className="text-[#FF8888]">(80%)</span> */}
            </p>
            <p className="text-sm font-medium">
              Complete your ID verification to access full feature
            </p>
          </div>
        </div>
        <button
          className="py-2 px-4 rounded-full border border-[#F2A000] text-[#EF9644] text-xs"
          onClick={() => setVerifyUrlState("1")}
        >
          Complete Now
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 w-full bg-[#000000cc] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full space-y-6 px-4 py-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              onClick={closeModal}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {status === "upload" && (
              <ReusableApiForm
                submitUrl="/user/verify-user"
                apiActionType="post"
                shouldToast
                formItems={verificationFormItems}
                onSuccess={() => setStatus("success")}
                onSubmitHook={() => {
                  if (!uploadedUrl) {
                    toast.error("Please upload a valid document");
                    return { passed: false };
                  }
                  return {
                    passed: true,
                    extraData: { file: uploadedUrl },
                  };
                }}
              />
            )}

            {status === "success" && (
              <div className="space-y-4 text-center">
                <h2 className="text-[#39BD78] font-semibold text-xl">
                  Processing
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Please wait while we process your document to verify your
                  identity. You will be notified within the next 24hrs once it
                  is completed.
                </p>
                <button
                  onClick={() => {
                    toast.success("Redirecting...");
                    router.push("/dashboard");
                    closeModal();
                  }}
                  className="mt-4 px-4 py-2 bg-[#39BD78] text-white rounded-md text-sm"
                >
                  Done
                </button>
              </div>
            )}

            {status === "failed" && (
              <div className="space-y-4 text-center">
                <h2 className="text-[#D34646] font-semibold text-xl">
                  Upload Failed! 😞
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Sorry! We encountered a problem trying to process your upload.
                  Kindly check the document and re-upload.
                </p>
                <button
                  onClick={() => {
                    setStatus("upload");
                    setFile(null);
                    setUploadedUrl(null);
                  }}
                  className="mt-4 px-4 py-2 bg-[#D34646] text-white rounded-md text-sm"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
