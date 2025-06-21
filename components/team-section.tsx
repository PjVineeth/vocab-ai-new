import { ExternalLink } from "lucide-react"

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Dr. K. T. Deepak",
      title: "FOUNDER, CEO | Assistant Prof. ECE, Assoc Dean R&D, CEO for IDRP, IIIT Dharwad",
      image: "/Deepak.png",
      description:
        "13 years of academic and research experience, 6 years of industrial experience (Semiconductor technologies) Has a celebrated research track of more than 45 research publications, with an h-index of 11, developed solutions for multilingual ASRs, speech enhancement, computer vision, NLP and LLM technologies. Champions AI/ML technologies in IIIT Dharwad.",
      linkedin: "https://www.linkedin.com/in/pj-vineeth-kumar-88610927b/",
    },
    {
      name: "Mr. Mahidhar Sastry",
      title: "CO-FOUNDER | Wyzmindz Solutions, Bangalore",
      image: "/MahindarSastry.png",
      description:
        "Six Sigma professional with a deep experience in Process Improvements and Change Management Practices. While being a champion of CRM, ERP and BI solutions, he has founded and been a director of a range of companies, with a decorated clientale of TATA-AIG, FLIPKART, LENSKART, etc.",
      linkedin: "https://www.linkedin.com/in/pj-vineeth-kumar-88610927b/",
    },
    {
      name: "Mr. Chetan Modla",
      title: "Chairman & Managing Director, Wyzmindz Solutions",
      image: "/Chethan.png",
      description:
        "Master Black belt in Six Sigma, Member of Nasscom Regional Council and a Board Member of PACT, he has built successful enterprises and brands. With specialization in Innovation, Re-engineering, Theory of Constraints, Work Force Management, COPC, Advanced Forecasting Techniques, he steers the AI inclusion in customer life-cycle management.",
      linkedin: "https://www.linkedin.com/in/pj-vineeth-kumar-88610927b/",
    },
    {
      name: "Dr. Ravi Shankar Prasad",
      title: "Chief Operating Officer",
      image: "/Ravi.png",
      description:
        "12 years of academic and research experience, 4 years of industrial experience (Technological Services). Has a research track of more than a dozen of research publications, during his PhD (@ IIIT-H) and PostDoc (Idiap Research Institute, Switzerland) tenure. Has developed solutions for speech analysis, and enhancement, has expertise on AI/ML principles.",
      linkedin: "https://www.linkedin.com/in/pj-vineeth-kumar-88610927b/",
    },
  ]

  return (
    <section id="team" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Our Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-blue-600">{member.name}</h3>
                      <p className=" text-gray-900 font-normal">{member.title}</p>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed"><span className="font-bold text-blue-600">Experience:</span> {member.description}</p>
                    <a className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1 transition-colors" href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      View profile
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
