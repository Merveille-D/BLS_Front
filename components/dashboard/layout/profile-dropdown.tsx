"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Mail, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { AuthRoutes } from "@/config/routes";
import { useCurrentUser } from "@/services/api-sdk/models/user/user";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
export default function ProfileDropdown() {
  const { data, isLoading, isError } = useCurrentUser();
  const name = useMemo(() => {
    if (isLoading && !data) return <Skeleton className="h-8 w-24" />;
    if (isError) return "Erreur";
    if (data) return `${data.firstname} ${data.lastname}`;
    return null;
  }, [data, isLoading, isError]);
  const email = useMemo(() => {
    if (isLoading && !data) return <Skeleton className="h-8 w-24" />;
    if (isError) return "Erreur";
    if (data) return data.email;
    return null;
  }, [data, isLoading, isError]);
  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer"
        >
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 gap-2 rounded-full p-0 text-foreground/75 sm:w-auto sm:rounded-none sm:px-4 sm:py-2"
            >
              <User size={30} />
              <span
                className={cn("sr-only sm:not-sr-only", {
                  "destructive italic": isError,
                  "italic text-muted-foreground": isLoading,
                })}
              >
                {name}
              </span>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        {data && <TooltipContent>{name}</TooltipContent>}
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer gap-2 sm:hidden">
          <User />
          <span
            className={cn({
              "destructive italic": isError,
              "italic text-muted-foreground": isLoading,
            })}
          >
            {name}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <Mail />
          <span
            className={cn({
              "destructive italic": isError,
              "italic text-muted-foreground": isLoading,
            })}
          >
            {email}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <Shield />
          <span>Admin</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer gap-2 text-destructive"
        >
          <Link href={AuthRoutes.logout}>
            <LogOut /> Deconnexion
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
