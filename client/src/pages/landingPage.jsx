import { useNavigate } from "react-router-dom";
import { FaHeadphones, FaAppleAlt, FaLaptop, FaMobileAlt, FaTv, FaBluetoothB, FaCamera, FaKeyboard, FaGamepad, FaBatteryFull, FaMicroscope, FaPaintBrush } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Wireless Headphones", price: "", icon: <FaHeadphones size={50} /> },
    { id: 2, name: "Smartwatch Series 6", price: "", icon: <FaAppleAlt size={50} /> },
    { id: 3, name: "Gaming Laptop", price: "", icon: <FaLaptop size={50} /> },
    { id: 4, name: "Smartphone Pro Max", price: "", icon: <FaMobileAlt size={50} /> },
    { id: 5, name: "4K Smart TV", price: "", icon: <FaTv size={50} /> },
    { id: 6, name: "Bluetooth Speaker", price: "", icon: <FaBluetoothB size={50} /> },
    { id: 7, name: "Digital Camera", price: "", icon: <FaCamera size={50} /> },
    { id: 8, name: "Mechanical Keyboard", price: "", icon: <FaKeyboard size={50} /> },
    { id: 9, name: "Wireless Mouse", price: "", icon: <FaGamepad size={50} /> },
    { id: 10, name: "Portable Charger", price: "", icon: <FaBatteryFull size={50} /> },
    { id: 11, name: "Microscope", price: "", icon: <FaMicroscope size={50} /> },
    { id: 12, name: "Art Supplies", price: "", icon: <FaPaintBrush size={50} /> },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 via-white to-gray-200 text-black min-h-screen w-[119rem]">
      {/* Header */}
      <header className="flex justify-between items-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 p-4 border-b border-gray-300 sticky top-0 z-50 shadow-lg">
        <h1
          className="text-4xl font-extrabold text-white cursor-pointer hover:text-gray-200 transition-colors"
          onClick={() => navigate("/")}
        >
          ShopEase
        </h1>
        <button
          className="bg-white text-gray-800 py-2 px-5 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
          onClick={() => navigate("/auth/login")}
        >
          Login / Sign Up
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white text-center py-20">
        <h2 className="text-6xl font-extrabold mb-6">Welcome to ShopEase</h2>
        <p className="text-lg mb-8">Your one-stop shop for the latest gadgets, electronics, and more!</p>
        <button
          className="bg-black text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-gray-800 transition-transform transform hover:scale-105"
          onClick={() => navigate("/shop/home")}
        >
          Start Shopping
        </button>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8 text-black">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">
            {products.slice(0, 12).map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2 cursor-pointer border border-gray-200"
                onClick={() => navigate("/shop/home")}
              >
                <div className="flex justify-center items-center mb-4 p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full">
                  {product.icon}
                </div>
                <h4 className="text-lg font-semibold text-black mb-2">{product.name}</h4>
                <p className="text-gray-600 font-bold">{product.price}</p>
                <button
                  className="mt-3 bg-black text-white py-2 px-6 rounded-lg w-full hover:bg-gray-800 transition-transform transform hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div click event
                    navigate("/shop/home");
                  }}
                >
                  View Products
                </button>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-8">
            <button
              className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-transform transform hover:scale-105"
              onClick={() => navigate("/shop/home")}
            >
              View More Products
            </button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-black mb-6">What Our Customers Say</h3>
          <div className="flex justify-center space-x-12">
            <div className="bg-white shadow-lg p-6 rounded-lg w-80">
              <p className="text-lg font-medium text-gray-700 mb-4">
                "I love ShopEase! Their customer service is fantastic, and I always find what I'm looking for!"
              </p>
              <h4 className="font-semibold text-xl text-gray-900">John Doe</h4>
              <p className="text-gray-500">Verified Buyer</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg w-80">
              <p className="text-lg font-medium text-gray-700 mb-4">
                "Fast shipping and amazing product selection! Highly recommend to all my friends."
              </p>
              <h4 className="font-semibold text-xl text-gray-900">Jane Smith</h4>
              <p className="text-gray-500">Verified Buyer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-semibold mb-8">Explore Our Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaHeadphones size={50} className="text-teal-500 mb-4" />
              <h4 className="text-2xl font-semibold text-gray-800">Audio</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaLaptop size={50} className="text-purple-500 mb-4" />
              <h4 className="text-2xl font-semibold text-gray-800">Laptops</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaMobileAlt size={50} className="text-blue-500 mb-4" />
              <h4 className="text-2xl font-semibold text-gray-800">Smartphones</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaCamera size={50} className="text-pink-500 mb-4" />
              <h4 className="text-2xl font-semibold text-gray-800">Cameras</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-6">Subscribe to Our Newsletter</h3>
          <p className="text-lg mb-6">Get the latest updates on new arrivals, offers, and more!</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-lg w-80 text-black"
            />
            <button
              className="bg-green-500 text-white py-3 px-6 rounded-r-lg hover:bg-green-600 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-black text-center py-6 border-t border-gray-300">
        <p>© 2025 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
