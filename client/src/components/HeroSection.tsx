import React from "react"
import { Link } from "react-router-dom"
import heroImg from "../assets/images/hero_image.jpg"
import {
  Briefcase,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  Bell,
  Users,
  Zap,
  Shield,
  Clock,
  Menu,
  X,
} from "lucide-react"
const HeroSection = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
      <div className='grid lg:grid-cols-2 gap-12 items-center'>
        <div className='space-y-8'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 leading-tight'>
            APPLY
            <span className='text-transparent bg-clip-text bg-blue-600'>
              FLOW
            </span>
          </h1>
          <p className='text-xl text-gray-600 leading-relaxed'>
            {" "}
            A personal job application and interview tracking system with
            analytics and skill matching.
          </p>
          <p className='text-xl text-gray-600 leading-relaxed'>
            {" "}
            I built ApplyFlow to solve a real problem I faced while applying to
            multiple roles. tracking applications across companies, managing
            interview schedules, and understanding where my skills matched (or
            didn’t) each role.
          </p>
          <p className='text-xl text-gray-600 leading-relaxed'>
            {" "}
            It’s a tool I actively use to organize my job search and make better
            decisions about where to focus.
          </p>
          <p className='text-xl text-gray-600 leading-relaxed'>
            {" "}
            Most job searches break down in spreadsheets, scattered notes, and
            calendar reminders. ApplyFlow replaces that with a single system
            that tracks application status, interview timelines, and
            role-specific skill alignment.
          </p>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              to='/register'
              className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-lg font-semibold'
            >
              Try it out
              <ArrowRight className='w-5 h-5' />
            </Link>
            <a
              href='#features'
              className='inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors text-lg font-semibold'
            >
              See features
            </a>
          </div>
        </div>

        {/* Hero Image / Illustration */}
        <div className='relative'>
          <div className='bg-blue-600 rounded-2xl p-8 shadow-2xl'>
            <div className='bg-white rounded-xl p-6 space-y-4'>
              <img
                src={heroImg}
                alt='ApplyFlow Dashboard Preview'
                className='w-full h-auto rounded-lg'
              />
            </div>
          </div>
          {/* Floating badges */}
          <div className='absolute -top-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-lg'>
            <p className='text-2xl font-bold text-blue-600'>Start</p>
            <p className='text-xs text-gray-600'>Tracking today</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
