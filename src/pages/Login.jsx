import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }
        // Auth logic goes here later
        navigate("/adminhome");
    };

    const inputClass = "w-full bg-transparent border border-gray-400 rounded-lg px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors";
    const labelClass = "block text-sm font-semibold text-gray-400 mb-1";

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-foreground">NepalFlow</h1>
                    <p className="text-gray-400 mt-2 text-sm">Admin access only</p>
                </div>

                {/* Card */}
                <div className="border border-gray-700 rounded-2xl p-8 bg-background shadow-lg">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Sign in</h2>

                    {error && (
                        <div className="mb-4 text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-5">
                        <div>
                            <label className={labelClass}>Email</label>
                            <input
                                type="email"
                                placeholder="admin@nepalflow.com"
                                className={inputClass}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={inputClass}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;