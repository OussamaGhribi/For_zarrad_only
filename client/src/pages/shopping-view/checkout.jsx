import Address from "@/components/shopping-view/address";
import accImg from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // Store the discount percentage

  const couponList = {
    "SAVE20": 20,
    "DISCOUNT10": 10,
    "FREESHIP": 5, 
  };

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const discountedTotal = totalCartAmount - (totalCartAmount * discount) / 100;

  const applyCoupon = () => {
    if (couponList[couponCode]) {
      setDiscount(couponList[couponCode]);
      toast.success(`Coupon applied! ${couponList[couponCode]}% discount applied.`);
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const decreaseProductStock = async (items) => {    
    try {
      const updatePromises = items.map((item) => {
        return axios.put(`http://localhost:5000/api/shop/products/update-stock/${item.productId}`, { 
          quantity: item.quantity  
        });
      });
  
      const responses = await Promise.all(updatePromises);
  
      responses.forEach((res, index) => {
        if (res.data.success) {
          console.log(`Stock updated for product ${items[index].productId}`);
        } else {
          console.log(`Failed to update stock for product ${items[index].productId}`);
        }
      });
  
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const onsubmit = (e) => {
    e.preventDefault();
    const finalAmount = discountedTotal * 1000;
    axios
      .post("http://localhost:5000/api/add", { amount: finalAmount })
      .then((res) => {
        const { payment_id, result } = res.data;
        if (result && result.link) {
          // Successful payment, proceed with stock update
          
          decreaseProductStock(cartItems.items);
          
          localStorage.setItem("payment_id", payment_id);
          window.location.href = result.link; // Redirect to payment gateway
        } else {
          console.error("Payment response does not contain a valid link");
          toast.error("Failed to initiate payment");
        }
      })
      .catch((err) => {
        console.log("Error initiating payment:", err);
        toast.error("Error initiating payment");
      });
  };
  
  

  const goToNextStep = () => {
    if (currentStep === 2 && !currentSelectedAddress) {
      toast.error("You must select an address before proceeding.");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleAddressSelect = (address) => {
    setCurrentSelectedAddress(address);
    toast.success("Address selected!");
    // Change border color to green (or any other visual cue)
    document.getElementById("selected-address").style.borderColor = "green";
  };

  return (
    <div className="flex flex-col items-center p-5">
      {/* Banner Image */}
      <div className="relative h-[300px] w-full overflow-hidden mb-5">
        <img src={accImg} className="h-full w-full object-cover object-center" />
      </div>

      {/* Stepper Navigation */}
      <div className="flex justify-between w-full max-w-[600px] mb-5">
        <Button
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="font-bold">Step {currentStep} of 3</span>
        <Button
          onClick={goToNextStep}
          disabled={currentStep === 3}
          variant="outline"
        >
          Next
        </Button>
      </div>

      {/* Step Content */}
      <div className="w-full max-w-[600px]">
        {currentStep === 1 && (
          <div>
            <h2 className="font-bold mb-4">Your Cart Items</h2>
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
              cartItems.items.map((item) => (
                <UserCartItemsContent key={item?.id} cartItem={item} />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="cursor-pointer">
            <h2 className="font-bold mb-4">Select Address</h2>
            <Address setCurrentSelectedAddress={handleAddressSelect} />
            
            {!currentSelectedAddress && (
              <p className="text-red-500 mt-4">
                Please select an address to proceed.
              </p>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="font-bold mb-4">Review and Checkout</h2>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  {discount > 0 ? (
                    <>
                      <del className="text-red-500">{totalCartAmount}$</del>{" "}
                      {discountedTotal}$
                    </>
                  ) : (
                    `${totalCartAmount}$`
                  )}
                </span>
              </div>
              <div className="flex flex-col mt-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="p-2 border text-white border-gray-300 rounded"
                />
                <Button onClick={applyCoupon} className="mt-2">
                  Apply Coupon
                </Button>
              </div>
            </div>
            <div className="mt-4 w-full">
              <form onSubmit={onsubmit}>
                <Button
                  className="w-full"
                  disabled={!currentSelectedAddress}
                >
                  Checkout with Flouci
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ShoppingCheckout;
