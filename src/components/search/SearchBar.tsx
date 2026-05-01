import { Field, FieldLabel } from "../ui/input/field/Field";
import { Input } from "../ui/input/input/Input";
import { Button } from "../ui/button/Button";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { defaultSearch } from "@/lib/zod/searchSchema";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [inputQuery, setInputQuery] = useState("");
  const hasSearched = inputQuery.trim().length > 0;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = inputQuery.trim();
    navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        query: trimmedQuery,
        page: 1,
        sort: prev.sort ?? defaultSearch.sort,
      }),
    });
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setInputQuery("");
    navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        query: "",
        page: 1,
        sort: prev.sort ?? defaultSearch.sort,
      }),
    });
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
              onClick={hasSearched ? handleClearSearch : undefined}
            >
              {hasSearched ? "Clear" : "Search"}
            </Button>
          </div>
        </Field>
      </form>
    </div>
  );
};
