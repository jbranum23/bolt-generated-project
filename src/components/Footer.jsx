export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              Find your perfect RV rental and start your adventure today.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/rvs" className="text-gray-300 hover:text-white">Browse RVs</a></li>
              <li><a href="/how-it-works" className="text-gray-300 hover:text-white">How It Works</a></li>
              <li><a href="/support" className="text-gray-300 hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@rvrentals.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          © {new Date().getFullYear()} RV Rentals. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
