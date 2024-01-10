import { ThemeProvider } from "@/components/theme-dark";
import { ModeToggle } from "@/components/toggleDark";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import LayoutQuery from "@/components/layout";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["cyrillic", "latin"],
});

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "Recipes Around World",
  description: "Recipe Search",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/pan.ico" />
        <link rel="preconnect" href="https://www.themealdb.com" />
        <meta name="theme-color" content="#000" />
      </head>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutQuery>
            <div className="absolute top-5 right-5">
              <ModeToggle />
            </div>
            {children}
            <Toaster />
          </LayoutQuery>
        </ThemeProvider>
      </body>
    </html>
  );
}
