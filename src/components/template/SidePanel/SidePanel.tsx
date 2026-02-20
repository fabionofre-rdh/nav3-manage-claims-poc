import classNames from "classnames";
import Drawer from "@/components/ui/Drawer";
import { PiGearDuotone } from "react-icons/pi";
import SidePanelContent, { SidePanelContentProps } from "./SidePanelContent";
import withHeaderItem from "@/utils/hoc/withHeaderItem";
import type { CommonProps } from "@/@types/common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";
import { setPanelExpand } from "@/redux/slices/themeSlice";

type SidePanelProps = SidePanelContentProps & CommonProps;

const _SidePanel = (props: SidePanelProps) => {
  const { className, ...rest } = props;

  const panelExpand = useSelector((state: AppState) => state.theme.panelExpand);
  const direction = useSelector((state: AppState) => state.theme.direction);
  const dispatch = useDispatch<AppDispatch>();

  const openPanel = () => {
    dispatch(setPanelExpand(true));
  };

  const closePanel = () => {
    dispatch(setPanelExpand(false));

    if (document) {
      const bodyClassList = document.body.classList;
      if (bodyClassList.contains("drawer-lock-scroll")) {
        bodyClassList.remove("drawer-lock-scroll", "drawer-open");
      }
    }
  };

  return (
    <>
      <div className={classNames("text-2xl", className)} onClick={openPanel} {...rest}>
        <PiGearDuotone />
      </div>
      <Drawer
        title="Theme Config"
        isOpen={panelExpand}
        placement={direction === "rtl" ? "left" : "right"}
        width={375}
        onClose={closePanel}
        onRequestClose={closePanel}
      >
        <SidePanelContent callBackClose={closePanel} />
      </Drawer>
    </>
  );
};

const SidePanel = withHeaderItem(_SidePanel);

export default SidePanel;
