"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [active, setActive] = useState("Home")
  const [profileImageError, setProfileImageError] = useState(false)
  const [mobileProfileImageError, setMobileProfileImageError] = useState(false)
  
  // Use the authentication hook
  const { user, isLoading, isAuthenticated, login, logout } = useAuth()

  const navItems = ["Home", "Products","Features", "Team", "Gallery", "Contact"]

  // Map navigation items to their corresponding section IDs based on user requirements
  const sectionMap: { [key: string]: string } = {
    "Home": "hero", // Home -> when on hero section
    "Products": "features", // Products -> when on features section  
    "Features": "why-choose-us", // Features -> when on why choose us section
    "Team": "team", // Team -> on team section
    "Gallery": "gallery", // Gallery -> on gallery section
    "Contact": "contact" // Contact -> on contact section
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
      // Close dropdowns on scroll
      setIsServicesDropdownOpen(false)
      setIsMobileServicesOpen(false)

      // Determine active section based on scroll position
      let currentSection = "Home" // Default to Home

      // Get all sections and check which one is currently in view
      const sections = Object.entries(sectionMap)
      
      for (const [navItem, sectionId] of sections) {
        const element = document.getElementById(sectionId)
        
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top
          const elementBottom = rect.bottom
          
          // Check if section is in viewport (with some offset for better UX)
          // Consider a section active if its top is within 100px of the top of viewport
          if (elementTop <= 100 && elementBottom > 100) {
            currentSection = navItem
          }
        }
      }

      // Special case: if we're at the very top, always show Home as active
      if (scrollPosition < 100) {
        currentSection = "Home"
      }

      // Update active section if it changed
      if (currentSection !== active) {
        setActive(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run once on mount to set initial active section
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [active])

  // Reset image error states when user changes
  useEffect(() => {
    setProfileImageError(false)
    setMobileProfileImageError(false)
  }, [user?.id])

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false)
      }
      if (!target.closest('.services-dropdown-container')) {
        setIsServicesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogin = () => {
    login()
  }

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-[100] shadow-sm transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className={`max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between transition-all duration-300`}>
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="VocaB.AI Logo"
            width={isScrolled ? 160 : 200}
            height={isScrolled ? 50 : 62}
            priority
            className="transition-all duration-300 w-auto h-8 md:h-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className={`flex space-x-8 transition-all duration-300 ${
            isScrolled ? 'space-x-6' : 'space-x-8'
          }`}>
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className={`text-sm transition-all duration-300 ${
                    active === item
                      ? "font-medium text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(item)
                    const sectionId = sectionMap[item]
                    const section = document.querySelector(`#${sectionId}`)
                    section?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
            {/* Services Dropdown (Desktop) - Only show when logged in */}
            {isAuthenticated && (
              <li className="relative services-dropdown-container">
                <button
                  className={`flex items-center text-sm transition-all py-[0.2rem] duration-300 ${
                    active === 'Services' ? 'font-medium text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => {
                    setIsServicesDropdownOpen(!isServicesDropdownOpen)
                  }}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isServicesDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isServicesDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <li>
                      <a 
                        href="http://27.111.72.61:9002" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        SARATHI-AI
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#chitra-ai" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        CHITRA-AI
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://vani-ai.onrender.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Vocab Assist
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>

        {/* Login Button / Profile Picture */}
        <div className="hidden md:block relative profile-menu-container">
          {isAuthenticated ? (
            <div>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 bg-white flex items-center justify-center">
                  {user?.picture && !profileImageError ? (
                    <>
                      {/* Try regular img first, fallback to Next.js Image */}
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={() => {
                          console.log('Profile image failed to load:', user.picture);
                          console.log('Trying to load image from URL:', user.picture);
                          setProfileImageError(true);
                        }}
                        onLoad={() => {
                          console.log('Profile image loaded successfully:', user.picture);
                        }}
                      />
                    </>
                  ) : (
                    <User className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              </button>
              
              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user?.name}
                  </div>
                  <a
                    href="/timesheets"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Timesheets
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <ul className="py-2">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className={`block px-4 py-2 text-sm ${
                    active === item
                      ? "font-medium text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(item)
                    setIsMenuOpen(false)
                    const sectionId = sectionMap[item]
                    const section = document.querySelector(`#${sectionId}`)
                    section?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
            {/* Services Dropdown (Mobile) - Only show when logged in */}
            {isAuthenticated && (
              <li>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:text-blue-600 focus:outline-none"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isMobileServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isMobileServicesOpen && (
                  <ul className="pl-6 bg-gray-50">
                    <li>
                      <a 
                        href="http://27.111.72.61:9002" 
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        SARATHI-AI
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#chitra-ai" 
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        CHITRA-AI
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://vani-ai.onrender.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Vocab Assist
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            )}
            <li className="border-t mt-2 pt-2 px-4 flex items-center">
              {isAuthenticated ? (
                <>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-blue-600 bg-white flex items-center justify-center mr-2">
                    {user?.picture && !mobileProfileImageError ? (
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={() => {
                          console.log('Mobile profile image failed to load:', user.picture);
                          setMobileProfileImageError(true);
                        }}
                        onLoad={() => {
                          console.log('Mobile profile image loaded successfully:', user.picture);
                        }}
                      />
                    ) : (
                      <User className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <span className="text-sm mr-2 truncate max-w-[100px]">{user?.name || 'Profile'}</span>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="ml-auto text-blue-600 text-xs font-medium hover:underline"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { handleLogin(); setIsMenuOpen(false); }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
