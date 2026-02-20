import {
  PiHouseLineDuotone,
  PiArrowsInDuotone,
  PiBookOpenUserDuotone,
  PiBookBookmarkDuotone,
  PiAcornDuotone,
  PiBagSimpleDuotone,
  PiPerson,
} from "react-icons/pi";
import { GoOrganization } from "react-icons/go";
import { MdAccountBalance } from "react-icons/md";

import type { JSX } from "react";
import { FaBoxes, FaRegBuilding } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { LuNotebook } from "react-icons/lu";
import { MdOutlineReceiptLong } from "react-icons/md";

export type NavigationIcons = Record<string, JSX.Element>;

const navigationIcon: NavigationIcons = {
  home: <PiHouseLineDuotone />,
  members: <PiPerson />,
  products: <FaBoxes />,
  accounts: <MdAccountBalance />,
  singleMenu: <PiAcornDuotone />,
  collapseMenu: <PiArrowsInDuotone />,
  groupSingleMenu: <PiBookOpenUserDuotone />,
  groupCollapseMenu: <PiBookBookmarkDuotone />,
  groupMenu: <PiBagSimpleDuotone />,
  plans: <GoOrganization />,
  clients: <FaRegBuilding />,
  careLogistics: <LuNotebook />,
  manageClaims: <MdOutlineReceiptLong />,
};

export default navigationIcon;
