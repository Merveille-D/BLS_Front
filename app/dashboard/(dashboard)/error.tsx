"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
export default function DashboardError({ reset }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <Image
        src="/global/images/error.svg"
        alt="Error"
        width={300}
        height={300}
      />
      <p className="text-center text-lg italic text-secondary-foreground/75">
        Une erreur s&apos;est produite
      </p>
      <Button
        className="gap-2"
        onClick={reset}
      >
        <RotateCw />
        Reessayer
      </Button>
    </div>
  );
}
