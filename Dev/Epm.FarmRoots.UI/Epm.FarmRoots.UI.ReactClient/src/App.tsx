import React from 'react';
import './App.css'
import RegisterPage from './components/pages/RegisterPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CategoryRoute from './components/routes/CategoryRoute'
import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';

const App : React.FC = () => {
  return (
    <>
      <Header />
    {/* <div className='App min-h-screen flex items-center justify-center bg-gray-100'>
      <RegisterPage />
    </div> */}
    <CategoryRoute/>
      <Footer />
      </>
  )
}

export default App;
