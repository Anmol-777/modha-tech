import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'
import HomePage from './pages/Home'
import Product from './pages/Product'
import Innovations from './pages/Innovations'
import OurStory from './pages/OurStory'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <WhatsApp />
    </>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Product />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/about" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  )
}
