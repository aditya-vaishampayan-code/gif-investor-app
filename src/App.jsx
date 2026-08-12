import { Navigate, Route, Routes } from 'react-router-dom'
import { getUser } from './services/dataService'
import Login from './pages/Login'
import Grid from './pages/Grid'
import Detail from './pages/Detail'
import Rate from './pages/Rate'
import Portfolio from './pages/Portfolio'
import Admin from './pages/Admin'
import Agenda from './pages/Agenda'
import Gala from './pages/Gala'
import Tickets from './pages/Tickets'
import AncientMedicine from './pages/AncientMedicine'
import XYZ from './pages/XYZ'

function RequireUser({ children }) {
  return getUser() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireUser><Grid /></RequireUser>} />
      <Route path="/startup/:id" element={<RequireUser><Detail /></RequireUser>} />
      <Route path="/rate/:id" element={<RequireUser><Rate /></RequireUser>} />
      <Route path="/portfolio" element={<RequireUser><Portfolio /></RequireUser>} />
      <Route path="/gala" element={<RequireUser><Gala /></RequireUser>} />
      <Route path="/agenda" element={<RequireUser><Agenda /></RequireUser>} />
      <Route path="/tickets" element={<RequireUser><Tickets /></RequireUser>} />
      <Route path="/event/ancient-medicine" element={<RequireUser><AncientMedicine /></RequireUser>} />
      <Route path="/event/xyz" element={<RequireUser><XYZ /></RequireUser>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
