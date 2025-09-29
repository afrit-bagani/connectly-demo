import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";

// Local import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// A placeholder for your Firebase logic
// import { auth, googleProvider } from "@/lib/firebase";
// import { signInWithPopup } from "firebase/auth";

const SignUpIllustration = () => (
  <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-100 dark:bg-gray-800">
    <div className="max-w-md text-center">
      {/* You can replace this with your actual illustration SVG or Image component */}
      <img
        src="login.jpg"
        alt="Sign Up Illustration"
        className="w-full h-auto"
      />
      <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
        Join Connectly Today
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        The one-stop platform for educational institutes to connect and thrive.
      </p>
    </div>
  </div>
);

export default function SignUpPage() {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    collegeId: "",
    teacherId: "",
    aicteCode: "",
    state: "",
    city: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    // try {
    //   const result = await signInWithPopup(auth, googleProvider);
    //   console.log("Google Sign-In Success:", result.user);
    //   console.log("Selected user type:", userType);
    //   // Here you would typically save the user role to your database
    //   // and then navigate to the appropriate dashboard.
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.error("Google Sign-In Error:", error);
    // }
    alert(
      `Signing in with Google as a ${userType}... (Firebase logic goes here)`
    );
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();
    toast.success("Sign up complete");
    navigate("/home");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const userTypes = [
    {
      id: "student",
      label: "Student",
      icon: <PiStudentBold className="w-5 h-5" />,
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: <FaChalkboardTeacher className="w-5 h-5" />,
    },
    {
      id: "institute",
      label: "Institute",
      icon: <BsBank className="w-5 h-5" />,
    },
    { id: "admin", label: "Admin", icon: <RiAdminLine className="w-5 h-5" /> },
  ];

  const renderFormFields = () => {
    return (
      <form onSubmit={handleEmailSignUp} className="grid gap-4">
        {/* Common Fields */}
        {(userType === "student" ||
          userType === "faculty" ||
          userType === "institute") && (
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
        )}

        {/* Student-specific Fields */}
        {userType === "student" && (
          <div className="grid gap-2">
            <Label htmlFor="collegeId">College ID</Label>
            <Input
              id="collegeId"
              placeholder="Your college ID number"
              required
              onChange={handleChange}
              value={formData.collegeId}
            />
          </div>
        )}

        {/* Faculty-specific Fields */}
        {userType === "faculty" && (
          <div className="grid gap-2">
            <Label htmlFor="teacherId">Teacher ID</Label>
            <Input
              id="teacherId"
              placeholder="Your teacher ID number"
              required
              onChange={handleChange}
              value={formData.teacherId}
            />
          </div>
        )}

        {/* Institute-specific Fields */}
        {userType === "institute" && (
          <>
            <div className="grid gap-2">
              <Label htmlFor="aicteCode">AICTE Code</Label>
              <Input
                id="aicteCode"
                placeholder="Institute's AICTE code"
                required
                onChange={handleChange}
                value={formData.aicteCode}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="e.g., Maharashtra"
                  required
                  onChange={handleChange}
                  value={formData.state}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="e.g., Mumbai"
                  required
                  onChange={handleChange}
                  value={formData.city}
                />
              </div>
            </div>
          </>
        )}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <Button type="submit" className="w-full">
          Create an account
        </Button>
      </form>
    );
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <SignUpIllustration />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[380px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Select your role to get started
            </p>
          </div>

          <RadioGroup
            defaultValue="student"
            value={userType}
            onValueChange={setUserType}
            className="grid grid-cols-2 gap-4"
          >
            {userTypes.map((type) => (
              <div key={type.id}>
                <RadioGroupItem
                  value={type.id}
                  id={type.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={type.id}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  {type.icon}
                  {type.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {renderFormFields()}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
