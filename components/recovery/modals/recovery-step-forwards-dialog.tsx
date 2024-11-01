import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { MoveRight } from "lucide-react";
export default function RecoveryStepForwardsDialog({ forwards, ...props }) {
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="flex max-h-screen max-w-xl flex-col">
        <DialogHeader>
          <DialogTitle>Historique des transferts</DialogTitle>
          <DialogDescription>Historique des transferts</DialogDescription>
        </DialogHeader>
        <div className="flex-1 space-y-5 overflow-auto">
          {forwards?.map(({ id, dueDate, title, sender, receiver }) => (
            <Card key={id}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="space-x-5 text-lg">
                  <span className="text-destructive">
                    {sender.firstname} {sender.lastname}
                  </span>
                  <MoveRight className="inline" />
                  <span className="text-primary">
                    {receiver.firstname}
                    {receiver.lastname}
                  </span>
                </CardDescription>
                <CardDescription className="italic">
                  Transféré le {formatDate(dueDate)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
