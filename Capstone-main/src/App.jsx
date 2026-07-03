import "./App.css";
import Layout from "./components/Layout";
import NepalFlow from "./pages/NepalFlow"; // <-- Imported here perfectly!
import Forecast from "./pages/Forecast";
import Analytics from "./pages/Analytics";
import Contacts from "./pages/Contacts";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Swapped TourismLandingPage for NepalFlow here */}
            <Route index element={<NepalFlow />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
