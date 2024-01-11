"use client";

import React, { useEffect, useState } from "react";
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

  const IngridientsComponent = () => {
    const arrayIngri = [];

    for (let i = 1; i <= 20; i++) {
      const propertyName = `strIngredient${i}`;
      const ingredientValue = data?.[propertyName];
      if (
        typeof ingredientValue === "string" &&
        ingredientValue.trim() !== ""
      ) {
        arrayIngri.push(ingredientValue);
      }
    }

    return (
      <div className="flex flex-wrap gap-2">
        {arrayIngri?.map((ingridients, index: any) => (
          <span
            key={index}
            className="border-2 py-1 px-5 rounded-sm border-foreground capitalize text-sm"
          >
            {ingridients}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-10 max-md:p-3">
      <Button onClick={() => router.back()} className="w-20 mb-5">
        Back
      </Button>
      {isLoading && <p>Loading..</p>}
      {data && (
        <div className=" flex h-full gap-5 max-md:flex-col ">
          <div className="flex-1">
            <Image
              src={`${data?.strMealThumb}`}
              alt={`${data?.strMeal}`}
              width={400}
              height={400}
              rel="preload"
              priority={true}
              layout="fixed"
              className="w-full max-h-[600px]"
            />
          </div>
          <div className="flex flex-col gap-y-2 flex-1">
            <h1 className="text-2xl font-semibold">#{data?.strMeal}</h1>
            <div className="flex justify-between text-sm">
              <span className="font-bold">{data?.strCategory}</span>
              <span>{data?.strArea}</span>
            </div>
            <p>{data?.strInstructions}</p>
            <div className="flex flex-wrap gap-2">
              {data?.strTags?.split(",").map((tag, index) => (
                <span
                  key={index}
                  className="border-2 py-1 px-5 rounded-sm border-foreground text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-5 flex gap-2 flex-col">
              <h2 className="text-xl font-semibold">#Ingredients</h2>
              <IngridientsComponent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailRecipe;
