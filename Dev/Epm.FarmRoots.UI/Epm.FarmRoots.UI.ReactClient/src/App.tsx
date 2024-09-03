import './App.css'
import RegisterPage from './components/pages/RegisterPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';


const App : React.FC = () => {
  return (
    <>
      <Header />
    <div className='App min-h-screen flex items-center justify-center bg-gray-100'>
      <RegisterPage />
    </div>
      <Footer />
      </>
  )
}

export default App;
