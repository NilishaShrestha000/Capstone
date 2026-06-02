import { Link } from 'react-router-dom'


function Navbar() {
    return (

        <nav className="fixed text-white text-2xl top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50 justify-between text-center flex">
            <div className=' font-bold flex gap-6 p-4'>
                <Link to="/">NepalFlow</Link>
            </div>
            <div className='flex gap-6 p-4'>
                <Link to="/forecast">Forecast</Link>
                <Link to="/analytics">Analysis</Link>
                <Link to="/contacts">Contact</Link>
                <Link to="/aboutus">About Nepal</Link>
            </div>
        </nav>


    )
}
export default Navbar;