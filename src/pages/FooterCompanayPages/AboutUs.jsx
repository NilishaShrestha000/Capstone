import { Link } from "react-router-dom";

import { IoIosTimer, IoMdTrendingUp } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { RiArrowRightUpLongLine } from "react-icons/ri";


const style = {
    wrapper: "min-h-screen bg-background text-foreground p-5 transotion-all",
    p: "text-ms lg:text-lg uppercase font-semibold tracking-wide mb-3",
    boxwrapper: " gap-5 lg:gap-10 mt-10 mb-10 justify-center",
    box: "bg-orange-400/15 p-5 lg:p-10 rounded-lg",
    bmain: "text-2xl lg:text-5xl text-center text-orange-400 mb-3",
    btext: "text-sm lg:text-lg text-gray-400 font-semibold",
    linkbox: "border border-gray-400/50 bg-gray-500/10 dark:bg-white/5 rounded-lg p-5 lg:p-8 hover:scale-[1.05] duration-300",
    icon: "rounded w-10 h-10 items-center justify-center flex text-2xl mb-2 ",
    title: "text-xl lg:text-2xl font-semibold",
    describe: "cdtext-md lg:text-lg text-gray-700 dark:text-gray-300 font-semibold",
    namewrapper: "gap-5 lg:gap-10 mt-10 mb-10 justify-center grid grid-cols-1 md:grid-cols-3 min-[850px]:grid-cols-4 lg:grid-cols-5  px-10",
    link:"border border-gray-500 px-2 py-1 rounded-lg bg-gray-400/50 hover:scale-[1.05] duration-300 flex gap-1 items-center"
}

const techstack = [
    { icon: <BiBarChartAlt2 />, tech: "React" },
    { icon: <BiBarChartAlt2 />, tech: "Vite" },
    { icon: <BiBarChartAlt2 />, tech: "React-Router" },
    { icon: <BiBarChartAlt2 />, tech: "Tailwind" },
    { icon: <BiBarChartAlt2 />, tech: "Chart.js" },
    { icon: <BiBarChartAlt2 />, tech: "SARIMA Model" },
    { icon: <BiBarChartAlt2 />, tech: "PostgreSQL" },
    { icon: <BiBarChartAlt2 />, tech: "REST API" },
    { icon: <BiBarChartAlt2 />, tech: "React" },
    { icon: <BiBarChartAlt2 />, tech: "React" },
    { icon: <BiBarChartAlt2 />, tech: "React" }
]

