import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { registerUser } from "@/store/auth-slice"
import { toast } from "sonner"; //  ADD THIS


// Fixed the case sensitivity error to match registerFormControls exactly
const initialState = {
  userName: "", // 
  email: "",
  password: "",
}

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      console.log("Registration Response:", data);
      if (data?.payload?.success) {

        toast.success(data?.payload?.message || "Account created successfully!");

        navigate('/auth/login');
      }else{
          toast.error(data?.payload?.message || "Failed to create account.");
          
      }
    });

    console.log("Submitting FormData:", formData);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
        <p className="mt-2 text-muted-foreground">
          Already have an account?{" "}
          <Link className="font-medium text-primary hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
