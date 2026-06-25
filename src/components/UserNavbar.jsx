import { Link } from 'react-router-dom'
import { useTheme } from "../auth/ThemeContext";
import NavLinks from './NavLinks';

const style = {
    wrapper: "bg-background text-foreground h-16 w-full shadow-lg px-4 flex justify-between items-center border-b border-b-gray-500",
    menuButton: "flex text-foreground hover:text-orange-400 font-semibold items-center cursor-pointer border border-gray-300 hover:border-orange-400 rounded-2xl px-4 py-5 h-10 lg:hidden",
    loginBtn: "flex text-foreground hover:text-orange-400 font-semibold items-center cursor-pointer border border-gray-300 hover:border-orange-400 rounded-2xl px-4 py-5 h-10",
}

const UserNavbar = ({ setSlide }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={style.wrapper}>
            {/* Logo */}
            <Link to="/" className="flex items-center font-bold text-lg">
                NepalFlow
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex gap-6">
                <NavLinks />
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
                <button onClick={toggleTheme} className="text-foreground hover:text-orange-400">
                    {theme === 'dark' ? "☀️" : "🌑"}
                </button>

                <Link to="/login" className={style.loginBtn}>
                    Login As Admin
                </Link>

                {/* Mobile menu toggle */}
                <button className={style.menuButton} onClick={() => setSlide(true)}>
                    Menu
                </button>
            </div>
        </div>
    )
}

export default UserNavbar;