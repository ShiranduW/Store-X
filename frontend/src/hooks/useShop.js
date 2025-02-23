import { useState, useMemo } from "react";

export function useShop(products) {
  const [sortBy, setSortBy] = useState("default");
  const [category, setCategory] = useState("all");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        return result.sort((a, b) => a.price - b.price);
      case "price-desc":
        return result.sort((a, b) => b.price - a.price);
      default:
        return result;
    }
  }, [products, sortBy, category]);

  return {
    sortBy,
    setSortBy,
    category,
    setCategory,
    filteredAndSortedProducts,
  };
} 