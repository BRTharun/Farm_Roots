import React, { useState } from 'react';
import './Forgot.css'; 
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
 
  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (!email.match(emailRegex)) {
      setMessage('Please enter a valid email address.');
      return;
    }
 
    setMessage('A password reset link has been sent to your email.');
    console.log('Sending password reset link to:', email);
  };
 
  return (
<div className="forgot-password-container">
<form className="forgot-password-form" onSubmit={handleSend}>
<h2>Forgot Password</h2>
        {message && <div className="message">{message}</div>}
<div className="input-group">
<input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
</div>
<button type="submit" className="send-button">Send</button>
</form>
</div>
  );
};
 
export default ForgotPassword;