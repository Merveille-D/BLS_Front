import { sanitize } from "@/lib/utils";
import { forwardRef } from "react";
export const HtmlRenderer = forwardRef(({ html, ...props }, ref) => (
  <div
    ref={ref}
    dangerouslySetInnerHTML={{ __html: sanitize(html) }}
    {...props}
  />
));
HtmlRenderer.displayName = "HtmlRenderer";
