import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer";
import { useState } from "react";
import NavLinks from "./NavLinks";

function Layout() {
    const [slide, setSlide] = useState(false);
    return (
        <>
            <Navbar setSlide={setSlide} />
            {slide && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setSlide(false)}
                />
            )}
            <div className={`fixed top-0 right-0 h-full w-64 bg-background text-foreground shadow-xl z-50 transform transition-transform duration-300 lg:hidden
                ${slide ? 'translate-x-0' : 'translate-x-full'}`}>
                <button
                    onClick={() => setSlide(false)}
                    className="absolute top-4 right-4 text-xl hover:text-orange-400"
                >
                    ✕
                </button>
                <div className="flex flex-col gap-4 mt-16 px-6">
                    <NavLinks />
                </div>
            </div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
export default Layout;