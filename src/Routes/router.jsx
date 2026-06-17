
{/* Pages */ }
import Login from "../pages/Login";
import Logout from "../pages/logout";
import NepalFlow from "../pages/User_Pages/NepalFlow";
import Historical from "../pages/User_Pages/Historical";
import Forecast from "../pages/User_Pages/Forecast";
import Comparison from "../pages/User_Pages/Comparison";
import AdminHome from "../pages/Admin_Pages/AdminHome";
import AdminUpload from "../pages/Admin_Pages/AdminUpload";
import AdminVerify from "../pages/Admin_Pages/AdminVerify";

{/*Route*/ }
import ProtectedRoute from "./ProtectedRoute";
{/*Component*/ }
import Layout from "../components/Layout";

import { createBrowserRouter } from "react-router-dom";

import { ThemeProvider } from "../auth/ThemeContext";
import AboutUs from "../pages/FooterCompanayPages/AboutUs";
import PrivacyPolicy from "../pages/FooterCompanayPages/PrivacyPolicy";
import TermsOfUse from "../pages/FooterCompanayPages/TermsOfUse";


const router = createBrowserRouter([
    {
        path: "/",
        element: <ThemeProvider><Layout /></ThemeProvider>,
        children: [
            { index: true, element: <NepalFlow /> },
            { path: "historical", element: <Historical /> },
            { path: "forecast", element: <Forecast /> },
            { path: "comparison", element: <Comparison /> },
            { path: "login", element: <Login /> },
            { path: "logout", element: (<ProtectedRoute><Logout /></ProtectedRoute>) },
            { path: "adminhome", element: (<ProtectedRoute><AdminHome /></ProtectedRoute>) },
            { path: "adminupload", element: (<ProtectedRoute><AdminUpload /></ProtectedRoute>) },
            { path: "adminverify", element: (<ProtectedRoute><AdminVerify /></ProtectedRoute>) },

            // Footer Routes
            { path: "aboutus", element: <AboutUs /> },
            { path: "privacypolicy", element: <PrivacyPolicy /> },
            { path: "termsofuse", element: <TermsOfUse /> }
        ],
    }
]);
export default router;