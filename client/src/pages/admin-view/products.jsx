import { addProductFormElements } from "@/config";
import { Sheet } from "lucide-react";
import { Fragment, useState } from "react";
import{
    SheetContent,
    SheetHeader,
    SheetTitle,
}from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment,useState } from "react";
import { Description } from "@radix-ui/react-toast";

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

    function on

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
        <div className="py-6">
            <CommonForm
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