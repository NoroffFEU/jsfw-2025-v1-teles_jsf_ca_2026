import * as React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => {
  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      role="separator"
      data-slot="separator"
      className={cn("shrink-0 bg-border h-px w-full", className)}
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export { Separator };
