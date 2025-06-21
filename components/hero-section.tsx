import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="hero" className="bg-white py-20 lg:py-32">
                {/* <div className="absolute left-[45rem] top-[10rem] p-[1px] rounded-full bg-gradient-to-b from-[#82C4FF] to-[#56B0FF] shadow-sm animate-gradient hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-full px-2 md:px-4 py-1 md:py-3 text-xxs md:text-xs hover:bg-opacity-90 transition-all duration-300">
                    Conversational AI
                  </div>
                </div>
                <div className="absolute left-[60rem] top-[16rem] p-[1px] rounded-full bg-gradient-to-b from-[#82C4FF] to-[#56B0FF] shadow-sm animate-gradient hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-full px-2 md:px-4 py-1 md:py-3 text-xxs md:text-xs hover:bg-opacity-90 transition-all duration-300">
                    Agentic AI
                  </div>
                </div>
                <div className="absolute left-[58rem] top-[24rem] p-[1px] rounded-full bg-gradient-to-b from-[#82C4FF] to-[#56B0FF] shadow-sm animate-gradient hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-full px-2 md:px-4 py-1 md:py-3 text-xxs md:text-xs hover:bg-opacity-90 transition-all duration-300">
                    CRM
                  </div>
                </div> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl  lg:text-6xl font-semibold text-gray-900 leading-tight">
                Unlock Valuable Insights From Real-Life <span className="text-blue-600">Conversations</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Harness the power of advanced AI Speech, Text, and Image Analytics to transform unstructured data into
                actionable business intelligence.
              </p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors inline-flex items-center gap-2">
              Discover Services
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative left-20 top-10">
            <img 
              src="/Hero.png" 
              alt="AI-powered analytics illustration" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}
