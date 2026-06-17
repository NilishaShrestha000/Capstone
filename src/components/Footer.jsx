import { Link } from "react-router-dom";

import { GrPhone, GrMapLocation } from "react-icons/gr";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { IoIosTimer, IoMdTrendingUp, IoMdPaper } from "react-icons/io";
import { MdOutlinePrivacyTip, MdOutlineDescription } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";
import { BiBarChartAlt2 } from "react-icons/bi";

const style = {
    wrapper: "border-t border-gray-500 text-foreground bg-background px-8 pt-12 pb-6 w-full",
    secondwrapper: "grid grid-cols-1 md:grid-cols-3 gap-10 mb-10",
    header: "text-xs uppercase tracking-widest text-gray-400 mb-3",
    border: "border p-1 rounded hover:scale-[1.05] duration-300",
    links: "hover:text-blue-300 flex items-center gap-1"

}

const Footer = () => {

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.secondwrapper}>

                    {/*Home sectiom*/}
                    <div>
                        <div className="  flex gap-3 items-center">
                            <Link to="/" className="flex items-center gap-3 text-foreground font-bold">
                                <img src="/logo.png" className="w-12 h-12" /> NepalFlow
                            </Link>
                        </div>
                        <p className="text-sm lg:text-md text-gray-500 dark:text-gray-400 mt-1 ">
                            Tourism Forecasting for Nepal. Explore historical trends, forecasts, and side by side comparisons to make sense of visitor data.
                        </p>
                        <div className="flex gap-2 mt-5">
                            <a href="https://github.com/NilishaShrestha000/Capstone" target="_blank" className={style.border}><FaGithub /></a>
                            <a href="https://wa.me/9779863034097" target="_blank" className={style.border}><FaWhatsapp /></a>
                            <a href="https://www.linkedin.com/school/iimscollege/posts/?feedView=all" target="_blank" className={style.border}><FaLinkedin /></a>
                        </div>
                    </div>

                    {/*Explore and Company section*/}
                    <div className="grid grid-cols-2">

                        {/*Explore Section*/}
                        <div>
                            <div className={style.header}> Explore </div>
                            <div className="flex flex-col gap-1 ">
                                <Link to="/historical" className={style.links}><IoIosTimer /> Historical</Link>
                                <Link to="/forecast" className={style.links}><IoMdTrendingUp />Forecast</Link>
                                <Link to="/comparison" className={style.links}><BiBarChartAlt2 />Comparison</Link>
                            </div>
                        </div>

                        {/*Company Section*/}
                        <div>
                            <div className={style.header}>Company </div>
                            <div className="flex flex-col gap-1 ">
                                <Link to="/aboutus" target="_blank" className={style.links} ><MdOutlineDescription /> About Us</Link>
                                <Link to="/privacypolicy" target="_blank" className={style.links}><MdOutlinePrivacyTip />Privacy Policy</Link>
                                <Link to="/termsofuse" target="_blank" className={style.links}><IoMdPaper /> Terms of Us</Link>
                            </div>
                        </div>
                    </div>


                    {/*Contact Section*/}
                    <div>
                        <div className={style.header}> Contact </div>
                        <div className="flex flex-col gap-1 ">
                            <a href="https://maps.app.goo.gl/NQAmiiZy3m9znYr27" target="_blank" className={style.links}>< GrMapLocation />Naxal Bhagwatibahal, Kathmandu</a>
                            <a href="https://wa.me/9779863034097" target="_blank" className={style.links}><GrPhone />+977 9863034097</a>
                            <a href="https://maps.app.goo.gl/98SqcfqyT7KjcsDv7" target="_blank" className={style.links}><LuBuilding2 /> IIMS College</a>
                        </div>
                    </div>

                </div >


                < div className="border-t border-gray-400 pt-4 flex justify-between mt-4 text-gray-500 text-sm ">
                    <p>©Group 26 Capstone Project. All rights reserved.</p>
                    <p> 2026 AD</p>
                </div >
            </div >
        </>

    )
}
export default Footer;
