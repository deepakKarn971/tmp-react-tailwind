
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    // In a real application, this would call an API to send a reset email
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className="bg-black rounded-full p-2 mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L19 7V17L12 22L5 17V7L12 2Z" fill="white" />
              </svg>
            </div>
            <span className="text-2xl font-bold">twid</span>
            <sup className="text-xs">™</sup>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-6 text-primary">FORGOT PASSWORD</h2>

        <div className="text-center text-gray-600 mb-6">
          Enter your email and we'll send you an email 
          with reset password link to reset your 
          password.
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            disabled={isSubmitted}
          >
            {isSubmitted ? "SENDING..." : "SEND RESET LINK"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            back to{" "}
            <Link to="/auth/login" className="font-medium text-primary hover:text-primary/80">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
