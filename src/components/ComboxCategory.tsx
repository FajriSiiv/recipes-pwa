"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useStore } from "@/store/store";

const FormSchema = z.object({
  category: z.string({
    required_error: "Please select a category.",
  }),
});

export function ComboboxCategory({ categories }: any) {
  const { setCategoryFood, categoryFood }: any = useStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setCategoryFood(data.category);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex items-center gap-3"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }: any) => {
            return (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between")}
                      >
                        {field.value
                          ? categories.find(
                              (category: any) =>
                                category.strCategory === field.value
                            )?.strCategory
                          : categoryFood}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories?.map((category: any) => (
                          <CommandItem
                            value={category.strCategory}
                            key={category.strCategory}
                            onSelect={() => {
                              form.setValue("category", category.strCategory);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.strCategory === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.strCategory}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="!m-0">
          Submit
        </Button>
      </form>
    </Form>
  );
}
