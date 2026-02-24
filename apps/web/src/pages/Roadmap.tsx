import { Link } from 'react-router-dom'

const milestones = [
  {
    id: 'M0',
    title: 'Milestone 0: Foundation',
    status: 'completed',
    description: 'Core infrastructure, authentication, and profile management.',
    features: ['User registration & login (magic link)', 'User profile page', 'Monorepo setup', 'CI/CD pipeline'],
  },
  {
    id: 'M1',
    title: 'Milestone 1: Organizations & Groups',
    status: 'coming-soon',
    description: 'Create and manage organizations with nested groups and role-based access.',
    features: ['Organization creation & management', 'Nested group structure', 'Role-based permissions', 'Member invitations'],
  },
  {
    id: 'M2',
    title: 'Milestone 2: Events',
    status: 'coming-soon',
    description: 'Plan and coordinate community events with RSVP tracking.',
    features: ['Event creation & scheduling', 'RSVP management', 'Volunteer coordination', 'Location & virtual support'],
  },
  {
    id: 'M3',
    title: 'Milestone 3: Messaging',
    status: 'coming-soon',
    description: 'Real-time group messaging and announcements.',
    features: ['Group chat channels', 'Direct messaging', 'Announcements & broadcasts', 'File & link sharing'],
  },
  {
    id: 'M4',
    title: 'Milestone 4: Campaigns',
    status: 'planned',
    description: 'Coordinate organizing campaigns with tasks and progress tracking.',
    features: ['Campaign creation & goals', 'Task assignment & tracking', 'Progress dashboards', 'Petitions & sign-ons'],
  },
]

const statusConfig = {
  completed: { label: 'Completed', className: 'bg-green-100 text-green-700' },
  'coming-soon': { label: 'Coming Soon', className: 'bg-teal-100 text-teal-700' },
  planned: { label: 'Planned', className: 'bg-gray-100 text-gray-600' },
}

export function Roadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      {/* Nav */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold text-teal-700">CommonGround</Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-teal-700 font-medium">Sign In</Link>
              <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Product Roadmap</h1>
          <p className="text-xl text-gray-600">
            We're building CommonGround milestone by milestone. Here's what's coming.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => {
            const config = statusConfig[milestone.status as keyof typeof statusConfig]
            return (
              <div key={milestone.id} className="relative">
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 -z-10" />
                )}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      milestone.status === 'completed' ? 'bg-teal-600 text-white' :
                      milestone.status === 'coming-soon' ? 'bg-teal-100 text-teal-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {milestone.status === 'completed' ? '✓' : milestone.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${config.className}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{milestone.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {milestone.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-gray-600">
                            <span className="mr-2 text-teal-500">→</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Want to be part of building CommonGround?</p>
          <Link
            to="/register"
            className="bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg"
          >
            Join Early Access
          </Link>
        </div>
      </div>
    </div>
  )
}
