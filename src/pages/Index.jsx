import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductDisplay from '../components/ProductDisplay';
import Footer from '../components/Footer';

const Index = () => {
  // Smooth scroll to section when URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Account for header height
            behavior: 'smooth'
          });
        }
      }
    };

    // Handle hash on initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <ProductDisplay />
        
        {/* About Section */}
        <section id="about" className="py-20 overflow-hidden">
          <div className="container-padding">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Crafted with Attention to Detail
              </h2>
              <p className="text-foreground/70 text-lg mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                We believe that true quality comes from careful attention to the smallest details. 
                Our design philosophy focuses on creating experiences that are both beautiful and 
                functional, with every element serving a purpose.
              </p>
              <p className="text-foreground/70 text-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Our team combines years of experience in design and technology to create products 
                that not only look elegant but also work flawlessly. We're constantly refining our 
                approach to deliver solutions that exceed expectations.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-secondary/50 overflow-hidden">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Get in Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Let's Start a Conversation
                </h2>
                <p className="text-foreground/70 text-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  Have questions or want to learn more? We'd love to hear from you.
                </p>
              </div>

              <div className="glass p-8 rounded-2xl shadow-lg opacity-0 animate-scale-up" style={{ animationDelay: '0.4s' }}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" 
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" 
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" 
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" 
                      placeholder="Tell us more..."
                    ></textarea>
                  </div>
                  <div className="text-center md:text-right">
                    <button type="submit" className="button-primary">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
