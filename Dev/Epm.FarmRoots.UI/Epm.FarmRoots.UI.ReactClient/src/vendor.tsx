import "./App.css";
// import RegisterPage from './components/pages/RegisterPage';
// import Header from "./components/common/Header/Header";
import "@epam/uui-components/styles.css";
import "@epam/uui/styles.css";
// import MyRoutes from "./components/routes/MyRoutes";
// import Footer from "./components/common/Footer/UI/Footer";
// import VendorNavBar from "./components/common/vendor/VendorNavBar";
// import VendorRoutes from "./components/routes/VendorRoutes";
import { Provider } from "react-redux";
import vendorstore from "./components/utils/store/store";
// import CategoryRoute from './components/routes/CategoryRoute';

const Vendor: React.FC = () => {
    return (
        <>
            <Provider store={vendorstore}>
            <div>
                
            </div>
            </Provider>
        </>
    );
};

export default Vendor;
