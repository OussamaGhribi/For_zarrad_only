import { Link } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { useState } from "react";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
    email: "",
    password: "",
};
function AuthLogin(){
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState);
    const {toast} = useToast()

    function onSubmit(event){
        event.preventDefault();
        dispatch(loginUser(formData)).then((data)=>{
            if(data?.payload?.success){
                toast({
                    title:data?.payload?.message
                })
            }else{
                toast({
                    title:data?.payload?.message,
                    variant:"destructive",
                })
            }
        })
    }

    return ( 
        <div className="mx-auto w-full max-w-md space-y-6 m-3">
            
            <div className="text-center p-1">
                
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Sign in your account
            </h1>
            
            </div>
            <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}/>
        <p className="p-1 m-1">
            
            dont have an account
            <Link className="font-bold ml-2 text-primary underline hover:underline"
            to="/auth/register">
            Register
            </Link>
        </p>
        </div>
    )
}

export default AuthLogin;