import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Wireless Headphones", price: "$199", img: "/images/headphones.jpg" },
    { id: 2, name: "Smartwatch Series 6", price: "$299", img: "/images/smartwatch.jpg" },
    { id: 3, name: "Gaming Laptop", price: "$1299", img: "/images/laptop.jpg" },
    { id: 4, name: "Smartphone Pro Max", price: "$999", img: "/images/smartphone.jpg" },
    { id: 5, name: "4K Smart TV", price: "$799", img: "/images/tv.jpg" },
    { id: 6, name: "Bluetooth Speaker", price: "$149", img: "/images/speaker.jpg" },
    { id: 7, name: "Digital Camera", price: "$499", img: "/images/camera.jpg" },
    { id: 8, name: "Mechanical Keyboard", price: "$129", img: "/images/keyboard.jpg" },
    { id: 9, name: "Mechanical Keyboard", price: "$129", img: "/images/keyboard.jpg" },
    { id: 10, name: "Mechanical Keyboard", price: "$129", img: "/images/keyboard.jpg" },
    { id: 11, name: "Mechanical Keyboard", price: "$129", img: "/images/keyboard.jpg" },
    { id: 12, name: "Mechanical Keyboard", price: "$129", img: "/images/keyboard.jpg" },
  ];

  return (
    <div className="bg-black text-white min-h-screen w-[119rem]">
      {/* Header */}
      <header className="flex justify-between items-center bg-black p-4 border-b border-gray-700 sticky top-0 z-50">
        <h1
          className="text-3xl font-bold cursor-pointer hover:text-gray-400 transition-colors"
          onClick={() => navigate("/")}
        >
          ShopEase
        </h1>
        <button
          className="bg-white text-black py-2 px-5 rounded-lg hover:bg-gray-300 transition-transform transform hover:scale-105"
          onClick={() => navigate("/auth/login")}
        >
          Login / Sign Up
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-gray-900 text-center py-20">
        <h2 className="text-5xl font-extrabold mb-4">Welcome to ShopEase</h2>
        <p className="text-lg mb-6">Your one-stop shop for the latest gadgets, electronics, and more!</p>
        <button
          className="bg-white text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105"
          onClick={() => navigate("/shop/home")}
        >
          Start Shopping
        </button>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
            {products.slice(0, 12).map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 p-4 shadow-lg rounded-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate("/shop/home")}
              >
                <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h4 className="text-lg font-semibold text-white">{product.name}</h4>
                <p className="text-gray-400 font-bold">{product.price}</p>
                <button
                  className="mt-3 bg-white text-black py-2 px-4 rounded-lg w-full hover:bg-gray-300 transition"
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
              className="bg-white text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105"
              onClick={() => navigate("/shop/home")}
            >
              View More Products
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 border-t border-gray-700">
        <p>© 2025 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
