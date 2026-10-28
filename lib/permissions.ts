export type UserRole =
  | "superadmin"
  | "area_administrator"
  | "viewer"
  | "data_enumerator"
  | "field_coordinator"
  | "ec_focal_point";

export interface RoleDefinition {
  value: UserRole;
  label: string;
  badgeClass: string;
  capabilities: string;
  description: string;
  canUpload: boolean;
  canEdit: boolean;
  canVerify: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
}

export const USER_ROLES: Record<UserRole, RoleDefinition> = {
  superadmin: {
    value: "superadmin",
    label: "Superadmin",
    badgeClass:
      "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
    capabilities: "All Access (Add, Upload, Edit, Verify, Delete)",
    description: "Full access across all system modules, folder management, and user permissions.",
    canUpload: true,
    canEdit: true,
    canVerify: true,
    canDelete: true,
    canManageUsers: true,
  },
  area_administrator: {
    value: "area_administrator",
    label: "Area Administrator",
    badgeClass:
      "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
    capabilities: "Edit & Verify",
    description: "Authorized to review, verify, and edit assessment records and documents.",
    canUpload: false,
    canEdit: true,
    canVerify: true,
    canDelete: false,
    canManageUsers: true,
  },
  field_coordinator: {
    value: "field_coordinator",
    label: "Field Coordinator",
    badgeClass:
      "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    capabilities: "Upload & Edit",
    description: "Authorized to upload new assessment data/documents and edit existing records.",
    canUpload: true,
    canEdit: true,
    canVerify: false,
    canDelete: false,
    canManageUsers: false,
  },
  ec_focal_point: {
    value: "ec_focal_point",
    label: "EC Focal Point",
    badgeClass:
      "bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800",
    capabilities: "Upload & Edit",
    description: "Authorized to upload evacuation centre data and edit assessment records.",
    canUpload: true,
    canEdit: true,
    canVerify: false,
    canDelete: false,
    canManageUsers: false,
  },
  data_enumerator: {
    value: "data_enumerator",
    label: "Data Enumerator",
    badgeClass:
      "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    capabilities: "Upload",
    description: "Authorized to submit and upload field assessment data and reports.",
    canUpload: true,
    canEdit: false,
    canVerify: false,
    canDelete: false,
    canManageUsers: false,
  },
  viewer: {
    value: "viewer",
    label: "Viewer",
    badgeClass:
      "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    capabilities: "View Only",
    description: "Read-only access to view authorized datasets, reports, and dashboards.",
    canUpload: false,
    canEdit: false,
    canVerify: false,
    canDelete: false,
    canManageUsers: false,
  },
};

export const ROLE_OPTIONS: RoleDefinition[] = [
  USER_ROLES.superadmin,
  USER_ROLES.area_administrator,
  USER_ROLES.field_coordinator,
  USER_ROLES.ec_focal_point,
  USER_ROLES.data_enumerator,
  USER_ROLES.viewer,
];

export function normalizeRoleKey(role?: string): UserRole {
  if (!role) return "viewer";
  const r = role.toLowerCase().trim().replace(/[\s-]+/g, "_");
  if (r === "superadmin") return "superadmin";
  if (r === "area_administrator" || r === "area_admin") return "area_administrator";
  if (r === "field_coordinator") return "field_coordinator";
  if (r === "ec_focal_point") return "ec_focal_point";
  if (r === "data_enumerator") return "data_enumerator";
  if (r === "viewer") return "viewer";
  return "viewer";
}

export function getRolePermissions(role?: string) {
  const key = normalizeRoleKey(role);
  const def = USER_ROLES[key] || USER_ROLES.viewer;
  return {
    roleKey: key,
    roleLabel: def.label,
    description: def.description,
    capabilities: def.capabilities,
    badgeClass: def.badgeClass,
    isSuperAdmin: key === "superadmin",
    isAreaAdmin: key === "area_administrator",
    isFieldCoordinator: key === "field_coordinator",
    isEcFocalPoint: key === "ec_focal_point",
    isDataEnumerator: key === "data_enumerator",
    isViewer: key === "viewer",
    canAdd: def.canUpload,
    canUpload: def.canUpload,
    canEdit: def.canEdit,
    canVerify: def.canVerify,
    canDelete: def.canDelete,
    canManageUsers: def.canManageUsers,
  };
}
