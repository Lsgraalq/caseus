import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function ImpressumRedirectPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  if (acceptLanguage.toLowerCase().includes("de")) {
    redirect("/de/impressum");
  } else {
    redirect("/en/impressum");
  }
}