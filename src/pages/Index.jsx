
import React from 'react';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Empty main section with just the navbar */}
      </main>
    </div>
  );
};

export default Index;
