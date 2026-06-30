import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function DatenschutzRedirectPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  if (acceptLanguage.toLowerCase().includes("de")) {
    redirect("/de/datenschutz");
  } else {
    redirect("/en/datenschutz");
  }
}
