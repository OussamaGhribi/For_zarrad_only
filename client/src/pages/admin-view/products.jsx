import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: ''
};

function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [newCategory, setNewCategory] = useState("");

    const { productList } = useSelector(state => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(event) {
        event.preventDefault();
        currentEditedId !== null
            ? dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
                  if (data?.payload?.success) {
                      dispatch(fetchAllProducts());
                      setFormData(initialFormData);
                      setOpenCreateProductsDialog(false);
                      setCurrentEditedId(null);
                  }
              })
            : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((data) => {
                  if (data?.payload?.success) {
                      dispatch(fetchAllProducts());
                      setOpenCreateProductsDialog(false);
                      setImageFile(null);
                      setFormData(initialFormData);
                      toast({ title: "Product added successfully" });
                  }
              });
    }

    function handleDelete(getCurrentProductId) {
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
            }
        });
    }

    function isFormValid() {
        return Object.keys(formData).map((key) => formData[key] !== '').every((item) => item);
    }

    function handleAddCategory() {
        if (newCategory.trim() !== "") {
            addProductFormElements.find(el => el.name === "category").options.push({
                id: newCategory.toLowerCase().replace(/\s+/g, "-"),
                label: newCategory
            });
            setNewCategory("");
            setOpenAddCategoryDialog(false);
            toast({ title: "Category added successfully" });
        }
    }

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="mb-5 flex justify-end gap-4 text-white">
                <Button onClick={() => setOpenAddCategoryDialog(true)}>Add Category</Button>
                <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {productList && productList.length > 0
                    ? productList.map(productItem => (
                          <AdminProductTile
                              setFormData={setFormData}
                              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                              setCurrentEditedId={setCurrentEditedId}
                              key={productItem.id}
                              product={productItem}
                              handleDelete={handleDelete}
                          />
                      ))
                    : null}
            </div>

            {/* Add New Product Dialog */}
            <Sheet
                open={openCreateProductsDialog}
                onOpenChange={() => {
                    setOpenCreateProductsDialog(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData);
                }}
            >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>{currentEditedId !== null ? "Edit Product" : "Add New Product"}</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        isEditMode={currentEditedId !== null}
                    />
                    <div className="py-6">
                        <CommonForm
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditedId !== null ? "Edit" : "Add"}
                            onSubmit={onSubmit}
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Add New Category Dialog */}
            <Dialog open={openAddCategoryDialog} onOpenChange={setOpenAddCategoryDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md text-white"
                        placeholder="Enter new category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button onClick={handleAddCategory} className="mt-4">
                        Add Category
                    </Button>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default AdminProducts;
