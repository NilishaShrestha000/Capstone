import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();

        if (email && password) {
            navigate('/adminhome')
        } else {
            alert("Please enter credentials");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background */}
            <div className='absolute inset-0 bg-[url(/mountain.jpg)] bg-cover bg-center z-0'></div>
            <div className='absolute inset-0 bg-black/30 backdrop-blur-xs z-10'></div>
            {/*login*/}
            <div className=" z-20 max-w-md w-full bg-white rounded-3xl overflow-hidden border border-slate-300">
                {/* Top Section  */}
                <div className="bg-slate-900 p-7 text-center">
                    <div className="inline-block bg-red-800 p-3 rounded-xl mb-4">
                        <span className="text-white font-black text-2xl">FLOW</span>
                    </div>
                    <h2 className="text-white text-2xl font-black">Tourism Analytics</h2>
                    <p className="text-slate-400 text-sm">Predictive Flow Modeling System</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleLogin} className="p-10 space-y-5">
                    {/*email*/}
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="admin@tourism.gov.np"
                            className="w-full p-3 bg-slate-200 border border-slate-400 rounded-xl outline-none focus:ring-2 focus:ring-red-800 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>
                    {/*password*/}
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            required
                            placeholder="*******"
                            className="w-full p-3 bg-slate-200 border border-slate-400 rounded-xl outline-none focus:ring-2 focus:ring-red-800 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-800 hover:bg-red-600 text-white font-black py-4 rounded-xl transition-all cursor-pointer mt-4"
                    >Login to Dashboard</button>

                    <div className="text-center mt-4">
                        <a href="mailto:tflowsupportteam@gmail.com" className="text-xs text-slate-400 hover:text-red-700 transition-colors">
                            Forgot your credentials? Contact System Admin
                        </a> <br />
                        <Link to="/" className='text-red-500 text-md'>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;



