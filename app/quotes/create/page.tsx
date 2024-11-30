"use client";

import DragDropUpload from "@/components/drag-drop-upload";
import api from "@/lib/axios";
import type { QuoteResponse, UploadResponseItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";

const quoteSchema = z.object({
  text: z
    .string()
    .min(1, "Quote text is required")
    .max(280, "Quote must be less than 280 characters"),
});

type QuoteForm = z.infer<typeof quoteSchema>;

export default function CreateQuotePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
  });

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const onSubmit = async (data: QuoteForm) => {
    try {
      setIsLoading(true);
      let mediaUrl = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await fetch(
          "https://crafto.app/crafto/v1.0/media/assignment/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const response = (await uploadResponse.json()) as UploadResponseItem[];

        if (response && response.length > 0) {
          mediaUrl = response[0].url;
        }
      }

      const quoteResponse = await api.post<QuoteResponse>("/postQuote", {
        text: data.text,
        mediaUrl,
      });

      if (quoteResponse.data.data) {
        toast.success("Quote created successfully!");
        router.push("/quotes");
      } else {
        throw new Error("Failed to create quote");
      }
    } catch (error) {
      console.error("Error creating quote:", error);
      toast.error("Failed to create quote");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Quote
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Quote
              </label>
              <textarea
                {...register("text")}
                rows={4}
                className="w-full rounded-lg border-gray-200  focus:border-indigo-500 
                       focus:ring-indigo-500 resize-none p-2 border "
                placeholder="Share your thoughts..."
              />
              {errors.text && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.text.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add an Image
              </label>
              <DragDropUpload
                onFileSelect={handleFileSelect}
                onClear={clearImage}
                previewUrl={previewUrl}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/quotes")}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium 
                       text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !selectedFile}
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium 
                       text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 
                       disabled:cursor-not-allowed transition-colors duration-200 
                       flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin w-4 h-4" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Quote</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
