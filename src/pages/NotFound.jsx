
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container-padding py-20 text-center">
          <div className="glass p-12 rounded-2xl max-w-xl mx-auto">
            <h1 className="text-6xl font-bold mb-4 opacity-0 animate-scale-up" style={{ animationDelay: '0.1s' }}>404</h1>
            <p className="text-xl text-foreground/80 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              We couldn't find the page you're looking for.
            </p>
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Link 
                to="/" 
                className="button-primary inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
