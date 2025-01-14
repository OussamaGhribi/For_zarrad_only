import { addProductFormElements } from "@/config";
import { Sheet } from "lucide-react";
import { Fragment, useState } from "react";
import{
    SheetContent,
    SheetHeader,
    SheetTitle,
}from "@/components/ui/sheet";

import { Description } from "@radix-ui/react-toast";
import ProductImageUpload from "@/components/admin-view/image-upload";

const initialFormData={
    image: null,
    title:'',
    description:'',
    category:'',
    brand:'',
    price:'',
    salePrice:'',
    totalStock:''
}



function AdminProducts() {
    const [openCreateProductsDialog,setOpenCreateProductsdialog]=useState(false);
    const [formData,setFormData]=useState(initialFormData)
    const [imageFile,setImageFile]=useState(null);
    const [uploadedImageUrl,setUploadedImageUrl]=useState("");

    function onSubmit(){}

    return <Fragment>
        <div className="mb-5 w-full flex justify-end">
    <button onClick={()=>setOpenCreateProductsdialog(true)}>Add New product</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
        <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
            setOpenCreateProductsdialog(false);

        }}>
            <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
            <SheetTitle>
                Add New Product
            </SheetTitle>
        </SheetHeader>
        <ProductImageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>
        <div className="py-6">
            <CommonForm
            onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText='Add'
                formContols={addProductFormElements}
            />
        </div>
            </SheetContent>
        </Sheet>
    </Fragment>;
    
}
export default AdminProducts;