import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">RV Rentals</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/rvs" className="text-gray-700 hover:text-gray-900">Browse RVs</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
