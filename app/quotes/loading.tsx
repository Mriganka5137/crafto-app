import QuoteSkeleton from "@/components/quote-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <QuoteSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
