import {
  NAV_ITEM_TYPE_ITEM,
} from "@/constants/navigation.constant";

import type { NavigationTree } from "@/@types/navigation";

const navigationConfig: NavigationTree[] = [
  {
    key: "home",
    path: "/home",
    title: "Home",
    translateKey: "nav.home",
    icon: "home",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "manage-claims",
    path: "/manage-claims",
    title: "Manage Claims",
    translateKey: "nav.manageClaims",
    icon: "manageClaims",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
];

export default navigationConfig;
