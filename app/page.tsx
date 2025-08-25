import { redirect } from "next/navigation";

export default function RedirectPage() {
  // можно сразу в return
  redirect("/de"); // куда редиректим
}

