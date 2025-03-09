
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { setCookie, checkCookie } from "../utils/cookieUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists, redirect to dashboard if it does
    if (checkCookie("auth_token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Log the login attempt for debugging
    console.info("Login attempt with:", { email, password });

    try {
      // API call to the login endpoint with mode: 'cors' and additional headers
      const response = await fetch("https://merchant-cug.twidpay.com/dashboard/auth-dashboard/v1/", {
        method: "POST",
        mode: "cors", // Enable CORS
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Set the token in a cookie with an expiry of 1 day
      setCookie("auth_token", data.token, 1);
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
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

        <h2 className="text-xl font-semibold text-left mb-6 text-primary">SIGN IN</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 rounded border border-red-200">
            {error}
          </div>
        )}

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
              placeholder="Enter your Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="relative">
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password*
              </label>
              <Link to="/auth/forgot-password" className="text-sm text-primary">
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            {isLoading ? (
              "SIGNING IN..."
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" /> SIGN IN
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
