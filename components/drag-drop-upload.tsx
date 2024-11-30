import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaImage, FaTimes } from "react-icons/fa";

interface DragDropUploadProps {
  onFileSelect: (file: File) => void;
  onClear: () => void;
  previewUrl: string | null;
}

export default function DragDropUpload({
  onFileSelect,
  onClear,
  previewUrl,
}: DragDropUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error("File size should be less than 10MB");
          return;
        }
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  return (
    <div className="mt-2">
      {previewUrl ? (
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={previewUrl}
            alt="Preview"
            className="w-full h-64 object-cover"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg 
            transition-all duration-200 cursor-pointer
            ${
              isDragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 hover:border-indigo-500"
            }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-1 text-center">
            <FaImage
              className={`mx-auto h-12 w-12 ${
                isDragActive ? "text-indigo-500" : "text-gray-400"
              }`}
            />
            <div className="flex flex-col items-center text-sm text-gray-600">
              <p className="font-medium text-indigo-600">
                {isDragActive
                  ? "Drop the file here"
                  : "Drag and drop your image"}
              </p>
              <p className="mt-1">or</p>
              <span className="mt-1 inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className="px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Browse Files
                </button>
              </span>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
}
