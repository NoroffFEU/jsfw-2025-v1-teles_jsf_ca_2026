import * as React from "react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "./badge-variants";

export const Badge = ({
  children,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) => {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
};
