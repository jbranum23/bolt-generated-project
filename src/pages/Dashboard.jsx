import React from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/useStore'

// Updated mock data to include id
const mockListings = [
  {
    id: 1,
    name: "Luxury Class A Motorhome",
    pricePerDay: 250,
    images: ["https://placehold.co/600x400"]
  },
  {
    id: 2,
    name: "Compact Travel Trailer",
    pricePerDay: 150,
    images: ["https://placehold.co/600x400"]
  }
]

const mockBookings = [
  {
    id: 1,
    rv: {
      name: "Luxury Class A Motorhome"
    },
    startDate: "2023-08-01",
    endDate: "2023-08-05",
    totalPrice: 1250,
    status: "Confirmed"
  }
]

export default function Dashboard() {
  const user = useStore(state => state.user)
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {user?.role === 'owner' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your RVs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockListings.map(rv => (
              <div key={rv.id} className="border rounded-lg p-4">
                <img 
                  src={rv.images[0]} 
                  alt={rv.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-semibold">{rv.name}</h3>
                <p className="text-gray-600">${rv.pricePerDay}/day</p>
                <div className="mt-4">
                  <Link
                    to={`/rvs/${rv.id}/calendar`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Manage Calendar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        <div className="space-y-4">
          {mockBookings.map(booking => (
            <div key={booking.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{booking.rv.name}</h3>
                  <p className="text-gray-600">
                    {new Date(booking.startDate).toLocaleDateString()} - 
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${booking.totalPrice}</div>
                  <div className="text-sm text-gray-600">
                    Status: {booking.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
