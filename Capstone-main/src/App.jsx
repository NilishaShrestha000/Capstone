import "./App.css";
import Layout from "./components/Layout";
import NepalFlow from "./pages/NepalFlow";
import Forecast from "./pages/Forecast";
import Analytics from "./pages/Analytics";
import Contacts from "./pages/Contacts";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- Import the guard
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<NepalFlow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/aboutus" element={<AboutUs />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
