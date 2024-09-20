import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/account/profile"); // Navigate to the AccountMenuSection with Profile active
  };

  return (
    <div
      className="select-none relative flex h-full justify-center items-center gap-2 text-xl"
      onClick={handleProfileClick}
    >
      <BiUserCircle className="text-4xl cursor-pointer" />
      <p className="cursor-pointer">Profile</p>
    </div>
  );
};

export default Profile;
