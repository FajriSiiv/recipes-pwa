"use client";
import { RecipeType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const CardRecipe = ({ recipe }: RecipeType) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-2 p-2 border-2 rounded-sm">
      <div className="flex gap-2 flex-col">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          width={250}
          height={250}
          className="rounded-sm object-cover w-full"
          rel="preload"
          priority={true}
        />
        <h2 className="text-xl font-semibold">{recipe.strMeal}</h2>
      </div>
      <Button
        onClick={() => router.push("/" + recipe.idMeal)}
        className="bg-emerald-500"
      >
        See Recipe
      </Button>
    </div>
  );
};

export default CardRecipe;
