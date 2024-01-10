"use client";
import { getRecipeCategory } from "@/api/questApi";
import CardRecipe from "@/components/CardRecipe";
import { RecipeType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const Recipe = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipeCategory,
    staleTime: 3600000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-cards w-full gap-7">
      {data.meals.slice(0, 10).map((recipe: RecipeType, index: number) => (
        <CardRecipe key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default Recipe;
