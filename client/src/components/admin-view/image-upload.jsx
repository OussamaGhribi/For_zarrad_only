import{Input} from "postcss";
import{Label} from "../ui/label";

function ProductImageUpload({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl}){
    const inputRef=useRef(null)
    function handleImageFileChange(event){}
    console.log(event.target.files);
    const selectedFile=event.target.files?.[0];
    if(selectedFile) setImageFile(selectedFile);
    return(
        <div className="w-full max-w-md mx-auto">
            <label className="text-lg font-semibold mb-2 block">Upload Image</label>
            <div>
                <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange}/>
            </div>
        </div>
    );
}
export default ProductImageUpload;