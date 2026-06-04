// import { Link, useLocation } from 'react-router-dom'


// const Navbar = () => {
//     const location = useLocation();

//     const isUserPage = location.pathname === "/";
//     const isAdminPage = location.pathname.startsWith("/admin");

//     return (
//         <>
//             {isUserPage && !isAdminPage && (
//                 <nav className="fixed text-white text-2xl top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50 justify-between text-center flex">
//                     <div className=' font-bold flex gap-6 p-4'>
//                         <Link to="/">NepalFlow</Link>
//                     </div>
//                     <div className='flex gap-6 p-4'>
//                         <Link to="/forecast">Forecast</Link>
//                         <Link to="/analytics">Analysis</Link>
//                         <Link to="/contacts">Contact</Link>
//                         <Link to="/aboutus">About Nepal</Link>
//                         <div className='flex-1 flex md:justify-end text-sm items-center lg:text-base'>
//                             <Link to="/login" className='hover:bg-yellow-200 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300 active:bg-amber-300 ring  text-left'> Login </Link>
//                         </div>
//                     </div>
//                 </nav>
//             )}

//             {isAdminPage && (
//                 <nav className='bg-slate-900 text-white overflow-x-auto itens-center'>
//                     <div className='flex p-2 px-6 items-center'>
//                         <div className=' mr-8 font-bold text-sm '>
//                             <Link to="/">TFlow Control Center</Link></div>

//                         <div className='flex-1 flex md:justify-end text-sm items-center lg:text-base'>
//                             <Link to="/" className='hover:bg-yellow-200 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300 active:bg-amber-300 ring  text-left'> Exit to Public View</Link>
//                         </div>
//                     </div>
//                 </nav>
//             )}

//         </>
//     )
// }
// export default Navbar;


import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");

    const navLink = (path, label) => (
        <Link
            to={path}
            className={`hover:text-yellow-300 transition-colors ${location.pathname === path ? 'text-yellow-400 font-semibold underline underline-offset-4' : ''
                }`}
        >
            {label}
        </Link>
    );

    return (
        <>
            {!isAdminPage && (
                <nav className="fixed text-white text-2xl top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50 justify-between text-center flex">
                    <div className='font-bold flex gap-6 p-4'>
                        <Link to="/">NepalFlow</Link>
                    </div>
                    <div className='flex gap-6 p-4 items-center'>
                        {navLink("/forecast", "Forecast")}
                        {navLink("/analytics", "Analysis")}
                        {navLink("/contacts", "Contact")}
                        {navLink("/aboutus", "About Nepal")}
                        <div className='flex-1 flex md:justify-end text-sm items-center lg:text-base'>
                            <Link
                                to="/login"
                                className='hover:bg-yellow-200 hover:text-black transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300 active:bg-amber-300 ring px-3 py-1 text-left'
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </nav>
            )}

            {isAdminPage && (
                <nav className='bg-slate-900 text-white overflow-x-auto items-center'>
                    <div className='flex p-2 px-6 items-center'>
                        <div className='mr-8 font-bold text-sm'>
                            <Link to="/admin">TFlow Control Center</Link>
                        </div>
                        <div className='flex-1 flex md:justify-end text-sm items-center lg:text-base'>
                            <Link
                                to="/"
                                className='hover:bg-yellow-200 hover:text-black transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300 active:bg-amber-300 ring px-3 py-1 text-left'
                            >
                                Exit to Public View
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Navbar;