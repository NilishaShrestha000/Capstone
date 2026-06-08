import { Link, useLocation } from 'react-router-dom'


const Navbar = () => {
    const location = useLocation();

    const isUserPage = location.pathname === "/";
    const isAdminPage = location.pathname.startsWith("/adminhome");

    return (
        <>
            {isUserPage && !isAdminPage && (
                <nav className="fixed text-black text-2xl top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50 justify-between text-center flex">
                    <div className=' font-bold flex gap-6 p-4'>
                        <Link to="/">NepalFlow</Link>
                    </div>
                    <div className='flex gap-6 p-4'>
                        <Link to="/historical">Historical</Link>
                        <Link to="/forecast">Forecast</Link>
                        <Link to="/Comparison">Comparison</Link>
                        <div className='flex-1 flex md:justify-end text-sm items-center lg:text-base'>
                            <Link to="/login" className='hover:bg-yellow-200 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300 active:bg-amber-300 ring  text-left'> Login </Link>
                        </div>
                    </div>
                </nav>
            )}

            {isAdminPage && (
                <nav className='bg-slate-900 text-black overflow-x-auto items-center'>
                    <div className='flex p-2 px-6 items-center'>
                        <div className=' mr-8 font-bold text-sm '>
                            <Link to="/adminhome">TFlow Control Center</Link></div>

                        <div className='flex-1 flex md:justify-end text-sm items-center lg:text-base'>
                            <Link to="/" className='hover:bg-yellow-200 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300 active:bg-amber-300 ring  text-left'> Exit to Public View</Link>
                        </div>
                    </div>
                </nav>
            )}

        </>
    )
}
export default Navbar;


