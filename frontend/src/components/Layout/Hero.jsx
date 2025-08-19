import React, { useEffect, useState } from 'react'
import heroImg from "../../assets/cart-banner.webp"
import { Link } from "react-router-dom";

const Hero = () => {
  
  const firstLineLetters = "VACATION".split("");
  const secondLineLetters = "READY".split("");
  const [gradientPosition, setGradientPosition] = useState(0);

  const allLetters = [...firstLineLetters, ...secondLineLetters];
  const colors = [
    "text-red-500", 
    "text-yellow-500", 
    "text-green-500", 
    "text-blue-500", 
    "text-purple-500", 
    "text-pink-500", 
    "text-teal-500", 
    "text-orange-500"
  ];
  
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLetterIndex((prev) => (prev + 1) % allLetters.length);
    }, 400);
    
    return () => clearInterval(interval);
  }, [allLetters.length]);

// for the button gradient
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);


  return (
    <section className='relative'>
        <img src={heroImg} alt="Rabbit" 
        className='w-full h-[500px] md:h-[400px] lg:h-[550px] object-cover'/>

<div className='absolute inset-0 bg-black bg-opacity-0 flex items-center'>
        <div className='text-left text-white p-7'>
          <div className='flex flex-col'>
            <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
              {firstLineLetters.map((letter, index) => (
                <span 
                  key={`vacation-${index}`} 
                  className={`transition-colors duration-300 ${
                    index === activeLetterIndex ? colors[index % colors.length] : 'text-emerald-800'
                  }`}
                >
                  {letter}
                </span>
              ))}
            </h1>
            <h2 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase drop-shadow-lg">
              {secondLineLetters.map((letter, index) => (
                <span 
                  key={`ready-${index}`} 
                  className={`transition-colors duration-300 ${
                    index + firstLineLetters.length === activeLetterIndex ? 
                      colors[(index + firstLineLetters.length) % colors.length] : 
                      'text-emerald-800'
                  }`}
                >
                  {letter}
                </span>
              ))}
            </h2>
          </div>
          
          <p className='text-sm tracking-tighter md:text-lg mb-6 text-gray-600'>
            Explore our vacation-ready outfits with fast worldwide shipping
          </p>

          {/* <Link
          to="#"
          className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>
            Shop Now
          </Link> */}
           <Link
      to="#"
      className="relative px-6 py-2 rounded-sm text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105"
      style={{
        backgroundImage: `linear-gradient(90deg, 
          #ff6b6b ${gradientPosition}%, 
          #feca57 ${gradientPosition + 20}%, 
          #55efc4 ${gradientPosition + 40}%, 
          #74b9ff ${gradientPosition + 60}%, 
          #a29bfe ${gradientPosition + 80}%, 
          #ff6b6b ${gradientPosition + 100}%)`,
        backgroundSize: '200% 100%',
        color: '#fff',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
      }}
    >
      Shop Now
    </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero