import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
    return (
        <Card
            className={`max-w-sm mx-auto ${product?.totalStock === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <div
                onClick={() => product?.totalStock > 0 && handleGetProductDetails(product?._id)}
                className={`${product?.totalStock === 0 ? 'cursor-not-allowed' : ''}`}
            >
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="h-[300px] w-[350px] object-cover rounded-t-lg"
                    />
                    {product?.salePrice > 0 && (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-lg">Sale</Badge>
                    )}
                    {product?.totalStock === 0 && (
                        <Badge className="absolute top-2 right-2 bg-gray-700 text-white text-lg">Sold Out</Badge>
                    )}
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[16px] text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
                        <span className="text-[16px] text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 && <span className="text-lg font-semibold text-primary">${product?.salePrice}</span>}
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                <Button
                    onClick={() => handleAddtoCart(product?._id)}
                    className="w-full"
                    disabled={product?.totalStock === 0}
                >
                    {product?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ShoppingProductTile;
