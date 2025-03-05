import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/shop/cart-slice";
import { useEffect, useState } from "react";
import axios from "axios";

const SuccessPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(clearCart(user.id));

      // Fetch user orders
      axios.get(`http://localhost:5000/api/shop/order/getOrder`)
        .then((res) => {setOrders(res.data)
            console.log(res.data)})
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [dispatch, user]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-8">Thank you for your purchase!</p>

        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <div className="mt-8">
          <p className="text-lg text-gray-700">You will receive a confirmation email shortly.</p>
          <div className="mt-6">
            <a href="/shop/account" className="bg-green-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-green-500 border-2 border-green-500 transition duration-300">
              View Your Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
