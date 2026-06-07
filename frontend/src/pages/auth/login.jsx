import CommonForm from "@/components/common/form"
import { loginFormControls } from "@/config"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "@/store/auth-slice"
import { toast } from "sonner"; //  ADD THIS



// Fixed the spelling error here
const initialState = {
  email: "",
  password: "",
}

function AuthLogin() {
  // Now this correctly references the object above
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();


function onSubmit(event) {
  event.preventDefault(); 
  
  dispatch(loginUser(formData)).then((data) => {
    console.log("Login Response:", data);
    
    // Check if the backend verified the user successfully
    if (data?.payload?.success) {
      // Pass a plain string directly, no object wrapper
      toast.success(data?.payload?.message || "Logged in successfully!");
      
      // Optional: Redirect the user to dashboard after a success
      // navigate('/shop/home');
      
    } else {
      // This catches incorrect passwords, user not found, or server drops
      toast.error(data?.payload?.message || "Failed to log in.");
    }
  });
  
  console.log("Submitting Login FormData:", formData);


  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6"> 
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
        <p className="mt-2 text-muted-foreground">
          Dont have an account?{" "}
          <Link className="font-medium text-primary hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
      <CommonForm 
        formControls={loginFormControls} 
        buttonText={'Sign in'}
        formData={formData} 
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin;
