"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

// A placeholder for your Firebase logic
// import { auth, googleProvider, signInWithEmailAndPassword } from "@/lib/firebase";
// import { signInWithPopup } from "firebase/auth";

const SignInIllustration = () => (
  <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-100 dark:bg-gray-800">
    <div className="max-w-md text-center">
      {/* You can replace this with your actual illustration SVG or Image component */}
      <img
        src="login.jpg" // Re-using the same image for consistency
        alt="Sign In Illustration"
        className="w-full h-auto"
      />
      <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
        Welcome Back to Connectly
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        The one-stop platform for educational institutes to connect and thrive.
      </p>
    </div>
  </div>
);

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    // try {
    //   const result = await signInWithPopup(auth, googleProvider);
    //   console.log("Google Sign-In Success:", result.user);
    //   // After successful sign-in, you'd typically check the user's role
    //   // from your database and redirect them accordingly.
    //   navigate("/home");
    // } catch (error) {
    //   console.error("Google Sign-In Error:", error);
    // }
    navigate("/home");
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    // try {
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   console.log("Email Sign-In Success:", userCredential.user);
    //   navigate("/home");
    // } catch (error) {
    //   console.error("Email Sign-In Error:", error.message);
    //   alert(`Sign-in failed: ${error.message}`);
    // }
    toast.success("Welcome back");
    navigate("/home");
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <SignInIllustration />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleEmailSignIn} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
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
            className="w-full bg-transparent"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
