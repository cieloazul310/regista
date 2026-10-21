"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}

export default ThemeProvider;
