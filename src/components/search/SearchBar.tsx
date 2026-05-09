import { Field, FieldLabel } from "@/components/ui/input/field/Field";
import { Input } from "@/components/ui/input/input/Input";
import { Button } from "@/components/ui/button/Button";
import { useSearchBar } from "@/hooks/useSearchBar";

export const SearchBar = () => {
  const {
    inputQuery,
    showClearSearch,
    handleSubmit,
    handleOnChange,
    handleClearSearch,
  } = useSearchBar();

  return (
    <div className="grid">
      <form id="contact-form" onSubmit={handleSubmit}>
        <Field className="max-w-100 md:w-100">
          <FieldLabel htmlFor="search" className="sr-only">
            Search for products
          </FieldLabel>

          <div className="flex flex-row gap-2 items-center">
            <Input
              id="search"
              name="search"
              placeholder="Search..."
              autoComplete="off"
              value={inputQuery}
              onChange={handleOnChange}
            />

            <Button
              type={showClearSearch ? "button" : "submit"}
              onClick={showClearSearch ? handleClearSearch : undefined}
            >
              {showClearSearch ? "Clear" : "Search"}
            </Button>
          </div>
        </Field>
      </form>
    </div>
  );
};
