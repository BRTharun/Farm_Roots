import React from 'react';
import SignIn from './SignIn';
import Header from './Header';
import Footer from './Footer';

const SignInPage: React.FC = () => {
        return (
                <>
                        <Header />
                        <div className="flex justify-center items-center min-h-screen">
                                <SignIn />
                        </div>
                        <Footer />
                </>
        );
};

export default SignInPage;
