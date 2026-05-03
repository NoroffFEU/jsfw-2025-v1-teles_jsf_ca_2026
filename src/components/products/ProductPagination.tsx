import { Link } from "@tanstack/react-router";
import { Route } from "@/routes/index";

type ProductPaginationProps = {
  page: number;
  totalPages: number;
};

export const ProductPagination = ({
  page,
  totalPages,
}: ProductPaginationProps) => {
  return (
    <div className="flex justify-end gap-2 mt-2">
      {page > 1 && (
        <Link
          from={Route.fullPath}
          search={(prev) => ({ ...prev, page: prev.page - 1 })}
          className="flex items-end justify-self-end w-fit h-fit p-2 rounded border bg-background hover:border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
        >
          Previous Page
        </Link>
      )}

      {page < totalPages && (
        <Link
          from={Route.fullPath}
          search={(prev) => ({ ...prev, page: prev.page + 1 })}
          className="flex items-end justify-self-end w-fit h-fit p-2 rounded border bg-background hover:border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
        >
          Next Page
        </Link>
      )}
    </div>
  );
};
