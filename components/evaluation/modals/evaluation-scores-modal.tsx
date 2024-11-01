import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import EvaluationScoresView from "@/components/evaluation/ui/evaluation-scores-view";
export default function EvaluationScoresModal({
  collaborator,
  evaluator,
  globalScore,
  scores,
  ...props
}) {
  return (
    <Sheet>
      <SheetTrigger {...props} />
      <SheetContent
        side="right"
        closeClassName="md:hidden"
        className="flex w-full flex-col gap-5 sm:w-3/4 sm:max-w-xl"
      >
        <SheetHeader>
          <div className="sm:flex sm:items-center sm:justify-between">
            <SheetTitle>
              {collaborator.lastname} {collaborator.firstname}
            </SheetTitle>
          </div>
          <SheetDescription className="line-clamp-1">
            Evalué par{" "}
            <span className="italic">
              {evaluator.lastname} {evaluator.firstname}
            </span>
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-10 overflow-auto py-2">
          <EvaluationScoresView
            label="Notes"
            globalScore={globalScore}
            scores={scores}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="destructive">Fermer</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
