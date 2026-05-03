import { Field, FieldLabel } from "../ui/input/field/Field";
import { Input } from "../ui/input/input/Input";
import { Button } from "../ui/button/Button";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { defaultSearch } from "@/lib/zod/searchSchema";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [inputQuery, setInputQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const showClearSearch =
    submittedQuery.length > 0 && inputQuery.trim() === submittedQuery;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = inputQuery.trim();
    setInputQuery(trimmedQuery);
    setSubmittedQuery(trimmedQuery);

    navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        query: trimmedQuery,
        page: 1,
        sort: prev.sort ?? defaultSearch.sort,
      }),
      state: {
        scrollToResultId: Date.now(),
      },
    });
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setInputQuery("");
    setSubmittedQuery("");
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
