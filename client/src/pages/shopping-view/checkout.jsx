import Address from "@/components/shopping-view/address";
import accImg from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/order-slice";
import { toast, ToastContainer } from "react-toastify";  // Add ToastContainer import
import "react-toastify/dist/ReactToastify.css";  // Ensure this import is present for styles

function ShoppingCheckout() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();

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

  const handleInitiatePaypalPayment = () => {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
        <div className='cursor-pointer'>
            <h2 className="font-bold mb-4">Select Address</h2>
            <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
            
            {/* Show warning message if no address is selected */}
            {!currentSelectedAddress && (
            <p className="text-red-500 mt-4">
                Please select an address to proceed.
            </p>
            )}
            
            {/* If address is selected, show a toast */}
            {currentSelectedAddress && toast.success("Address selected")}
        </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="font-bold mb-4">Review and Checkout</h2>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">{totalCartAmount}$</span>
              </div>
            </div>
            <div className="mt-4 w-full">
              <Button
                onClick={handleInitiatePaypalPayment}
                className="w-full"
                disabled={!currentSelectedAddress}
              >
                Checkout with Paypal
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default ShoppingCheckout;
