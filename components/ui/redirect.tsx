import { redirect, RedirectType } from "next/navigation";
export default function Redirect({ href, type = RedirectType.replace }) {
  return redirect(href, type);
}
