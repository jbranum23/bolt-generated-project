import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

// Temporary mock data
const mockRV = {
  id: 1,
  name: "Luxury Class A Motorhome",
  pricePerDay: 250,
  type: "Class A",
  sleeps: 6,
  length: 32,
  year: 2022,
  images: [
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400"
  ]
}

export default function RVDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleBooking = () => {
    if (!startDate || !endDate) return
    navigate(`/booking/${id}`, {
      state: { startDate, endDate }
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img 
            src={mockRV.images[0]} 
            alt={mockRV.name} 
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {mockRV.images.slice(1).map((img, i) => (
              <img 
                key={i}
                src={img}
                alt={`${mockRV.name} view ${i + 2}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{mockRV.name}</h1>
            <p className="text-xl text-gray-600">${mockRV.pricePerDay}/day</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>Type: {mockRV.type}</div>
              <div>Sleeps: {mockRV.sleeps}</div>
              <div>Length: {mockRV.length}ft</div>
              <div>Year: {mockRV.year}</div>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
