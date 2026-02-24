import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-teal-700">CommonGround</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-teal-700 font-medium transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Organize Your Community,{' '}
            <span className="text-teal-600">Together</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            CommonGround is the community organizing platform that brings people together.
            Coordinate groups, plan events, and communicate — all in one place built for
            grassroots movements and neighborhood organizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg"
            >
              Start Organizing Free
            </Link>
            <Link
              to="/roadmap"
              className="bg-white text-teal-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-50 transition-colors shadow border border-teal-200"
            >
              See What's Coming
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything your community needs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '👥',
              title: 'Organizations & Groups',
              description: 'Create and manage organizations with nested groups. Assign roles, set permissions, and keep everyone aligned.',
            },
            {
              icon: '📅',
              title: 'Events & Meetings',
              description: 'Plan events, track RSVPs, and coordinate volunteers. From neighborhood cleanups to city council meetings.',
            },
            {
              icon: '💬',
              title: 'Messaging & Updates',
              description: 'Keep your community informed with group messaging, announcements, and real-time updates.',
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <span className="text-teal-700 font-semibold text-lg">CommonGround</span>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="/roadmap" className="text-gray-500 hover:text-teal-600 text-sm">Roadmap</Link>
              <Link to="/login" className="text-gray-500 hover:text-teal-600 text-sm">Sign In</Link>
              <Link to="/register" className="text-gray-500 hover:text-teal-600 text-sm">Register</Link>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">© 2024 CommonGround. Building communities together.</p>
        </div>
      </footer>
    </div>
  )
}
