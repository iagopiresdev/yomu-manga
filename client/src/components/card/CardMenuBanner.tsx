import React from "react";
import Dropdown from "../Dropdown";
import { FaUserEdit } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { MdImagesearchRoller } from "react-icons/md";

function CardMenu(props: {
  transparent?: boolean;
  onFieldChange: (field: string) => void;
}) {
  const { transparent, onFieldChange } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary text-white p-2 text-brand-500 hover:bg-light-text-accent dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <MdModeEditOutline className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p
            className="hover:text-black  flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
            onClick={() => onFieldChange("username")}
          >
            <span>
              <FaUserEdit />
            </span>
            Username
          </p>
          <p
            className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
            onClick={() => onFieldChange("name")}
          >
            <span>
              <MdVerifiedUser />
            </span>
            Name
          </p>

          {/** profile image */}
          <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            <span>
              <BiImageAdd />
            </span>
            Profile Image
          </p>
          <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            <span>
              <MdImagesearchRoller />
            </span>
            Banner
          </p>
        </div>
      }
    />
  );
}

export default CardMenu;
