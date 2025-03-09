
import React, { useEffect, useRef } from 'react';

const ProductDisplay = () => {
  const sectionRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const title = entry.target.querySelector('.title-animation');
            const subtitle = entry.target.querySelector('.subtitle-animation');
            
            if (title) title.classList.add('animate-slide-up');
            if (subtitle) subtitle.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const productObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    if (productRef.current) {
      productObserver.observe(productRef.current);
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      if (productRef.current) {
        productObserver.unobserve(productRef.current);
      }
    };
  }, []);

  return (
    <section id="products" className="py-20 bg-secondary/50 overflow-hidden" ref={sectionRef}>
      <div className="container-padding">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Showcase
          </span>
          <h2 className="title-animation text-3xl md:text-4xl font-bold mb-4 opacity-0">
            Beautiful and Functional
          </h2>
          <p className="subtitle-animation max-w-2xl mx-auto text-foreground/70 text-lg opacity-0" style={{ animationDelay: '0.2s' }}>
            Our products combine elegant aesthetics with thoughtful functionality, creating experiences that delight.
          </p>
        </div>

        <div 
          ref={productRef}
          className="relative mx-auto max-w-5xl opacity-0"
          style={{ transitionDelay: '0.3s' }}
        >
          {/* Product Display Area */}
          <div className="aspect-[16/9] bg-gradient-to-br from-white to-secondary/50 rounded-2xl shadow-xl overflow-hidden">
            {/* Product Showcase */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[85%] h-[85%] glass rounded-xl overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-8 flex items-center pl-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/90"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/90"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
                  </div>
                </div>
                
                <div className="pt-8 p-6 h-full">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg h-full border border-white/30 shadow-inner p-6 overflow-hidden flex flex-col">
                    {/* Product Content - Simple UI Elements */}
                    <div className="flex space-x-4 mb-6">
                      {[1, 2, 3, 4].map(i => (
                        <div 
                          key={i} 
                          className="h-10 rounded-md bg-white/40 flex-1 animate-pulse"
                          style={{ animationDuration: `${2 + i * 0.5}s` }}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="col-span-2 h-40 rounded-lg bg-white/30 animate-pulse" style={{ animationDuration: '3s' }}></div>
                      <div className="h-60 rounded-lg bg-white/30 animate-pulse" style={{ animationDuration: '4s' }}></div>
                      <div className="h-60 rounded-lg bg-white/30 animate-pulse" style={{ animationDuration: '3.5s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Intuitive Interface', description: 'Easy to understand and navigate' },
              { title: 'Smooth Animations', description: 'Delightful micro-interactions' },
              { title: 'Pixel Perfect', description: 'Attention to every detail' }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 glass rounded-xl text-center opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.4 + index * 0.2}s` }}
              >
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
