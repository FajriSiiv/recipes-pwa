import { create } from "zustand";

export const useStore = create((set) => ({
  recipeFood: null,
  setArrayFood: (recipe: any) => set({ recipeFood: recipe }),
}));
