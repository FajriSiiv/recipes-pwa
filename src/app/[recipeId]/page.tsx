"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/api/questApi";
import { useParams, useRouter } from "next/navigation";
import { RecipeType } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const DetailRecipe = () => {
  const routerPath = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery<RecipeType>({
    queryKey: ["recipeId"],
    queryFn: () => getRecipeById(routerPath.recipeId),
  });

  if (isLoading) return <p>Looading....</p>;

  return (
    <div className="p-10 flex flex-col">
      <h1 className="text-2xl font-semibold">{data?.strMeal}</h1>
      <span>{data?.strArea}</span>
      <span>{data?.strCategory}</span>
      <Image
        src={`${data?.strMealThumb}`}
        alt={`${data?.strMeal}`}
        width={400}
        height={400}
        rel="preload"
        priority={true}
      />

      <Button onClick={() => router.back()} className="mt-5 w-20">
        Back
      </Button>
    </div>
  );
};

export default DetailRecipe;
