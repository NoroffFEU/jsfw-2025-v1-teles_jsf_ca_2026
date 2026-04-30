import { Field, FieldLabel } from "../ui/input/field/Field";
import { Input } from "../ui/input/input/Input";
import { Button } from "../ui/button/Button";
import { useSearch } from "@/lib/hooks/useSearch";
import type { ChangeEvent, SubmitEvent } from "react";

export const SearchBar = () => {
  const {
    inputQuery,
    setInputQuery,
    query,
    results,
    hasResults,
    search,
    clearSearch,
    error,
  } = useSearch();

  const hasSearched = query.length > 0;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = inputQuery.trim();
    if (!searchValue) return;

    search(searchValue);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  const handleClearSearch = () => {
    if (hasSearched) {
      clearSearch();
    }
  };

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
              type={hasSearched ? "button" : "submit"}
              onClick={handleClearSearch}
            >
              {hasSearched ? "Clear" : "Search"}
            </Button>
          </div>
        </Field>
      </form>

      {query && (
        <p className="mt-4 justify-self-center text-sm text-gray-400">
          {hasResults
            ? `Got ${results.length} results for "${query}"`
            : `No results found for "${query}"`}
        </p>
      )}

      {error && (
        <p className="mt-4 justify-self-center text-md text-red-600">
          Something went wrong with this search
        </p>
      )}
    </div>
  );
};
