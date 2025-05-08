import React from 'react';

import { Link } from 'react-router-dom';

import image1 from "../../../assets/image (1).png"
import image2 from "../../../assets/image (2).png"
import image3 from "../../../assets/image (3).png"
import image4 from "../../../assets/image (4).png"



const Hero = () => {
  return (
    <div className="w-full py-[120px] overflow-hidden scroll-smooth">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column - Man sitting on box */}
          <div className="h-96 md:h-auto overflow-hidden bg-gray-200 rounded-lg">
            <img 
              src={image3} 
              alt="Man in casual wear" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Middle Column - Sale Content and Women Images */}
          <div className="flex flex-col gap-4">
            {/* Top Women Group Image */}
            <div className="h-48 overflow-hidden bg-gray-200 rounded-lg">
              <img 
                src={image1} 
                alt="Group of women in fashionable clothing" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Middle Sale Content */}
            <div className="flex flex-col items-center justify-center text-center p-4 flex-grow">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
                ULTIMATE
                <div className="text-7xl md:text-8xl font-bold outline-text">SALE</div>
              </h1>
              <p className="text-xl uppercase tracking-wider mb-6">NEW COLLECTION</p>
              <Link 
                to="/shop" 
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                SHOP NOW
              </Link>
            </div>
            
            {/* Bottom Women Image */}
            <div className="h-48 overflow-hidden bg-pink-200 rounded-lg">
              <img 
                src={image4} 
                alt="Women on pink background" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right Column - Man standing */}
          <div className="h-96 md:h-auto overflow-hidden bg-gray-200 rounded-lg">
            <img 
              src={image2} 
              alt="Man in orange sweater" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this CSS to your global styles
// .outline-text {
//   color: white;
//   -webkit-text-stroke: 1px #333;
//   text-stroke: 1px #333;
// }

export default Hero;