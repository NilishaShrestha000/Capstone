import { Link } from 'react-router-dom'
import { useTheme } from "../auth/ThemeContext";

const style = {
    wrapper: "bg-background text-foreground h-16 w-full shadow-lg px-4 flex justify-between items-center border-b border-b-gray-500",
    menuButton: "flex text-foreground hover:text-orange-400 font-semibold items-center cursor-pointer border border-gray-300 hover:border-orange-400 rounded-2xl px-4 py-5 h-10 lg:hidden",
    logoutBtn: "flex text-foreground hover:text-orange-400 font-semibold items-center cursor-pointer border border-gray-300 hover:border-orange-400 rounded-2xl px-4 py-5 h-10",
    navLink: "text-foreground hover:text-orange-400 font-medium transition-colors",
}

const AdminNavbar = ({ setSlide }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={style.wrapper}>
            {/* Logo */}
            <Link to="/adminhome" className="flex items-center font-bold text-lg">
                NepalFlow Control Center
            </Link>

            {/* Desktop admin nav links */}
            <div className="hidden lg:flex gap-6">
                <Link to="/adminupload" className={style.navLink}>
                    Upload Dataset
                </Link>
                <Link to="/adminverify" className={style.navLink}>
                    Verify Dataset
                </Link>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
               

                <Link to="/logout" className={style.logoutBtn}>
                    Logout
                </Link>

                {/* Mobile menu toggle */}
                <button className={style.menuButton} onClick={() => setSlide(true)}>
                    Menu
                </button>
            </div>
        </div>
    )
}

export default AdminNavbar;