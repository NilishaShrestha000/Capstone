import { useAuth } from "../auth/AuthContext"
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const storedToken = localStorage.getItem("token");
    const isAuthenticated = !!token || !!storedToken;

    return (
        isAuthenticated ? children : navigate("/")
    )
}

export default ProtectedRoute;