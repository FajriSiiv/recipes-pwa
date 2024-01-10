export const getRecipeCategory = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
  );

  const data = await res.json();

  return data.meals;
};

export const getRecipeById = async (idMeal: string | string[]) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );

  const data = await res.json();

  return data.meals[0];
};

export const getSearchRecipes = async (searchQuery: any) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
  );

  const data = await res.json();

  return data.meals;
};
