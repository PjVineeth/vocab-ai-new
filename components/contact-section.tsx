"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreeToTerms: false,
  })

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear any previous error when user starts typing
    if (formStatus.error) {
      setFormStatus(prev => ({ ...prev, error: "" }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset form status
    setFormStatus({ loading: true, success: false, error: "" })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus({ loading: false, success: true, error: "" })
        // Reset form data
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          agreeToTerms: false,
        })
      } else {
        setFormStatus({ loading: false, success: false, error: data.error || "Failed to send message" })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus({ loading: false, success: false, error: "Network error. Please try again." })
    }
  }

  return (
    <section id="contact" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Contact us</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Subject"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to learn more about your services and may receive communications from VOCABAI.
                </label>
              </div>

              {/* Form Status Messages */}
              {formStatus.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{formStatus.error}</p>
                </div>
              )}

              {formStatus.success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus.loading}
                className={`w-full px-8 py-4 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2 ${
                  formStatus.loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {formStatus.loading ? 'Sending...' : 'Submit'}
                <Send size={20} />
              </button>
            </form>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="aspect-square relative">
                {/* Person illustration */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-40 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-full"></div>
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full mx-auto -mt-8"></div>
                </div>

                {/* Chat bubbles */}
                <div className="absolute top-8 right-8 space-y-2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm">
                    Hello! How can we help?
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-sm text-sm shadow-sm ml-4">
                    I'd like to learn more
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-16 left-8 w-8 h-8 bg-purple-400 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute bottom-24 right-16 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
