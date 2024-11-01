"use client";
import {
  QueryClient,
  QueryClientProvider as TSQueryClientProvider,
} from "@tanstack/react-query";
export default function QueryClientProvider({ children }) {
  const queryClient = new QueryClient();
  return (
    <TSQueryClientProvider client={queryClient}>
      {children}
    </TSQueryClientProvider>
  );
}
