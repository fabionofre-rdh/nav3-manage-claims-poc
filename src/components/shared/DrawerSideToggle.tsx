import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";
import type { CommonProps } from "@/@types/common";

export interface DrawerSideToggleProps extends CommonProps {
  toggled?: boolean;
}

const DrawerSideToggle = ({ toggled, className }: DrawerSideToggleProps) => {
  return <div className={className}>{toggled ? <HiOutlineChevronDoubleLeft/> : <HiOutlineChevronDoubleRight />}</div>;
};

export default DrawerSideToggle;
