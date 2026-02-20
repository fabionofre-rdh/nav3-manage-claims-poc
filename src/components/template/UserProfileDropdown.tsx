import Avatar from "@/components/ui/Avatar";
import Dropdown from "@/components/ui/Dropdown";
import withHeaderItem from "@/utils/hoc/withHeaderItem";
import { Link } from "react-router-dom";
import { PiUserDuotone, PiSignOutDuotone } from "react-icons/pi";
import { useAuth } from "@/auth";
import { useCallback, type JSX } from "react";
import { useMsal } from "@azure/msal-react";

type DropdownList = {
  label: string;
  path: string;
  icon: JSX.Element;
};

const dropdownItemList: DropdownList[] = [];

const _UserDropdown = () => {
  const { accounts } = useMsal();

  const { signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    signOut();
  }, [signOut]);

  const userName = accounts && accounts.length > 0 ? accounts[0].name : "Anonymous";
  const userEmail = accounts && accounts.length > 0 ? accounts[0].username : "No email available";

  const avatarProps = {
    ...{ icon: <PiUserDuotone /> },
  };

  return (
    <Dropdown
      className="flex"
      toggleClassName="flex items-center"
      renderTitle={
        <div className="cursor-pointer flex items-center">
          <Avatar size={32} {...avatarProps} />
        </div>
      }
      placement="bottom-end"
    >
      <Dropdown.Item variant="header">
        <div className="py-2 px-3 flex items-center gap-3">
          <Avatar {...avatarProps} />
          <div>
            <div className="font-bold text-gray-900 dark:text-gray-100">
              {userName || "Anonymous"}
            </div>
            <div className="text-xs">{userEmail || "No email available"}</div>
          </div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item variant="divider" />
      {dropdownItemList.map((item) => (
        <Dropdown.Item key={item.label} eventKey={item.label} className="px-0">
          <Link className="flex h-full w-full px-2" to={item.path}>
            <span className="flex gap-2 items-center w-full">
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </span>
          </Link>
        </Dropdown.Item>
      ))}
      <Dropdown.Item eventKey="Sign Out" className="gap-2" onClick={handleSignOut}>
        <span className="text-xl">
          <PiSignOutDuotone />
        </span>
        <span>Sign Out</span>
      </Dropdown.Item>
    </Dropdown>
  );
};

const UserDropdown = withHeaderItem(_UserDropdown);

export default UserDropdown;
