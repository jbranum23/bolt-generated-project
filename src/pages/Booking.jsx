import { useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'

// Temporary mock data
const mockRV = {
  id: 1,
  name: "Luxury Class A Motorhome",
  pricePerDay: 250
}

const mockAddons = [
  { id: 1, name: "Generator", price: 25 },
  { id: 2, name: "Bike Rack", price: 15 },
  { id: 3, name: "Outdoor Furniture Set", price: 20 }
]

export default function Booking() {
  const { id } = useParams()
  const { state } = useLocation()
  const [selectedAddons, setSelectedAddons] = useState([])
  const [deliveryOption, setDeliveryOption] = useState('pickup')
  const [deliveryAddress, setDeliveryAddress] = useState('')

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  const handlePayment = async () => {
    // Implement payment logic here
    console.log('Processing payment...')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>Start Date: {state?.startDate?.toLocaleDateString()}</div>
            <div>End Date: {state?.endDate?.toLocaleDateString()}</div>
            <div>Base Price: ${mockRV.pricePerDay}/day</div>
            <div>Total Days: {
              state?.startDate && state?.endDate
                ? Math.ceil((state.endDate - state.startDate) / (1000 * 60 * 60 * 24))
                : 0
            }</div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Add-ons</h2>
          <div className="space-y-2">
            {mockAddons.map(addon => (
              <label key={addon.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => handleAddonToggle(addon.id)}
                />
                <span>{addon.name} - ${addon.price}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="pickup"
                checked={deliveryOption === 'pickup'}
                onChange={e => setDeliveryOption(e.target.value)}
              />
              <span>Self Pickup</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="delivery"
                checked={deliveryOption === 'delivery'}
                onChange={e => setDeliveryOption(e.target.value)}
              />
              <span>Delivery</span>
            </label>
            {deliveryOption === 'delivery' && (
              <textarea
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                placeholder="Enter delivery address"
                className="w-full border rounded p-2 mt-2"
                rows="3"
              />
            )}
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}
