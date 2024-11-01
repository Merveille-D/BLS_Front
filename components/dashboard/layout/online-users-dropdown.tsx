import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
export default function OnlineUsersDropdown() {
  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer"
        >
          <TooltipTrigger asChild>
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>BH</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <TooltipContent className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary" />
          <span>2 utilisateurs en ligne</span>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuLabel>En ligne</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-card-foreground/75">Jacques DOSSOU</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-card-foreground/75">Barnabé HONVO</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Vu(s) récemment</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer gap-2">
            <span className="h-3 w-3 rounded-full bg-muted-foreground" />
            <span className="text-card-foreground/75">Elisabeth DANSOU</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer gap-2">
            <span className="h-3 w-3 rounded-full bg-muted-foreground" />
            <span className="text-card-foreground/75">William HONFO</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
