import { Link } from "react-router-dom";

const NavLinks = ({ closeMenu, isMobile, isAdmin }) => {
    const desktopLink = "text-foreground text-lg hover:text-orange-400 font-semibold";
    const mobileLink = "text-foreground text-lg px-6 py-5 border-b border-gray-700 hover:text-orange-400";
    const linkClass = isMobile ? mobileLink : desktopLink;

    return (
        <>
            {isAdmin ? (
                <>
                    <Link to="/adminhome" className={linkClass} onClick={() => closeMenu?.()}>Home</Link>
                    <Link to="/adminupload" className={linkClass} onClick={() => closeMenu?.()}>Upload Dataset</Link>
                    <Link to="/adminverify" className={linkClass} onClick={() => closeMenu?.()}>Verify Dataset</Link>
                </>
            ) : (
                <>
                    <Link to="/historical" className={linkClass} onClick={() => closeMenu?.()}>Historical</Link>
                    <Link to="/forecast" className={linkClass} onClick={() => closeMenu?.()}>Forecast</Link>
                    <Link to="/comparison" className={linkClass} onClick={() => closeMenu?.()}>Comparison</Link>
                </>
            )}
        </>
    )
};

export default NavLinks;