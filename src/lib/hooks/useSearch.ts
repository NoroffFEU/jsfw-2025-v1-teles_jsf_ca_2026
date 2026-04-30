import { useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "@/lib/productsQuery";

export const useSearch = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [query, setQuery] = useState("");

  const { data, isFetching, error } = useQuery(productsQuery());
  const q = query.trim().toLocaleLowerCase();

  const results = useMemo(() => {
    const products = data?.data;
    if (!q || !products) return [];

    return products.filter((p) => {
      const byTitle = p.title.trim().toLowerCase().includes(q);
      const byTags = p.tags.some((tag) => tag.trim().toLowerCase().includes(q));
      const byDescription = p.description.trim().toLowerCase().includes(q);
      return byTitle || byTags || byDescription;
    });
  }, [data?.data, q]);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery.trim().toLocaleLowerCase());
  }, []);

  const clearSearch = useCallback(() => {
    setInputQuery("");
    setQuery("");
  }, []);

  return {
    inputQuery,
    setInputQuery,
    query,
    results,
    hasResults: results.length > 0,
    search,
    clearSearch,
    isLoading: isFetching,
    error: error instanceof Error ? error?.message : null,
  };
};
