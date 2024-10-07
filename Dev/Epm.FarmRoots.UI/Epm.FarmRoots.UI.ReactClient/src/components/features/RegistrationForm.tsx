import React, { useState, useRef, useEffect } from "react";
import InputField from "../common/InputField";
// import { Button } from "@epam/uui";
import CheckBox from "../common/CheckBox";
import Button from "../common/Button";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateName,
} from "../utils/validation";
import { UserRole } from "../types/UserRole";
import { FaInfoCircle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom"; 
import api from "../services/api";

const CUSTOMER_REGISTER_URL = '/Customer/register';
const VENDOR_REGISTER_URL = '/Vendor/register'


interface Errors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: string;
}


const RegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');


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

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);


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
      name: validateName(formData.name) ? "" : "Name only contains alphabets and should not be empty",
      email: validateEmail(formData.email) ? "" : "Invalid email address",
      password: validatePassword(formData.password) ? "" : "Invalid password",
      confirmPassword: formData.confirmPassword === formData.password ? "" : "Passwords do not match",
      phoneNumber: validatePhoneNumber(formData.phoneNumber) ? "" : "Invalid phone number",
      role: formData.role ? "" : "Please select a role",
    };
    
    setErrors(newErrors);
    focusFirstErrorField(newErrors);
  
    // Collect all error messages into an array
    const errorMessages = Object.values(newErrors).filter((error) => error !== "");
  
    // Show all the error messages at once using a toast for each
    if (errorMessages.length > 0) {
      errorMessages.forEach((error) => toast.error(error)); // Display all errors
      return false; // Return false to indicate form is not valid
    }
  
    return true; // Return true if no errors
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Clear the previous error message before submitting the form again
    setErrMsg('');
  
    if (validateForm()) {
      try {
        const MAIN_REGISTER_URL = formData.role === 'Customer' ? CUSTOMER_REGISTER_URL : VENDOR_REGISTER_URL;
  
        const response = await api.post(
          MAIN_REGISTER_URL,
          formData,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false
          }
        );
  
        // Registration successful
        console.log(response.data);
        setSuccess(true);
        toast.success("Registration successful!");
  
      } catch (err: any) {
        // Check if the error response is available and extract the message
        if (err.response) {
          const statusCode = err.response.status;
  
          // If the error status is 400 (Bad Request), display the backend error message
          if (statusCode === 400 && err.response.data?.message) {
            setErrMsg(err.response.data.message);
            toast.error(errMsg);
          } else if (statusCode === 409) {
            setErrMsg('Username Already Taken');
            toast.error('Username Already Taken');
          } else {
            setErrMsg('Registration Failed');
            toast.error('Registration Failed');
          }
        } else {
          // If there's no server response
          setErrMsg('No Server Response');
          toast.error('No Server Response');
        }
      }
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
    nameRef.current?.focus();
    toast.info("Form reset");
  };

  const focusFirstErrorField = (errors : Errors) => {
    if (errors.name) {
      nameRef.current?.focus();
    } else if (errors.email) {
      emailRef.current?.focus();
    } else if (errors.password) {
      passwordRef.current?.focus();
    } else if (errors.confirmPassword) {
      confirmPasswordRef.current?.focus();
    } else if (errors.phoneNumber) {
      phoneRef.current?.focus();
    }
  };

  useEffect(() => {
    nameRef.current?.focus(); // Focus on the name input field on initial render
  }, []);

  return (
    <>
    {
      success ? (
        <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Success!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your registration was successful. You can now sign in and start using the application.
          </p>
          <Link
            to="/" 
            className="inline-block px-6 py-3 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </Link>
        </div>
      </section>
      ) : (
      <section>
    <form
      onSubmit={handleSubmit}
      // method="POST"
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      <InputField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        ref={nameRef}
        additionalLabel={<span className="text-red-500">*</span>}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        ref={emailRef}
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
          ref={passwordRef}
          additionalLabel={<span className="text-red-500">*</span>}
          placeholder="Password"
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
          ref={confirmPasswordRef}
          maxLength={24}
          placeholder="Confirm Password"
          additionalLabel={<span className="text-red-500">*</span>}
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
          ref={phoneRef}
          maxLength={10}
          placeholder="Phone Number"
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
    </section>
    )}
    </>
  )
};

export default RegistrationForm;
