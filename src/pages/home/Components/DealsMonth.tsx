import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import slide1 from "../../../assets/slide (1).png"
import slide2 from "../../../assets/slide (2).png"
import slide3 from "../../../assets/slide (3).png"
import { ChevronLeft, ChevronRight } from "lucide-react"


const products = [
  {
    id: 1,
    title: 'Spring Sale',
    discount: '30% OFF',
    image: slide1
  },
  {
    id: 2,
    title: 'Summer Collection',
    discount: '25% OFF',
    image: slide2
  },
  {
    id: 3,
    title: 'New Arrivals',
    discount: '20% OFF',
    image: slide3
  },
  {
    id: 4,
    title: 'Limited Edition',
    discount: '40% OFF',
    image: slide1
  }
];

export default function DealsMonth() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: "02",
    hours: "06",
    minutes: "05",
    seconds: "30",
  })

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let seconds = Number.parseInt(prev.seconds)
        let minutes = Number.parseInt(prev.minutes)
        let hours = Number.parseInt(prev.hours)
        let days = Number.parseInt(prev.days)

        seconds--

        if (seconds < 0) {
          seconds = 59
          minutes--
        }

        if (minutes < 0) {
          minutes = 59
          hours--
        }

        if (hours < 0) {
          hours = 23
          days--
        }

        return {
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2) // Only 2 slides (0 and 1) since we show 3 products at once
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2) // Only 2 slides (0 and 1) since we show 3 products at once
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2) // Only 2 slides (0 and 1) since we show 3 products at once
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side content */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Deals Of The Month</h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam
              sem. Scelerisque duis ultrices sollicitudin
            </p>

            <button className="bg-black text-white px-8 py-3 rounded inline-block font-medium transition-transform hover:scale-105 active:scale-95">
              Buy Now
            </button>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Hurry, Before It&apos;s Too Late!</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="bg-white w-16 h-16 flex items-center justify-center rounded shadow-md">
                    <span className="text-2xl font-bold">{timeLeft.days}</span>
                  </div>
                  <span className="mt-2 text-gray-600">Days</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-white w-16 h-16 flex items-center justify-center rounded shadow-md">
                    <span className="text-2xl font-bold">{timeLeft.hours}</span>
                  </div>
                  <span className="mt-2 text-gray-600">Hr</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-white w-16 h-16 flex items-center justify-center rounded shadow-md">
                    <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                  </div>
                  <span className="mt-2 text-gray-600">Mins</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-white w-16 h-16 flex items-center justify-center rounded shadow-md">
                    <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                  </div>
                  <span className="mt-2 text-gray-600">Sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side slider */}
          <div className="w-full md:w-2/3 relative">
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {/* First slide with 3 products */}
                  <div className="min-w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <img
                          src={products[0].image || "/placeholder.svg"}
                          alt={products[0].title}
                          className="w-full h-96 object-cover rounded"
                        />
                        <div className="absolute bottom-6 left-6 bg-white p-4 rounded">
                          <div className="text-sm font-medium text-gray-500">
                            {products[0].id.toString().padStart(2, "0")} <span className="mx-2">—</span>{" "}
                            {products[0].title}
                          </div>
                          <div className="text-2xl font-bold">{products[0].discount}</div>
                        </div>
                        <div className="absolute top-0 bottom-0 -left-1 w-1 bg-pink-500"></div>
                      </div>
                      <div className="relative">
                        <img
                          src={products[1].image || "/placeholder.svg"}
                          alt={products[1].title}
                          className="w-full h-96 object-cover rounded"
                        />
                      </div>
                      <div className="relative">
                        <img
                          src={products[2].image || "/placeholder.svg"}
                          alt={products[2].title}
                          className="w-full h-96 object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Second slide with remaining products */}
                  <div className="min-w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <img
                          src={products[3].image || "/placeholder.svg"}
                          alt={products[3].title}
                          className="w-full h-96 object-cover rounded"
                        />
                        <div className="absolute bottom-6 left-6 bg-white p-4 rounded">
                          <div className="text-sm font-medium text-gray-500">
                            {products[3].id.toString().padStart(2, "0")} <span className="mx-2">—</span>{" "}
                            {products[3].title}
                          </div>
                          <div className="text-2xl font-bold">{products[3].discount}</div>
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={products[0].image || "/placeholder.svg"}
                          alt={products[0].title}
                          className="w-full h-96 object-cover rounded"
                        />
                      </div>
                      <div className="relative">
                        <img
                          src={products[1].image || "/placeholder.svg"}
                          alt={products[1].title}
                          className="w-full h-96 object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 transition-transform hover:scale-105 active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 transition-transform hover:scale-105 active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-4">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 mx-1 rounded-full ${currentSlide === index ? "bg-gray-800 ring-2 ring-gray-300" : "bg-gray-300"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
