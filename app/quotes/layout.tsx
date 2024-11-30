import Navbar from "@/components/navbar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function QuotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const token = headersList
    .get("cookie")
    ?.split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
