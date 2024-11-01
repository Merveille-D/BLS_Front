import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModulesRoutes } from "@/config/routes";
import { Component } from "lucide-react";
export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="h-1/3 w-1/3 bg-[url('/global/images/not-found.svg')] bg-center bg-no-repeat" />
      <h1 className="text-center text-3xl font-bold sm:text-4xl">
        Oops! Cette page n&apos;existe pas.
      </h1>
      <Button
        asChild
        className="gap-2"
      >
        <Link href={ModulesRoutes.modules}>
          <Component size={24} />
          Retourner à la page des modules
        </Link>
      </Button>
    </main>
  );
}
