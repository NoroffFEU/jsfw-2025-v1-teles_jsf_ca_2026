import { useState } from "react";
import { Field, FieldLabel } from "../ui/input/field/Field";
import { Input } from "../ui/input/input/Input";
import { Button } from "../ui/button/Button";

export const SearchBar = () => {
  // const [query, setQuery] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = () => {
    // do something with the query
    setIsDisabled(true);
  };

  return (
    <Field className="max-w-100">
      <FieldLabel htmlFor="search" className="sr-only">
        Search for products
      </FieldLabel>

      <div className="flex flex-row gap-2 items-center">
        <Input
          id="search"
          name="search"
          placeholder="Search..."
          autoComplete="off"
        />
        <Button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={
            isDisabled
              ? `opacity-50 cursor-not-allowed`
              : `hover:brightness-80 cursor-pointer`
          }
        >
          Search
        </Button>
      </div>
    </Field>
  );
};
