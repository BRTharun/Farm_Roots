import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidLogOut } from "react-icons/bi";
// import { UseDispatch } from "react-redux";

interface UserDropDownProps {
    showOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropDownItemProps {
    path: string;
    title: string;
    icon : React.ReactNode;
    onClickDropdown: () => void;
}

const UserDropDown: React.FC<UserDropDownProps> = ({showOptions}) => {
    // const dispatch = UseDispatch();

    function onClickDropdown() {
        showOptions((prev) => !prev);
    }

    // function onLogoutBtnClick() {
    //     dispatch();
    // }

    return (
        <div className="top-0 flex flex-col shadow-2xl px-2 py-5 gap-4 rounded-md mt-40 md:mt-20 right-0 absolute w-60 bg-white">
            <DropdownItem
                icon={<AiOutlineShoppingCart className="text-lg" />}
                path="/myOrder"
                onClickDropdown={onClickDropdown}
                title= "My Orders"
                />
                 <DropdownItem
        icon={<AiOutlineHome className="text-lg" />}
        path="/address"
        onClickDropdown={onClickDropdown}
        title="Saved Address"
      />
      <div
        onClick={onClickDropdown}
        className="text-gray-600 hover:text-black transition-all flex items-center gap-4 text-sm cursor-pointer"
      >
        <BiSolidLogOut className="text-lg" />
        <button>Logout</button>
      </div>
                
        </div>
    )
};

export default UserDropDown;

const DropdownItem: React.FC<DropDownItemProps> = ({ path, title, icon, onClickDropdown }) => {
    return (
      <Link
        onClick={onClickDropdown}
        className="text-gray-600 hover:text-black transition-all text-sm flex items-center gap-4"
        to={path}
      >
        {icon}
        {title}
      </Link>
    );
  };
