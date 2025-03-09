
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-text-reveal');
          }
        });
      },
      { threshold: 0.1 }
    );

    const titleWords = titleRef.current.querySelectorAll('.title-word');
    titleWords.forEach(word => observer.observe(word));

    return () => {
      titleWords.forEach(word => observer.unobserve(word));
    };
  }, []);

  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      <div className="container-padding">
        {/* Hero Content */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Small Subtitle */}
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
            Introducing Minimal Design
          </div>
          
          {/* Main Title */}
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
          >
            {/* Each word will animate separately */}
            {'Clean. Modern. Minimal.'.split(' ').map((word, index) => (
              <span 
                key={index} 
                className="title-word inline-block opacity-0"
                style={{ '--index': index }}
              >
                {word}{' '}
              </span>
            ))}
          </h1>
          
          {/* Description */}
          <p className="text-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            A modern approach to design with focus on simplicity, function, and attention to detail.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <button className="button-primary">Get Started</button>
            <button className="button-secondary">Learn More</button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl opacity-0 animate-scale-up" style={{ animationDelay: '1s' }}>
          <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-background relative overflow-hidden">
            {/* Main Product Image */}
            <div className="absolute inset-0 flex items-center justify-center animate-floating">
              <div className="glass max-w-[80%] h-auto rounded-xl shadow-lg">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-inner"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
