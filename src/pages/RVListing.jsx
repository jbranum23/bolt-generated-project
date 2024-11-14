import { Link } from 'react-router-dom'

// Temporary mock data until API is implemented
const mockRVs = [
  {
    id: 1,
    name: "Luxury Class A Motorhome",
    pricePerDay: 250,
    type: "Class A",
    sleeps: 6,
    images: ["https://placehold.co/600x400"]
  },
  {
    id: 2,
    name: "Compact Travel Trailer",
    pricePerDay: 150,
    type: "Travel Trailer",
    sleeps: 4,
    images: ["https://placehold.co/600x400"]
  }
]

export default function RVListing() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockRVs.map(rv => (
          <Link 
            key={rv.id} 
            to={`/rvs/${rv.id}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img 
              src={rv.images[0]} 
              alt={rv.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{rv.name}</h3>
              <p className="text-gray-600">${rv.pricePerDay}/day</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span>{rv.type} • Sleeps {rv.sleeps}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
