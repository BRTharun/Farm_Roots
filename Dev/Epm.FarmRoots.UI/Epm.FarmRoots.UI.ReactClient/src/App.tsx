import './App.css'
import Header from './components/common/Header/Header';
import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import MyRoutes from './components/routes/MyRoutes';
import Footer from './components/common/Footer/UI/Footer';
// import ProductRoutes from './components/routes/ProductRoutes';
// import VendorRoutes from './components/routes/VendorRoutes';
// import ShoppingCart from './components/shoppingCart/ShoppingCart';


const App : React.FC = () => {
  return (
    <>
    <div className='pb-40 md:pb-0'>
      <Header />
      <MyRoutes /> 
      {/* <VendorRoutes/> */}
      {/* <ProductRoutes/> */}
    <Footer /> 
      </div>
      </>
  )
}

export default App;
