import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginComponent } from "../../../store/Reducer/headerLoginSlice";
import { toast } from "react-toastify";
import { RootState } from "../../../store/MainStore/store";

const CartBtn: React.FC = () => {
  const { total } = useSelector((state: RootState) => state.cartSlice);
  const { auth } = useSelector((state: RootState) => state.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onClickCartBtn = () => {
    if (pathname === "/cart") return;
    if (auth) {
      navigate("/cart");
    } else {
      console.log("User is not authenticated, showing toast");
      toast.info("To open your cart you have to login!");
      dispatch(setLoginComponent());
    }
  };

  return (
    <div
      onClick={onClickCartBtn}
      className={`${
        pathname === "/cart" ? "md:hidden" : "flex"
      } row-start-2 cursor-pointer md:row-start-auto fixed bottom-10 left-2 right-2 md:static md:w-32 md:h-14 h-20 rounded-md text-white px-4 items-center bg-green-800 gap-2`}
    >
      <div className="flex items-center gap-3">
        <AiOutlineShoppingCart className="text-2xl" />
        {total.quantity !== 0 && (
          <div className="font-bold leading-5">
            <p>{total.quantity} items</p>
            <p>${total.price}</p>
          </div>
        )}
      </div>
      {total.quantity === 0 && (
        <p className="block text-sm font-bold">View Cart</p>
      )}
    </div>
  );
};

export default CartBtn;
