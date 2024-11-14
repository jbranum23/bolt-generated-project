import create from 'zustand'

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  
  selectedRV: null,
  setSelectedRV: (rv) => set({ selectedRV: rv }),
  
  bookingDetails: null,
  setBookingDetails: (details) => set({ bookingDetails: details }),
}))

export default useStore
