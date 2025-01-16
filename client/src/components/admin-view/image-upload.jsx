import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';

const ProductImageUpload = ({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl ,imageLoadingState ,setImageLoadingState, isEditMode}) => {
    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(event){
        event.preventDefault()
    }
    
    function handleDrop(event){
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', imageFile);
    
        try {
            const response = await axios.post(
                'http://localhost:5000/api/admin/products/upload-image',
                data
            );
    
            if (response.data.success && response.data.result?.url) {
                setUploadedImageUrl(response.data.result.url);
            } else {
                console.error('Upload failed:', response.data.message);
                alert('Failed to upload image: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred while uploading the image. Please try again.');
        } finally {
            setImageLoadingState(false);
        }
    }
    

    useEffect(() => {
        if (imageFile !== null) {
            uploadImageToCloudinary();
        }
    }, [imageFile]);

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}>
                <Input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    ref={inputRef} 
                    onChange={handleImageFileChange} 
                    disabled={isEditMode}
                />
                {
                    !imageFile ? 
                    <label htmlFor='image-upload' className={`${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`}>
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload image</span>
                    </label> : 
                    imageLoadingState ? (
                        <Skeleton className="h-10 bg-gray-100" />
                    ) :
                    <div className='flex item-center justify-between'>
                        <div className='flex items-center'>
                            <FileIcon className='w-8 text-primary h-8 mr-2'></FileIcon>
                        </div>
                        <p className='text-sm font-medium'> {imageFile.name}</p>
                        <Button variant="ghost" size='icon' className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className='w-4 h-4' />
                            <span className='sr-only'> Remove File</span>
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductImageUpload;
