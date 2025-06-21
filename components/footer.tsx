"use client"

import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const menuLinks = ["Home", "Products", "Features", "Team", "Gallery", "Contact Us"]

  // Map menu items to their corresponding section IDs (same as header)
  const sectionMap: { [key: string]: string } = {
    "Home": "hero",
    "Products": "features", 
    "Features": "why-choose-us",
    "Team": "team",
    "Gallery": "gallery",
    "Contact Us": "contact"
  }

  const handleMenuClick = (link: string) => {
    const sectionId = sectionMap[link]
    const section = document.querySelector(`#${sectionId}`)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
          <div className="flex items-center">
          <Image
            src="/vocab-trans-logo.png"
            alt="VocaB.AI Logo"
            width={200}
            height={62}
            priority
            className="w-auto h-12"
          />
        </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming conversations and visuals into actionable business intelligence through advanced AI
              technology.
            </p>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Location</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>
                VocaB.AI Private Limited, #123, 
                  <br />
                  3rd Floor Whitefield Industrial Estate, Kadugodi Main Road,
                  Kundalahalli Post, Bengaluru - 560066
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 90525 24389</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@vocabai.com</span>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Menu</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {menuLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleMenuClick(link)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 VOCABAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
