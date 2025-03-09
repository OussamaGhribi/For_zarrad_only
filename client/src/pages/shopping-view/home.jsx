import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.jpg';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { ChevronLeftIcon, ChevronRightIcon, CloudLightning, WatchIcon, ShoppingBasket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { ToastContainer, toast } from 'react-toastify';
import ProductDetailsDialog from '@/components/shopping-view/product-details';

function ShoppingHome() {
    const slides = [bannerOne, bannerTwo, bannerThree];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const { productList, productDetails } = useSelector(state => state.shopProducts);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
    }, [dispatch]);

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    useEffect(() => {
        // Dynamically loading the chatbase script
        const script = document.createElement('script');
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "5LOC091v5h3JXNMzMwzsu";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);

        script.onload = () => {
            console.log('Chatbase script loaded successfully');
        };

        return () => {
            // Cleanup the script on component unmount
            document.body.removeChild(script);
        };
    }, []);

    function handleAddToCart(getCurrentProductId) {
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast.success("Product added to cart!");
            }
        });
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
                {slides.map((slide, index) => (
                    <img
                        src={slide}
                        key={index}
                        className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                    />
                ))}
                <Button onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)} variant='outline' size='icon' className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80">
                    <ChevronLeftIcon className='w-4 h-4' />
                </Button>
                <Button onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)} variant='outline' size='icon' className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80">
                    <ChevronRightIcon className='w-4 h-4' />
                </Button>
            </div>
            <section className='py-20 bg-gray-50'>
                <div className='container mx-auto px-4 text-center'>
                    <h2 className='text-4xl font-bold text-gray-800 mb-6'>Welcome to ShopEase</h2>
                    <p className='text-gray-600 max-w-2xl mx-auto'>Discover the best deals on top-quality products. Shop with confidence and enjoy a seamless shopping experience.</p>
                </div>
            </section>
            <section className='py-20 bg-white'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Featured Products</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {productList && productList.length > 0 && productList.map(productItem => (
                            <ShoppingProductTile
                                key={productItem.id}
                                handleGetProductDetails={id => dispatch(fetchProductDetails(id))}
                                product={productItem}
                                handleAddtoCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <section className='py-20 bg-gray-100 text-center'>
                <h2 className='text-3xl font-bold mb-6'>Why Shop With Us?</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                    <Card className='p-6 shadow-lg bg-white rounded-lg'>
                        <ShoppingBasket className='w-12 h-12 mx-auto text-blue-500' />
                        <h3 className='text-xl font-semibold mt-4'>Quality Products</h3>
                        <p className='text-gray-600 mt-2'>We offer only the best quality products from trusted brands.</p>
                    </Card>
                    <Card className='p-6 shadow-lg bg-white rounded-lg'>
                        <WatchIcon className='w-12 h-12 mx-auto text-blue-500' />
                        <h3 className='text-xl font-semibold mt-4'>Fast Delivery</h3>
                        <p className='text-gray-600 mt-2'>Get your orders delivered quickly and efficiently.</p>
                    </Card>
                    <Card className='p-6 shadow-lg bg-white rounded-lg'>
                        <CloudLightning className='w-12 h-12 mx-auto text-blue-500' />
                        <h3 className='text-xl font-semibold mt-4'>24/7 Support</h3>
                        <p className='text-gray-600 mt-2'>Our support team is here to help anytime you need assistance.</p>
                    </Card>
                </div>
            </section>
            <footer className="bg-gray-800 text-white py-6 mt-12 relative">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xl font-bold">ShopEase</p>
                    <p className="text-gray-400">Your favorite place to shop online</p>
                    <p className="text-gray-400 text-sm mt-2">&copy; {new Date().getFullYear()} ShopEase. All Rights Reserved.</p>
                </div>
            </footer>

            

            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
            <ToastContainer />
        </div>
    );
}

export default ShoppingHome;
