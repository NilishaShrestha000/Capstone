import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext';
import { useTheme } from "../auth/ThemeContext";
import NavLinks from './NavLinks';

const style = {
    wrapper: "bg-background text-foreground h-16 w-full shadow-lg px-2 flex justify-between items-center border-b border-b-gray-500",
    text: "flex text-foreground hover:text-orange-400 font-semibold items-center cursor-pointer border border-gray-300 hover:border-orange-400 rounded-2xl px-4 py-5 h-10",
    button: "flex text-foreground hover:text-orange-400 font-semibold items-center cursor-pointer border border-gray-300 hover:border-orange-400 rounded-2xl px-4 py-5 h-10 lg:hidden"
}

const Navbar = ({ setSlide }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const isUserPage = !location.pathname.startsWith("/adminhome"); // ← all non-admin pages
    const isAdminPage = location.pathname.startsWith("/adminhome");

    return (
        <>
            <div className={style.wrapper}>


                {isAdminPage ? (
                    <>
                        <Link to="/adminhome" className='flex items-center'>
                            TFlow Control Center
                        </Link>

                        <div className='hidden lg:flex gap-6'>
                            <Link to="/adminupload" className='hover:bg-yellow-200 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300 active:bg-amber-300 ring  text-left'> Upload Dataset </Link>
                            <Link to="/adminverify"> Verify Dataset</Link>
                        </div>
                        <button className={style.button} onClick={() => setSlide(true)}>Menu</button>
                    </>
                ) : (
                    <>
                        <Link to="/" className='flex items-center'>
                            NepalFlow
                        </Link>
                        <div className="hidden lg:flex gap-6">
                            <NavLinks />
                        </div>
                        <button className={style.button} onClick={() => setSlide(true)}>Menu</button>
                    </>
                )}

                <div className="flex gap-2 lg:gap-5">
                    <button onClick={toggleTheme} className="text-foreground hover:text-orange-400">
                        {theme === 'dark' ? "☀️" : "🌑"}
                    </button>

                    {!isAuthenticated ?
                        (<Link to="/login" className={style.text}>Sign In</Link>)
                        :
                        (<Link to="/logout" className={style.text}>Logout</Link>)
                    }
                </div>
            </div>
        </>
    )
}
export default Navbar;


