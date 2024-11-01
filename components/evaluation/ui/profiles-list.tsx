"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ManageProfileDialog from "@/components/evaluation/modals/manage-profile-dialog";
import { useAllCollaboratorProfiles } from "@/services/api-sdk/models/evaluation/profile";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, RotateCw, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { UpdateCollaboratorProfileDialog } from "@/components/evaluation/modals/update-collaborator-profile-dialog";
import DeleteCollaboratorProfileButton from "@/components/evaluation/buttons/delete-collaborator-profile-button";
export default function ProfilesList() {
  const { data, isLoading, isError, refetch } = useAllCollaboratorProfiles();
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-5">
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
          onClick={() => refetch()}
        >
          <RotateCw />
          Reessayer
        </Button>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="grid auto-rows-fr gap-10 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="h-20 flex-1"
          />
        ))}
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucun élément trouvé
      </p>
    );
  }
  return (
    <div className="grid auto-rows-fr gap-10 sm:grid-cols-2 md:grid-cols-3">
      {data.map(({ id, title }) => (
        <Card
          key={id}
          className="group relative h-full overflow-hidden bg-primary text-primary-foreground"
        >
          <CardHeader className="h-full items-center justify-center">
            <CardTitle className="text-center">{title}</CardTitle>
          </CardHeader>
          <div className="absolute inset-0 rounded-lg from-black/50 opacity-0 transition group-hover:bg-gradient-to-t group-hover:opacity-100" />
          <div className="absolute bottom-0 right-1 flex translate-y-full items-center gap-2 transition-all group-hover:bottom-1 group-hover:translate-y-0">
            <ManageProfileDialog
              asChild
              defaultProfile={id}
            >
              <Button
                variant="ghost"
                size="icon"
                className="bg-accent/50"
              >
                <Eye />
              </Button>
            </ManageProfileDialog>

            <UpdateCollaboratorProfileDialog
              asChild
              profileId={id}
            >
              <Button
                variant="ghost"
                size="icon"
                className="bg-accent/50"
              >
                <Pencil />
              </Button>
            </UpdateCollaboratorProfileDialog>

            <DeleteCollaboratorProfileButton
              asChild
              profileId={id}
            >
              <Button
                variant="ghost"
                size="icon"
                className="bg-accent/50 text-destructive"
              >
                <Trash />
              </Button>
            </DeleteCollaboratorProfileButton>
          </div>
        </Card>
      ))}
    </div>
  );
}
