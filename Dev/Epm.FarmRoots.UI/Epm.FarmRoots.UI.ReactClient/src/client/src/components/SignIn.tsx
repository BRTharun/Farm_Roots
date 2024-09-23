import React, { useEffect, useState } from 'react';
import './SignIn.css';

import { loginUser, loginVendor } from '../../../components/utils/slices/userLogin';
import { useNavigate } from "react-router-dom";
import { AppDispatch } from '../../../components/store/MainStore/store'
import { useDispatch, useSelector } from "react-redux";

const SignIn: React.FC = () => {
    const [username, setUsername] = useState<string>('ram@g.com');
    const [password, setPassword] = useState<string>('RamRam@18');
    const [role, setRole] = useState<string>('customer'); // Default role is customer
    const [error] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userRole  = useSelector((state:any) => state?.userLogin.userLogin?.role);

    useEffect(() => {
        if (userRole) {
            navigate(role === 'vendor' ? '/add-product' : '/home'); // Assuming you have defined these routes
        }
    }, [userRole, navigate]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const credentials = {
            email: username,
            password: password
        };
        if (role === 'vendor') {
            dispatch(loginVendor(credentials));
        } else {
            dispatch(loginUser(credentials));
        }
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h2>LOGIN</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username or Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="role-selection">
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="customer"
                            checked={role === 'customer'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Customer
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="vendor"
                            checked={role === 'vendor'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Vendor
                    </label>
                </div>
                <a href="/forgot" className="forgot-password">Forgot Password?</a>
                <button type="submit" className="signin-button">LOGIN</button>
                <div className="links">
                    <p>Don't have an account?<a href="/register" className="register">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default SignIn;