import { Link } from "react-router-dom";

const NavLinks = ({ closeMenu, isMobile }) => {
    const desktopLink = "text-foreground text-lg hover:text-orange-400 font-semibold";
    const mobileLink = "text-foreground text-lg px-6 py-5 border-b border-gray-700 hover:text-orange-400";
    const linkClass = isMobile ? mobileLink : desktopLink;

    return (
        <>
            <Link to="/historical" className={linkClass} onClick={() => closeMenu?.()}>
                <span> Historical</span>
            </Link>
            <Link to="/forecast" className={linkClass} onClick={() => closeMenu?.()}>
                <span>Forecast</span>
            </Link>
            <Link to="/comparison" className={linkClass} onClick={() => closeMenu?.()}>
                <span>Comparison</span>
            </Link>
        </>
    )
};

export default NavLinks;

