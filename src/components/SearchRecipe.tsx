import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export function SearchRecipes({ handleSearch, inRef }: any) {
  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input type="text" placeholder="Search recipe" ref={inRef} />
      <Button type="submit">Search</Button>
    </form>
  );
}
