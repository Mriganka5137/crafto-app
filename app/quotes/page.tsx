"use client";

import api from "@/lib/axios";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import Pagination from "@/components/pagination";
import QuoteSkeleton from "@/components/quote-skeleton";
import type { Quote } from "@/types";

const ITEMS_PER_PAGE = 9;

export default function QuotesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchQuotes = async (page: number) => {
    try {
      setLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await api.get<{ data: Quote[] }>(
        `/getQuotes?limit=${ITEMS_PER_PAGE}&offset=${offset}`
      );

      setQuotes(response.data.data);
      if (response.data.data.length < ITEMS_PER_PAGE) {
        setTotalPages(page);
      } else {
        setTotalPages(page + 1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`/quotes?page=${page}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <QuoteSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Grid of quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote, i) => (
                <article
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Image and overlaid text */}
                  <div className="relative h-48 sm:h-64">
                    {quote.mediaUrl ? (
                      <>
                        <Image
                          src={quote.mediaUrl}
                          alt="Quote background"
                          fill
                          priority
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600" />
                    )}

                    {/* Quote text overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <p className="text-white text-lg md:text-xl font-medium text-center">
                        &quot;{quote.text}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Footer with username and date */}
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">
                        @{quote.username}
                      </p>
                      <time
                        dateTime={quote.createdAt}
                        className="text-sm text-gray-500"
                      >
                        {format(new Date(quote.createdAt), "MMM d, yyyy")}
                      </time>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {quotes.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            {quotes.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                No quotes found
              </div>
            )}
          </>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => router.push("/quotes/create")}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg 
                     hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                     flex items-center justify-center transition-all"
          aria-label="Create new quote"
        >
          <FaPlus className="w-6 h-6" />
        </button>
      </main>
    </div>
  );
}
