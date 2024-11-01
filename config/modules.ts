import GovernanceIcon from "@/components/ui/governance-icon";
import ContractsIcon from "@/components/ui/contracts-icon";
import SafetyIcon from "@/components/ui/safety-icon";
import AccountIncidentIcon from "@/components/ui/account-incident-icon";
import LitigationIcon from "@/components/ui/litigation-icon";
import RecoveryIcon from "@/components/ui/recovery-icon";
import AuditIcon from "@/components/ui/audit-icon";
import EvaluationIcon from "@/components/ui/evaluation-icon";
import LegalMonitoringIcon from "@/components/ui/legal-monitoring-icon";
import TextBankIcon from "@/components/ui/text-bank-icon";
import {
  AccountIncidentRoutes,
  AdministrationMeetingRoutes,
  AuditRoutes,
  ContractRoutes,
  EvaluationRoutes,
  GeneralMeetingRoutes,
  LegalMonitoringRoutes,
  LitigationRoutes,
  ManagementCommitteeRoutes,
  ModulesRoutes,
  MortgageRoutes,
  MovableSafetyRoutes,
  PersonalSafetyRoutes,
  ShareholdingRoutes,
  TextsBankRoutes,
} from "@/config/routes";
import { RecoveryRoutes } from "@/config/routes/recovery";
import { Landmark, ShieldCheck, Users } from "lucide-react";
import {
  RolesRoutes,
  SubsidiariesRoutes,
  UsersRoutes,
} from "@/config/routes/administration";
export const getModulesData = (intl) => [
  {
    slug: "governance",
    href: ModulesRoutes.submodules("governance"),
    name: intl.formatMessage({
      id: "modules.governance",
      defaultMessage: "Governance",
    }),
    Icon: GovernanceIcon,
    submodules: [
      {
        slug: "shareholding",
        href: ShareholdingRoutes.index,
        name: intl.formatMessage({
          id: "modules.shareholding",
          defaultMessage: "Shareholding",
        }),
      },
      {
        slug: "general-meeting",
        href: GeneralMeetingRoutes.index,
        name: intl.formatMessage({
          id: "modules.generalMeeting",
          defaultMessage: "General Meeting",
        }),
      },
      {
        slug: "administration-meeting",
        href: AdministrationMeetingRoutes.index,
        name: intl.formatMessage({
          id: "modules.boardOfDirectors",
          defaultMessage: "Board of Directors",
        }),
      },
      {
        slug: "management-committee",
        href: ManagementCommitteeRoutes.index,
        name: intl.formatMessage({
          id: "modules.managementCommittee",
          defaultMessage: "Management Committee",
        }),
      },
    ],
  },
  {
    slug: "contracts",
    href: ContractRoutes.index,
    name: intl.formatMessage({
      id: "modules.contracts",
      defaultMessage: "Contract",
    }),
    Icon: ContractsIcon,
  },
  {
    slug: "safety",
    href: ModulesRoutes.submodules("safety"),
    name: intl.formatMessage({
      id: "modules.safety",
      defaultMessage: "Safety",
    }),
    Icon: SafetyIcon,
    submodules: [
      {
        slug: "personal-safety",
        href: PersonalSafetyRoutes.index,
        name: intl.formatMessage({
          id: "modules.personalSafety",
          defaultMessage: "Personal Safety",
        }),
      },
      {
        slug: "movable-safety",
        href: MovableSafetyRoutes.index,
        name: intl.formatMessage({
          id: "modules.realMovableSafety",
          defaultMessage: "Real Movable Safety",
        }),
      },
      {
        slug: "real-estate-safety",
        href: MortgageRoutes.index,
        name: intl.formatMessage({
          id: "modules.realEstateSafety",
          defaultMessage: "Real Estate Safety",
        }),
      },
    ],
  },
  {
    slug: "account-incidents",
    href: AccountIncidentRoutes.index,
    name: intl.formatMessage({
      id: "modules.accountIncidents",
      defaultMessage: "Account Incidents",
    }),
    Icon: AccountIncidentIcon,
  },
  {
    slug: "litigation",
    href: LitigationRoutes.index,
    name: intl.formatMessage({
      id: "modules.litigation",
      defaultMessage: "Litigation",
    }),
    Icon: LitigationIcon,
  },
  {
    slug: "recovery",
    href: RecoveryRoutes.index,
    name: intl.formatMessage({
      id: "modules.recovery",
      defaultMessage: "Recovery",
    }),
    Icon: RecoveryIcon,
  },
  {
    slug: "audit",
    href: AuditRoutes.index,
    name: intl.formatMessage({
      id: "modules.audit",
      defaultMessage: "Audit",
    }),
    Icon: AuditIcon,
  },
  {
    slug: "evaluation",
    href: EvaluationRoutes.index,
    name: intl.formatMessage({
      id: "modules.evaluation",
      defaultMessage: "Evaluation",
    }),
    Icon: EvaluationIcon,
  },
  {
    slug: "legal-monitoring",
    href: LegalMonitoringRoutes.index,
    name: intl.formatMessage({
      id: "modules.legalMonitoring",
      defaultMessage: "Legal Monitoring",
    }),
    Icon: LegalMonitoringIcon,
  },
  {
    slug: "text-bank",
    href: TextsBankRoutes.index,
    name: intl.formatMessage({
      id: "modules.textBank",
      defaultMessage: "Documents Bank",
    }),
    Icon: TextBankIcon,
  },
];
export const getSubmodules = (intl, slug) => {
  const matchingModule = getModulesData(intl).find(
    (module) => module.slug === slug,
  );
  return matchingModule?.submodules ?? [];
};
export const getAdministrationModules = (intl) => [
  {
    slug: "users",
    href: UsersRoutes.index,
    name: intl.formatMessage({
      id: "modules.users",
      defaultMessage: "Users",
    }),
    Icon: Users,
  },
  {
    slug: "roles",
    href: RolesRoutes.index,
    name: intl.formatMessage({
      id: "modules.roles",
      defaultMessage: "Roles",
    }),
    Icon: ShieldCheck,
  },
  {
    slug: "subsidiaries",
    href: SubsidiariesRoutes.index,
    name: intl.formatMessage({
      id: "modules.subsidiaries",
      defaultMessage: "Subsidiaries",
    }),
    Icon: Landmark,
  },
];
