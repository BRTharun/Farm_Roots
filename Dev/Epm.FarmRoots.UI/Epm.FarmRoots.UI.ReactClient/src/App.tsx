import './App.css'
// import RegisterPage from './components/pages/RegisterPage';
import Header from './components/common/Header/Header';
import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
// import MyRoutes from './components/routes/MyRoutes';
import Footer from './components/common/Footer/UI/Footer';
import ProductRoutes from './components/routes/ProductRoutes';


const App : React.FC = () => {
  return (
    <>
    <div className='pb-40 md:pb-0'>
      <Header />
      {/* <MyRoutes /> */}
      <ProductRoutes/>
      <Footer /> 
    {/* <div className='App min-h-screen flex items-center justify-center bg-gray-100'>
      <RegisterPage />
    </div> */}
    <ShoppingCart/>
      </div>
      </>
  )
}

export default App;
