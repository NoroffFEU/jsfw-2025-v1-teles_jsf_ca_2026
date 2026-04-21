import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

export const SortSelect = () => {
  return (
    <div className="mt-10">
      <Select>
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="onSale">On Sale</SelectItem>
            <SelectItem value="priceLow">Lowest Price</SelectItem>
            <SelectItem value="priceHigh">Highest Price</SelectItem>
            <SelectItem value="ratingHigh">Highest Rating</SelectItem>
            <SelectItem value="ratingLow">Lowest Rating</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
