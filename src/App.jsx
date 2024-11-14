import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import RVListing from './pages/RVListing'
import RVDetails from './pages/RVDetails'
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'
import RVCalendarSettings from './pages/RVCalendarSettings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rvs" element={<RVListing />} />
          <Route path="rvs/:id" element={<RVDetails />} />
          <Route path="rvs/:id/calendar" element={<RVCalendarSettings />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
