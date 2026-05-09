import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { defaultSearch } from "@/lib/zod/searchSchema";

export const useSearchBar = () => {
  const navigate = useNavigate();
  const [inputQuery, setInputQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const showClearSearch =
    submittedQuery.length > 0 && inputQuery.trim() === submittedQuery;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
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
      resetScroll: false,
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return {
    inputQuery,
    showClearSearch,
    handleSubmit,
    handleOnChange,
    handleClearSearch,
  };
};
