import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/index";
import { defaultSearch, type ProductSort } from "@/lib/zod/searchSchema";

export const SortSelect = () => {
  const navigate = useNavigate();
  const { sort } = Route.useSearch();

  return (
    <div className="mt-10">
      <Select
        value={sort}
        onValueChange={(nextSort) => {
          navigate({
            to: "/",
            search: (prev) => ({
              page: 1,
              query: prev.query ?? defaultSearch.query,
              sort: (nextSort as ProductSort) ?? defaultSearch.sort,
            }),
          });
        }}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="newest">Newest in</SelectItem>
            <SelectItem value="onSale">On Sale</SelectItem>
            <SelectItem value="ratingHigh">Highest Rating</SelectItem>
            <SelectItem value="priceLow">Lowest Price</SelectItem>
            <SelectItem value="priceHigh">Highest Price</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
