{/* Pages */ }
import Login from "../pages/Login";
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <NepalFlow /> },
            { path: "historical", element: <Historical /> },
            { path: "forecast", element: <Forecast /> },
            { path: "comaprison", element: <Comparison /> },
            { path: "login", element: (<ProtectedRoute><Login /></ProtectedRoute>) },
            { path: "adminhome", element: (<ProtectedRoute><AdminHome /></ProtectedRoute>) },
            { path: "adminupload", element: (<ProtectedRoute><AdminUpload /></ProtectedRoute>) },
            { path: "adminverify", element: (<ProtectedRoute><AdminVerify /></ProtectedRoute>) }
        ],
    }
]);
export default router;