"use client";
import { getRecipeCategory, getSearchRecipes } from "@/api/questApi";
import CardRecipe from "@/components/CardRecipe";
import { SearchRecipes } from "@/components/SearchRecipe";
import { useStore } from "@/store/store";
import { RecipeType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";

const Recipe = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["recipes", searchQuery],
    queryFn: () =>
      searchQuery !== "" ? getSearchRecipes(searchQuery) : getRecipeCategory(),
    staleTime: 3600000,
  });

  const inputRef = useRef<any>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    if (inputValue === "") return setSearchQuery("");

    setSearchQuery(inputValue);
  };

  console.log(data);

  return (
    <div className="flex flex-col w-full gap-10">
      <SearchRecipes handleSearch={handleSearch} inRef={inputRef} />
      <div className="grid grid-cols-cards w-full gap-7">
        {isLoading && <p>Loading...</p>}
        {data?.slice(0, 10).map((recipe: RecipeType, index: number) => (
          <CardRecipe key={index} recipe={recipe} />
        ))}
        {data === null && <p>Your recipe {searchQuery} not found </p>}
      </div>
    </div>
  );
};

export default Recipe;
