import React from "react";
import RegistrationForm from "../features/RegistrationForm";

const RegisterPage: React.FC = () => {
    return (
        <div className="App min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">Register</h1>
            <RegistrationForm />
            </div>
            </div>
        </div>
    )
}


export default RegisterPage;