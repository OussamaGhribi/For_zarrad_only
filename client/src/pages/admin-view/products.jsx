import { Fragment, useState } from "react";
import { Button  } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "./image-upload";

const initialFormData = {
    image : null,
    title : '',
    description : '',
    category : '',
    brand : '',
    price : '',
    salePrice : '',
    totalStock : ''
}

function AdminProducts() {
    const [openCreateProductsDialog ,setOpenCreateProductsDialog ] = useState(false);
    const [formData , setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState('');
    const [imageLoadingState,setImageLoadingState] = useState(false);

    function onSubmit(){

    }

    return (
    <Fragment>
        <div className="mb-5 flex justify-end">
            <Button onClick={()=>setOpenCreateProductsDialog(true)} >Add New Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet open={openCreateProductsDialog} onOpenChange={()=> {
            setOpenCreateProductsDialog(false);
        }}>
            <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Add new Product</SheetTitle>
                </SheetHeader>
                <ProductImageUpload setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} />
                <div className="py-6">
                    <CommonForm formData={formData} setFormData={setFormData} buttonText='Add' onSubmit={onSubmit} formControls={addProductFormElements} />
                </div>
            </SheetContent>
        </Sheet>
        </div>
    </Fragment>
    );
    
}
export default AdminProducts;