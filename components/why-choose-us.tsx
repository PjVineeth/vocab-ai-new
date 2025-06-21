import { CheckCircle, Settings, Target, Zap } from "lucide-react"

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "AI-Powered Insights That Drive Results",
      description:
        "Get real-time data and predictive analytics designed to deliver actionable high-value insights that improve your business performance.",
    },
    {
      icon: Settings,
      title: "Comprehensive & Customizable Solutions",
      description:
        "Tailored AI solutions that adapt to your specific business needs and integrate seamlessly with your existing workflows.",
    },
    {
      icon: Target,
      title: "Expert-Driven Performance-Focused",
      description:
        "Our team of AI experts ensures optimal performance and continuous improvement of your analytics capabilities.",
    },
    {
      icon: Zap,
      title: "Efficiency, Speed, and Competitive Advantage",
      description:
        "Accelerate decision-making with fast, accurate insights that give you a competitive edge in your market.",
    },
  ]

  return (
    <section id="why-choose-us" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose Us?</h2>

            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <benefit.icon size={20} className="text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
              Get Started
            </button>
          </div>

          {/* Right Illustration */}
          <div className="relative left-20">
            <img 
              src="/why-choose-us.png" 
              alt="AI-powered analytics illustration" 
              // className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}
