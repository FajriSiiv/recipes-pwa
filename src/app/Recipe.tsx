"use client";
import {
  getCategory,
  getRecipeCategory,
  getSearchRecipes,
} from "@/api/questApi";
import CardRecipe from "@/components/CardRecipe";
import { ComboboxCategory } from "@/components/ComboxCategory";
import { SearchRecipes } from "@/components/SearchRecipe";
import { useStore } from "@/store/store";
import { RecipeType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";

const Recipe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { categoryFood }: any = useStore();

  const { data, isLoading } = useQuery({
    queryKey: ["recipes", searchQuery, categoryFood],
    queryFn: () =>
      searchQuery !== ""
        ? getSearchRecipes(searchQuery)
        : getRecipeCategory(categoryFood),
    staleTime: 3600000,
  });

  const { data: category, isLoading: loadingCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });

  const inputRef = useRef<any>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    if (inputValue === "") return setSearchQuery("");

    setSearchQuery(inputValue);
  };

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex justify-between items-center max-md:flex-col gap-2">
        <SearchRecipes handleSearch={handleSearch} inRef={inputRef} />
        <ComboboxCategory categories={category} />
      </div>
      <div className="grid grid-cols-cards w-full gap-7">
        {(isLoading && <p>Loading...</p>) ||
          (loadingCategory && <p>Loading...</p>)}
        {data?.map((recipe: RecipeType, index: number) => (
          <CardRecipe key={index} recipe={recipe} />
        ))}
        {data === null && <p>Your recipe {searchQuery} not found </p>}
      </div>
    </div>
  );
};

export default Recipe;
