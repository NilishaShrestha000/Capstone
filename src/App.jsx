import './App.css'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import NepalFlow from './pages/NepalFlow'
import Forecast from './pages/Forecast'
import Analytics from './pages/Analytics'
import Contacts from './pages/Contacts'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<NepalFlow />}></Route>
            <Route path="/forecast" element={<Forecast />}></Route>
            <Route path="/analytics" element={<Analytics />}></Route>
            <Route path="/contacts" element={<Contacts />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
