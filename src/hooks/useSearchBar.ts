import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { defaultSearch } from "@/lib/zod/searchSchema";

/**
 * Manages search input state, form submission, and URL search params.
 * Updates `query`, resets `page: 1`, preserves `sort` on submit/clear.
 * Triggers `scrollToResultId` state for `useScrollToFirstResults`.
 *
 * Integrates with Zod `defaultSearch` schema for fallback values.
 *
 * @returns {Object} Search bar handlers and state
 * @returns {string} returns.inputQuery - Current input value
 * @returns {boolean} returns.showClearSearch - True when search can be cleared
 * @returns {(e: React.FormEvent) => void} returns.handleSubmit - Form submit handler
 * @returns {(e: React.ChangeEvent) => void} returns.handleOnChange - Input change handler
 * @returns {() => void} returns.handleClearSearch - Clear search + reset URL
 *
 * @example
 * const { inputQuery, handleSubmit, handleOnChange, showClearSearch, handleClearSearch } = useSearchBar();
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input value={inputQuery} onChange={handleOnChange} />
 *     {showClearSearch && <button onClick={handleClearSearch}>Clear</button>}
 *   </form>
 * );
 */
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
