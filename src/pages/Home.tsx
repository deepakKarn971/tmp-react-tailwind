
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Twid</h1>
      <p className="text-lg mb-8">This is the home page of our application.</p>
      <div className="flex space-x-4">
        <Link
          to="/auth/login"
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Home;
