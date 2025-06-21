"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryImages = [
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "AI Neural Network Visualization",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Data Analytics Dashboard",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Machine Learning Interface",
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Speech Recognition Technology",
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Computer Vision System",
      gradient: "from-pink-600 to-red-600",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section id="gallery" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Gallery</h2>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Gallery Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className={`bg-gradient-to-br ${image.gradient} aspect-video rounded-2xl p-8 mx-4`}>
                    <div className="w-full h-full bg-black/20 rounded-xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/50 rounded-full"></div>
                        </div>
                        <p className="text-lg font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
