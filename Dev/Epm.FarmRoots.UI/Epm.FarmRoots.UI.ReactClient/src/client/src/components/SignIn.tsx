import React, { useState } from 'react';
import './SignIn.css';
import AuthService from '../services/auth.service';

const SignIn: React.FC = () => {
    const [username, setUsername] = useState<string>('varsha_akarapu@gmail.com');
    const [password, setPassword] = useState<string>('Varsha123');
    const [error] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const service = new AuthService();
        const result = await service.login(username, password);
        if (result.data) {
            console.log(result.data);
            localStorage.setItem("access_token", result.data.data.access_token)
        } else {
            console.log(result);
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
                <a href="client\src\components\Forgot.tsx" className="forgot-password">Forgot Password?</a>
                <button type="submit" className="signin-button">LOGIN</button>
                <div className="links">
                    {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
                    <p>Don't have an account?<a href="#" className="register">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default SignIn;