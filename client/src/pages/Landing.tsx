import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Briefcase, ArrowRight, Menu, X } from "lucide-react"
import HeroSection from "../components/HeroSection"
import Features from "../components/Features"
import { TechOverview } from "../components/TechOverview"
import Learned from "../components/Learned"
import BuildReason from "../components/BuildReason"
import FutureImprovements from "../components/FutureImprovements"

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50'>
      {/* Navigation */}
      <nav className='sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link to='/' className='flex items-center gap-2'>
              <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Briefcase className='w-6 h-6 text-white' />
              </div>
              <span className='text-2xl font-bold text-gray-900'>
                ApplyFlow
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-8'>
              <a
                href='#features'
                className='text-gray-600 hover:text-gray-900 transition-colors'
              >
                Features
              </a>
              <a
                href='#why-i-built-it'
                className='text-gray-600 hover:text-gray-900 transition-colors capitalize'
              >
                why i built it
              </a>
              <a
                href='#tech-overview'
                className='text-gray-600 hover:text-gray-900 transition-colors capitalize'
              >
                Tech Overview
              </a>
              <a
                href='#what-i-learned'
                className='text-gray-600 hover:text-gray-900 transition-colors capitalize'
              >
                what i learned
              </a>
              <a
                href='#future-improvements'
                className='text-gray-600 hover:text-gray-900 transition-colors capitalize'
              >
                Future Plans
              </a>
              <Link
                to='/login'
                className='text-gray-600 hover:text-gray-900 transition-colors'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl'
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className='md:hidden p-2'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className='md:hidden py-4 space-y-4'>
              <a
                href='#features'
                className='text-gray-600 hover:text-gray-900 transition-colors'
              >
                Features
              </a>
              <a
                href='#why-i-built-it'
                className='text-gray-600 hover:text-gray-900 transition-colors capitalize'
              >
                why i built it
              </a>
              <a
                href='#tech-overview'
                className='text-gray-600 hover:text-gray-900 transition-colors capitalize'
              >
                Tech Overview
              </a>
              <a
                href='#what-i-learned'
                className='text-gray-600 hover:text-gray-900 transition-colors capitalize'
              >
                what i learned
              </a>
              <a
                href='#future-improvements'
                className='text-gray-600 hover:text-gray-900 transition-colors capitalize'
              >
                Future Plans
              </a>
              <Link
                to='/login'
                className='block text-gray-600 hover:text-gray-900'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='block px-6 py-2 bg-blue-600 text-white rounded-lg text-center'
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      <BuildReason />

      <Features />

      <TechOverview />

      {/* Features Section */}

      <Learned />

      <FutureImprovements />

      {/* CTA Section */}
      <section className='bg-blue-600 py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6 capitalize'>
            explore the app
          </h2>
          <Link
            to='/register'
            className='inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-lg font-semibold'
          >
            Get Started
            <ArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-200 bg-white py-8'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <div className='w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center'>
                <Briefcase className='w-4 h-4 text-white' />
              </div>
              <span className='font-medium text-gray-900'>ApplyFlow</span>
              <span className='text-gray-400'>·</span>
              <span>A personal job application system</span>
            </div>

            <div className='flex items-center gap-4 text-sm'>
              <a
                href='https://github.com/your-username/application-os'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-gray-900 transition-colors'
              >
                GitHub
              </a>

              <span className='text-gray-300'>|</span>

              <span className='text-gray-400'>
                Built for learning and real use
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
