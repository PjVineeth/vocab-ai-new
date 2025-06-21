import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import WhyChooseUs from "@/components/why-choose-us"
import TeamSection from "@/components/team-section"
import GallerySection from "@/components/gallery-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import AuthDebug from "@/components/auth-debug"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <WhyChooseUs />
      <TeamSection />
      <GallerySection />
      <FAQSection />
      <ContactSection />
      <Footer />
      {/* <AuthDebug /> */}
    </main>
  )
}
