import * as React from "react";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { itemVariants, itemMediaVariants } from "./item-variants";

const ItemGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        className,
      )}
      {...props}
    />
  );
};

const Item = ({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemVariants>) => {
  return (
    <div
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    ></div>
  );
};

const ItemMedia = ({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) => {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
};

const ItemContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className,
      )}
      {...props}
    />
  );
};

const ItemTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "cn-font-heading line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4",
        className,
      )}
      {...props}
    />
  );
};

const ItemDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
};

const ItemActions = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
};

const ItemHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
};

const ItemFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
};

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
