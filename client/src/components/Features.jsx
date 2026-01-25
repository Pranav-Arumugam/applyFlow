import React from "react"
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
const Features = () => {
  const features = [
    {
      icon: <Target className='w-6 h-6' />,
      title: "Understand skill fit",
      description:
        " Compare required job skills against my own skill set to see where I’m strong and where I need to improve.",
    },
    {
      icon: <BarChart3 className='w-6 h-6' />,
      title: "Track job applications",
      description:
        "Keep every role, company, status, and location in one structured view.",
    },
    {
      icon: <Calendar className='w-6 h-6' />,
      title: "Manage interview schedules",
      description:
        "A calendar-based view for upcoming interviews, technical rounds, and follow-ups.",
    },
    {
      icon: <TrendingUp className='w-6 h-6' />,
      title: "Analyze progress",
      description:
        "See patterns across applications, interviews, offers, and rejections instead of guessing what’s working.",
    },
    {
      icon: <Briefcase className='w-6 h-6' />,
      title: "Application Management",
      description:
        "Organize all your job applications in one place. Filter, sort, and search with ease.",
    },
  ]
  return (
    <section
      id='features'
      className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'
    >
      <div className=' mb-16'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4  ml-3 md:ml-26 capitalize'>
          What Apply<span className='text-blue-600'>Flow</span> helps me do
        </h2>
        <p className='text-xl text-gray-600 max-w-3xl ml-3 md:ml-26 capitalize'>
          Features breakdown
        </p>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {features.map((feature, i) => (
          <div
            key={i}
            className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
          >
            <div className='w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4'>
              {feature.icon}
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>
              {feature.title}
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
