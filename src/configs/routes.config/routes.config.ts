import { lazy } from "react";
import authRoute from "./authRoute";
import othersRoute from "./othersRoute";
import type { Routes } from "@/@types/routes";

export const publicRoutes: Routes = [...authRoute];

export const protectedRoutes: Routes = [
  {
    key: "home",
    path: "/home",
    component: lazy(() => import("@/views/Home")),
    authority: [],
  },
  {
    key: "manage-claims",
    path: "/manage-claims",
    component: lazy(() => import("@/views/manage-claims/ManageClaims")),
    authority: [],
  },
  {
    key: "manage-claims.detail",
    path: "/manage-claims/:claimId",
    component: lazy(() => import("@/views/manage-claims/ClaimDetail")),
    authority: [],
  },
  ...othersRoute,
];
