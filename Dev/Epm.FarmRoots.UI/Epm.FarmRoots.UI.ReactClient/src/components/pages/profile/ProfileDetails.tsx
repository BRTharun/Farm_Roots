import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../../assets/styles/ProfileDetails.css'; 

interface UserDetails {
  customerId: number;
  name: string;
  email: string;
  phoneNumber: string;
}

export default function ProfileDetails() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameErr, setNameErr] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const isValidName = (name: string) => {
    const nameRegex = /^[A-Za-z][A-Za-z\s]{0,28}$/;
    return nameRegex.test(name);
  };
  
  const handleNameBlur = () => {
    if (name === "") {
      setNameErr("*Required");
    } else if (!isValidName(name)) {
      setNameErr("Name must start with a letter, contain only letters and spaces, and be less than 30 characters.");
    } else {
      setNameErr("");
    }
  };
  

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleEmailBlur = () => {
    if (email === "") {
      setEmailErr("*Required");
    } else if (!isValidEmail(email)) {
      setEmailErr("Invalid email format");
    } else {
      setEmailErr("");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get<UserDetails[]>('https://localhost:7116/api/Customer/GetCustomers');
        console.log("User details fetched:", response.data);
        const users = response.data;

        if (users.length > 0) {
          const user = users[0]; 
          setUserDetails(user);
          setName(user.name);
          setEmail(user.email);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching user details:", error.response?.data);
        } else {
          console.error("Unexpected error:", error);
        }
        alert("Failed to load user details.");
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    setBtnDisabled(nameErr !== "" || emailErr !== "");
  }, [nameErr, emailErr]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameErr || emailErr || !userDetails) return;

    
    const confirmed = window.confirm("Are you sure you want to update your profile?");
    if (!confirmed) return; 

    try {
      await axios.put(`https://localhost:7116/api/Customer/UpdateCustomer/${userDetails.customerId}`, {
        customerId: userDetails.customerId,
        name: name,
        email: email,
        phoneNumber: userDetails.phoneNumber 
      });

      alert("Profile updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response data:", error.response?.data);
        console.error("Error response status:", error.response?.status);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Failed to update profile.");
    }
  };

  if (userDetails === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <form className="details-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name" className="input-label">
            Name*
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="input-element"
            onBlur={handleNameBlur}
          />
          <p className="name-err">
            {nameErr === "INITIAL" ? "" : nameErr}
          </p>
        </div>
        <div className="input-container m-top">
          <label htmlFor="email" className="input-label">
            Email Address*
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="input-element"
            onBlur={handleEmailBlur}
          />
          <p className="email-err">
            {emailErr}
          </p>
        </div>
        <div className="input-container m-top">
          <label htmlFor="phoneNumber" className="input-label">
            Phone Number
          </label>
          <input
            type="text"
            value={userDetails.phoneNumber}
            id="phoneNumber"
            className="input-element"
            disabled
          />
        </div>
        <div className="button-container">
          <button
            className={`${
              btnDisabled ? "disabled-btn" : "submit-btn"
            }`}
            disabled={btnDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

