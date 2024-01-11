import { create } from "zustand";

export const useStore = create((set) => ({
  categoryFood: "Seafood",
  setCategoryFood: (category: any) => set({ categoryFood: category }),
}));
