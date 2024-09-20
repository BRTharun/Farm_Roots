import { Routes, Route, Link } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { PiChatTeardropTextLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import '../../../../assets/styles/AccountMenuSection.css';
import OrdersPage from "../../../pages/profile/OrdersPage";
import FAQS from "../../../pages/profile/FAQPage";
import Refer from "../../../pages/profile/Refer";
import ProfileDetails from "../../../pages/profile/ProfileDetails";
import AddressPage from "../../../pages/profile/AddressPage";


interface AccountMenuSectionProps {
  active: string; 
}

export default function AccountMenuSection({ active }: AccountMenuSectionProps) {
  return (
    <div className="account-container">
      <div className="side-container">
        <h3>My Account</h3>
        <hr className="hr-line" /> 

        <Link
          to="/account/orders"
          className={`specific-section ${active === 'orders' ? 'active-link' : ''}`}
        >
          <BsHandbag className="specific-section-icon" />
          <p className="specific-section-description">Orders</p>
        </Link>
        <Link
          to="/account/support"
          className={`specific-section ${active === 'customer support' ? 'active-link' : ''}`}
        >
          <PiChatTeardropTextLight className="specific-section-icon" />
          <p className="specific-section-description">Customer Support</p>
        </Link>
        <Link
          to="/account/referrals"
          className={`specific-section ${active === 'manage referrals' ? 'active-link' : ''}`}
        >
          <FaRegHeart className="specific-section-icon" />
          <p className="specific-section-description">Manage Referrals</p>
        </Link>
        <Link
          to="/account/addresses"
          className={`specific-section ${active === 'addresses' ? 'active-link' : ''}`}
        >
          <GrLocation className="specific-section-icon" />
          <p className="specific-section-description">Addresses</p>
        </Link>
        <Link
          to="/account/profile"
          className={`specific-section ${active === 'profile' ? 'active-link' : ''}`}
        >
          <FaRegCircleUser className="specific-section-icon" />
          <p className="specific-section-description">Profile</p>
        </Link>
        <hr className="hr-line" />

        <div className="logout-btn-container">
          <button className="logout-btn">Log Out</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="content-container">
        <Routes>
          <Route path="orders" element={<OrdersPage />} />
          <Route path="support" element={<FAQS />} />
          <Route path="referrals" element={<Refer />} />
          <Route path="profile" element={<ProfileDetails />} />
          <Route path="addresses" element={<AddressPage />} />
        </Routes>
      </div>
    </div>
  );
}
