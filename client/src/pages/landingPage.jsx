import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen w-[1900px]">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md sticky top-0 z-50">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
          onClick={() => navigate("/")}
        >
          ShopEase
        </h1>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={() => navigate("/auth/login")}
        >
          Login / Sign Up
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-blue-100 text-center py-20">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6 animate-fade-in">
          Welcome to ShopEase
        </h2>
        <p className="text-gray-700 text-lg mb-8 animate-fade-in-delayed">
          Your one-stop shop for all your needs. Find everything you love in one place!
        </p>
        <button
          className="bg-blue-600 text-white py-3 px-6 rounded text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={() => navigate("/shop/home")}
        >
          Start Shopping
        </button>
      </section>

      {/* About Us Section */}
      <section className="px-8 py-16 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">About ShopEase</h3>
          <p className="text-lg leading-relaxed mb-6">
            At ShopEase, we believe shopping should be simple, seamless, and enjoyable. Our mission
            is to connect you with top-quality products at unbeatable prices, all from the comfort
            of your home. Whether you’re looking for the latest fashion, cutting-edge technology, or
            everyday essentials, ShopEase has it all.
          </p>
          <p className="text-lg leading-relaxed">
            With secure payment options, fast delivery, and 24/7 customer support, we’re here to
            make your shopping experience as smooth as possible. Join thousands of happy customers
            today and discover why ShopEase is the ultimate online marketplace.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-50 text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-10">Why Choose ShopEase?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-white shadow-md rounded hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-3">Wide Product Range</h4>
              <p>
                From electronics to fashion, we offer a diverse range of products to suit every
                taste and budget.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-3">Fast Delivery</h4>
              <p>Enjoy lightning-fast shipping to your doorstep, no matter where you are.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-3">Secure Payments</h4>
              <p>
                Shop with confidence knowing that your payment information is fully protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-extrabold mb-6">Ready to Start Shopping?</h3>
          <p className="text-lg mb-8">
            Join the ShopEase family today and enjoy exclusive deals, discounts, and more. Your
            perfect shopping experience is just a click away!
          </p>
          <button
            className="bg-white text-blue-600 py-3 px-6 rounded text-lg font-bold hover:bg-gray-100 transition-transform transform hover:scale-105"
            onClick={() => navigate("/shop/home")}
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© 2025 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
