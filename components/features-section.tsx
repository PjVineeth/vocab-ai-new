import { Bot, BarChart3, Camera } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      title: "NLP Toolkit",
      image: "/Features.jpeg",
      points: [
        "Real-time transcription & sentiment analysis",
        "Emotion & intent recognition from customer interactions",
        "Automated alerts for quality, compliance, and escalation",
      ],
    },
    {
      title: "Text Analytics",
      image: "/Features.jpeg",
      points: [
        "Analyze chat logs, reviews, and documents for patterns",
        "Multi-language support for global scale",
        "Extract key themes, FAQs, and customer issues",
      ],
    },
    {
      title: "Image & Video Analytics",
      image: "/Features.jpeg",
      points: [
        "Detect defects, objects, and anomalies in real-time",
        "Visual quality control and monitoring",
        "AI tagging and classification for faster audits",
      ],
    },
  ]

  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Built to Decode Conversations and Visuals</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With cutting-edge AI and machine learning capabilities, our platform transforms raw data into actionable
            insights that drive business growth and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              {/* Feature Card with Image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                </div>
              </div>

              {/* Points below card */}
              <div className="mt-6 space-y-3">
                {feature.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
