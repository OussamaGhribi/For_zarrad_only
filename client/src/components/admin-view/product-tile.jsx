import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

function AdminProductTile({product, setOpenCreateProductsDialog , setFormData ,setCurrentEditedId, handleDelete}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
        <div>
            <div className='relative'>
                {/* Sold Out Badge */}
                {product?.totalStock === 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        Sold Out
                    </span>
                )}
                <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
            </div>
            <CardContent>
                <h2 className='text-xl font-bold mb-2 mt-2'>{product?.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price} </span> 
                    <span className='text-lg font-semibold'>qte: {product?.totalStock}</span>
                    {
                        product?.salePrice > 0 ? (
                            <span className='text-lg font-bold'>${product?.salePrice}</span>
                        ):null
                    }
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button 
                    onClick={() => {
                        setCurrentEditedId(product?._id)
                        setOpenCreateProductsDialog(true)
                        setFormData(product)
                    }}
                >
                    Edit
                </Button>
                <Button 
                    onClick={() => handleDelete(product?._id)} 
                >
                    Delete
                </Button>
            </CardFooter>
        </div>
    </Card>
  )
}

export default AdminProductTile
