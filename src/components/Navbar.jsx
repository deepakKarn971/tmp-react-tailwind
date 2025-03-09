
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-padding h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-semibold text-xl tracking-tight opacity-0 animate-fade-in"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          Minimal
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Features', 'Products', 'About', 'Contact'].map((item, index) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className="text-foreground/80 font-medium transition-colors duration-300 hover:text-foreground opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 0.1 + 0.2}s`, animationFillMode: 'forwards' }}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Call to Action */}
        <div className="hidden md:block opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <button className="button-primary">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="relative w-6 h-5">
            <span 
              className={`absolute left-0 top-0 w-full h-0.5 bg-foreground rounded-full transition-all duration-300 transform ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`} 
            />
            <span 
              className={`absolute left-0 top-2 w-full h-0.5 bg-foreground rounded-full transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`} 
            />
            <span 
              className={`absolute left-0 top-4 w-full h-0.5 bg-foreground rounded-full transition-all duration-300 transform ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white/95 z-40 flex flex-col items-center justify-center transition-all duration-500 ease-apple ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col space-y-8 items-center">
          {['Features', 'Products', 'About', 'Contact'].map((item, index) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className="text-2xl font-medium text-foreground transition-transform duration-300 hover:scale-105"
              onClick={() => setMenuOpen(false)}
              style={{ 
                opacity: menuOpen ? 1 : 0, 
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              {item}
            </Link>
          ))}
          <button 
            className="button-primary mt-6"
            style={{ 
              opacity: menuOpen ? 1 : 0, 
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              transitionDelay: '0.4s'
            }}
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
