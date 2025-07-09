import { useFileUpload } from "@/hooks/useFileUpload";
import ReusableUploadMedia, { FileType } from "./reusable-upload-media";
import { toast } from "sonner";
import { useState } from "react";
import { Camera } from "lucide-react";

export default function ReusableProfileImageSelector() {
  const { uploadFile, isUploading, progress } = useFileUpload();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const handleFileUpload = async (selected: File | File[] | null) => {
    if (!selected) return;

    const file = Array.isArray(selected) ? selected[0] : selected;
    setUploadedFile(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadFile(formData);

      if (res?.data?.url) {
        if (file.type.startsWith("image/")) {
          setProfilePicUrl(res.data.url);
        }
        toast.success("File uploaded successfully");
      } else {
        throw new Error("No URL returned");
      }
    } catch (err) {
      toast.error("Failed to upload file");
      setUploadedFile(null);
    }
  };
  return (
    <div>
      <Camera />
      {/* when upload is selected, use reusable upload media */}
      <ReusableUploadMedia
        uploadConfig={{
          allowedTypes: ["image"] as FileType[],
          maxSizeMB: 10,
          accept: ".png,.jpg,.jpeg,.svg, .webp, .avif",
          multiple: true,
        }}
        onChange={(files) => {
          handleFileUpload(files);
        }}
      />
    </div>
  );
}
