import withHeaderItem from "@/utils/hoc/withHeaderItem";
import useResponsive from "@/utils/hooks/useResponsive";
import NavToggle from "@/components/shared/NavToggle";
import type { CommonProps } from "@/@types/common";
import { AppDispatch, AppState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setSideNavCollapse } from "@/redux/slices/themeSlice";

const _SideNavToggle = ({ className }: CommonProps) => {
  const { layout } = useSelector((state: AppState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  const sideNavCollapse = layout.sideNavCollapse;

  const { larger } = useResponsive();

  const onCollapse = () => {
    dispatch(setSideNavCollapse(!sideNavCollapse));
  };

  return (
    <>
      {larger.md && (
        <div className={className} role="button" onClick={onCollapse}>
          <NavToggle className="text-2xl" toggled={sideNavCollapse} />
        </div>
      )}
    </>
  );
};

const SideNavToggle = withHeaderItem(_SideNavToggle);

export default SideNavToggle;
