import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModulesRoutes } from "@/config/routes";
import { Component } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { AuditRoutes } from "@/config/routes/audit";
export function AuditDetailsPageBreadcrumb({ auditTitle }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ModulesRoutes.modules}>
              <Component />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BreadcrumbEllipsis aria-label="Toggle menu" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={AuditRoutes.auditsList}>Audit</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <div className="hidden sm:contents">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={AuditRoutes.auditsList}>Audit</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </div>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{auditTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
