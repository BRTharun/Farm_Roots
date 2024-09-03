import React, { useState } from "react";
import InputField from "../common/InputField";
// import { Button } from "@epam/uui";
import CheckBox from "../common/CheckBox";
import Button from "../common/Button";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../utils/validation";
import { UserRole } from "../types/UserRole";
import { FaInfoCircle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


const RegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "" as UserRole | "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData({ ...formData, role });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      email: validateEmail(formData.email) ? "" : "Invalid email address",
      password: validatePassword(formData.password) ? "" : "Invalid password",
      confirmPassword: validatePassword(formData.confirmPassword)
        ? ""
        : "Invalid password",
      phoneNumber: validatePhoneNumber(formData.phoneNumber)
        ? ""
        : "Invalid phone number",
      role: formData.role ? "" : "Please select a role",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "",
    });
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      <InputField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        error={errors.name}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        error={errors.email}
        required
        additionalLabel={<span className="text-red-500">*</span>}
      />
      <div className="relative">
        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          maxLength={24}
          required
          additionalLabel={<span className="text-red-500">*</span>}
          placeholder="Password"
          error={errors.password}
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            type="button"
            onClick={toggleShowPassword}
            className="focus:outline-none"
          >
            {showPassword ? (
              <AiFillEyeInvisible className="text-gray-600" />
            ) : (
              <AiFillEye className="text-gray-600" />
            )}
          </button>
          <div className="ml-2 relative group">
          <FaInfoCircle className="cursor-pointer text-gray-600" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center">
              <div className="bg-black text-white text-xs rounded py-1 px-2">
                Password must be 8-24 characters long, include uppercase, lowercase, digit, and special character.
              </div>
              <div className="w-3 h-3 -mt-1 rotate-45 bg-black"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirm Password */}
      <div className="relative">
        <InputField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          maxLength={24}
          placeholder="Confirm Password"
          required
          additionalLabel={<span className="text-red-500">*</span>}
          error={errors.confirmPassword}
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            type="button"
            onClick={toggleShowConfirmPassword}
            className="focus:outline-none"
          >
            {showConfirmPassword ? (
              <AiFillEyeInvisible className="text-gray-600" />
            ) : (
              <AiFillEye className="text-gray-600" />
            )}
          </button>
          <div className="ml-2 relative group">
          <FaInfoCircle className="cursor-pointer text-gray-600" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center">
              <div className="bg-black text-white text-xs rounded py-1 px-2">
                Password must match the above password.
              </div>
              <div className="w-3 h-3 -mt-1 rotate-45 bg-black"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <InputField
          label="Phone Number"
          type="number"
          name="phoneNumber"
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault(); // Prevent these keys from being typed
            }
          }}
          value={formData.phoneNumber}
          onChange={handleChange}
          maxLength={10}
          placeholder="Phone Number"
          error={errors.phoneNumber}
          required
          additionalLabel={<span className="text-red-500">*</span>}
        />
      </div>
      <div className="mb-6">
        <label className="font-medium text-gray-700">
          Role <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-8 mt-2">
          <CheckBox
            checked={formData.role === "Vendor"}
            onChange={() => handleRoleChange("Vendor")}
            label="Vendor"
            value="vendor"
            className="flex-grow"
          />
          <CheckBox
            checked={formData.role === "Customer"}
            onChange={() => handleRoleChange("Customer")}
            label="Customer"
            value="customer"
            className="flex-grow"
          />
        </div>
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role}</p>
        )}
      </div>
      <div className="flex justify-around">
        <Button
        type="submit"
        className="bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:ring-indigo-500"
        onClick={handleSubmit}
        >
            Submit
        </Button>
        <Button
        type="submit"
        className="bg-gray-400 text-white shadow-md hover:bg-gray-500 focus:ring-gray-500"
        onClick={handleReset}
        >
        Reset
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
