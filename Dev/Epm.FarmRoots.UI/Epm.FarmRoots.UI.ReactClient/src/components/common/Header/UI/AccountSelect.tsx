import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch } from "react-redux"; 
import { setLoginComponent } from "../../../store/Reducer/headerLoginSlice";
import UserDropDown from "./UserDropDown";

const AccountSelect: React.FC = () => {
  const auth = true; 
  const dispatch = useDispatch();
  const [options, showOptions] = useState<boolean>(false);

  return (
    <div className="select-none relative col-start-5 row-start-1 md:row-auto md:col-auto flex h-full justify-center items-center gap-2 text-xl">
      {auth ? (
        <>
          <div
            onClick={() => showOptions((prev) => !prev)}
            className="cursor-pointer hidden md:flex items-center gap-2"
          >
            <p>Account</p>
            {options ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </div>
          <BiUserCircle
            onClick={() => showOptions((prev) => !prev)}
            className="text-4xl block md:hidden"
          />
        </>
      ) : (
        <>
          <button
            className="cursor-pointer"
            onClick={() => dispatch(setLoginComponent())}
          >
            Login
          </button>
        </>
      )}
      {options && <UserDropDown showOptions={showOptions} />}
    </div>
  );
};

export default AccountSelect;
