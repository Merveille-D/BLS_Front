import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { HtmlRenderer } from "@/components/ui/html-renderer";
export const MailViewer = forwardRef(({ className, mail, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn("space-y-5", className)}
  >
    <div>
      <p>
        <span className="font-semibold">From:</span>{" "}
        <span>
          {mail.from.name
            ? `${mail.from.name} <${mail.from.email}>`
            : mail.from.email}
        </span>
      </p>
      <p>
        <span className="font-semibold">To:</span>{" "}
        <span>
          {mail.to
            .map((to) => (to.name ? `${to.name} <${to.email}>` : to.email))
            .join(", ")}
        </span>
      </p>
      <p>
        <span className="font-semibold">Subject:</span>{" "}
        <span>{mail.subject}</span>
      </p>
    </div>
    <HtmlRenderer html={mail.content} />
  </div>
));
MailViewer.displayName = "MailViewer";