const AboutUs = () => {
    return (
        <>
            <div className={style.wrapper}>
                <div className="text-center">
                    <p className={`${style.p} text-orange-400`}>About Nepalflow</p>
                    <h1 className="text-5xl lg:text-7xl">Tourism Flow, built for Nepal</h1>
                    <p className="text-md lg:text-xl text-gray-600 dark:text-gray-500 m-3">NepalFlow turns raw visitor data into clear insights - helping researchers, planners, and students understand where Nepal's tourism has been and where it's heading.</p>
                </div>

                <div className={`${style.boxwrapper} flex flex-row `}>
                    <div className={style.box}>
                        <p className={style.bmain}>sdfr</p>
                        <p className={style.btext}>Years of Data</p>
                    </div>
                    <div className={style.box}>
                        <p className={style.bmain}>sdfr</p>
                        <p className={style.btext}>Core Modules</p>
                    </div>
                    <div className={style.box}>
                        <p className={style.bmain}>sdfr</p>
                        <p className={style.btext}>Forecast Model</p>
                    </div>
                </div>

                <div className="border-b border-gray-500 mt-10 mb-10" />

                <div>
                    <p className={`${style.p} text-gray-400`}>how it works</p>
                    <h className="text-xl lg:text-3xl">Three ways to explore visitor data</h>
                </div>

                <div className={`${style.boxwrapper} grid grid-cols-1 lg:grid-cols-3 px-10`}>
                    <Link to="/historical" className={style.linkbox}>
                        <p className={`${style.icon} bg-orange-300/50`}>< IoIosTimer /></p>
                        <p className={style.title}>Historical</p>
                        <p className={style.describe}>Browse year-by-year tourist arrival records. Filter by country of origin, season, or entry point.</p>
                    </Link>
                    <Link to="/forecast" className={style.linkbox}>
                        <p className={`${style.icon} bg-green-300/50`}>< IoMdTrendingUp /></p>
                        <p className={style.title}>Forecast</p>
                        <p className={style.describe}>Predictions for future arrivals based on historical patterns and seasonal trends.</p>
                    </Link>
                    <Link to='/comparison' className={style.linkbox}>
                        <p className={`${style.icon} bg-violet-300/50`}>< BiBarChartAlt2 /></p>
                        <p className={style.title}>Comparison</p>
                        <p className={style.describe}>Overlay historical actuals against forecasted values to measure model accuracy and spot divergence.u</p>
                    </Link>
                </div>

                <div>
                    <p className={`${style.p} text-gray-400`}>Tech Stack</p>
                    <h className="text-xl lg:text-3xl">Built with modern tools</h>
                </div>

                <div className="flex flex-wrap gap-4 m-5 mb-10">
                    {techstack.map(tech => (
                        <div key={tech} className="flex border border-orange-200 px-2 py-1 items-center gap-2 rounded bg-orange-300/5 w-38">
                            <p>{tech.icon}</p>
                            <p>{tech.tech}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <p className={`${style.p} text-gray-400`}>Team</p>
                    <h className="text-xl lg:text-3xl">Made by Group 26</h>
                </div>

                <div className={style.namewrapper}>
                    <div className={`${style.linkbox}  flex flex-col items-center`}>
                        <p className={`${style.icon} bg-violet-300/50 rounded-full h-15 w-15`}>NS</p>
                        <p className={style.title}>Nilisha Shrestha</p>
                        <p className={style.describe}>Frontend & UI/UX</p>
                    </div>
                    <div className={`${style.linkbox}  flex flex-col items-center`}>
                        <p className={`${style.icon} bg-green-300/50 rounded-full h-15 w-15`}>SDL</p>
                        <p className={style.title}>Shristi Dolma Lama</p>
                        <p className={style.describe}>Backend</p>
                    </div>
                    <div className={`${style.linkbox}  flex flex-col items-center`}>
                        <p className={`${style.icon} bg-orange-300/50 rounded-full h-15 w-15`}>PG</p>
                        <p className={style.title}>Pasang Ghale</p>
                        <p className={style.describe}>Database</p>
                    </div>
                    <div className={`${style.linkbox}  flex flex-col items-center`}>
                        <p className={`${style.icon} bg-pink-300/50 rounded-full h-15 w-15`}>KG</p>
                        <p className={style.title}>Kamana Gurung</p>
                        <p className={style.describe}>Forecasting</p>
                    </div>
                    <div className={`${style.linkbox}  flex flex-col items-center`}>
                        <p className={`${style.icon} bg-blue-300/50 rounded-full h-15 w-15`}>BY</p>
                        <p className={style.title}>Barsha Yadhav</p>
                        <p className={style.describe}>Frontend & QA</p>
                    </div>
                </div>

                <div className=" px-10 lg:px-50">
                    <div className="rounded-lg p-10 bg-orange-100/50 justify-center items-center  flex flex-wrap gap-10">
                        <p className="text-2xl">Ready to explore Nepal's tourism Data?</p>
                        <div className="flex flex-wrap gap-4 m-2">
                            <Link to="/historical" className={style.link} > Historical <RiArrowRightUpLongLine /></Link>
                            <Link to="/forecast" className={style.link}>Forecast<RiArrowRightUpLongLine /></Link>
                            <Link to="/comparison" className={style.link}>Comparision<RiArrowRightUpLongLine /></Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default AboutUs;