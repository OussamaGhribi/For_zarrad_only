import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { useState } from "react";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

function AuthRegister() {
    const initialState = {
        userName: "",
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Ensure the function is async and has the correct syntax
    const onSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            const data = await dispatch(registerUser(formData)); // Await the async dispatch
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message, // Toast on success
                });
                navigate('/auth/login'); // Navigate to login on success
            }
        } catch (error) {
            toast({
                title: data?.payload?.message, // Show an error toast if the registration fails
                description: error.message,
                variant: "error",
            });
        }
    };

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account
                    <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={"Sign Up"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit} // Pass the onSubmit function
            />
        </div>
    );
}

export default AuthRegister;
