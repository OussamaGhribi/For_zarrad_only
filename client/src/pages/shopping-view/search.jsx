import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import './Search.css'

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // To manage modal state
  const [productDetails, setProductDetails] = useState(null); // To store selected product details

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
      setError("Error searching for products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle the click event to show product details in modal
  const handleProductClick = (product) => {
    setProductDetails(product);
    setOpen(true);
  };

  return (
    <div className="search-container w-[120rem]">
      {/* Header Section */}
      <div className="header">
        <h2>Search Products</h2>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a product..."
          className="search-input text-white text-lg"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="loading-text">Searching...</p>}

      {/* Products List */}
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className={`product-card ${product.totalStock === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              onClick={() => product.totalStock > 0 && handleProductClick(product)} // Click to view product details
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="product-stock">
                <strong>Stock:</strong> {product.totalStock > 0 ? product.totalStock : "Sold Out"}
              </p>
              <Button disabled={product.totalStock === 0}>Add to Cart</Button>
            </div>
          ))
        ) : (
          !loading && <p className="no-products-text">No products found</p>
        )}
      </div>

      {/* Product Details Modal */}
      {productDetails && (
        <ProductDetailsDialog
          open={open}
          setOpen={setOpen}
          productDetails={productDetails}
        />
      )}
    </div>
  );
};

export default Search;
