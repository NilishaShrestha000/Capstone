import { Link } from "react-router-dom";

import { IoIosTimer, IoMdTrendingUp } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { RiArrowRightUpLongLine } from "react-icons/ri";

const style = {
    wrapper: "min-h-screen bg-background text-foreground p-5 transotion-all",
    p: "text-ms lg:text-lg uppercase font-semibold tracking-wide mb-3 text-orange-400",
    boxwrapper: " gap-5 lg:gap-10 mt-10 mb-10 justify-center  grid grid-cols-2 lg:grid-cols-5 px-10",
    box: "bg-orange-400/15 p-5 lg:p-10 rounded-lg",
    bmain: "text-2xl lg:text-5xl text-center text-orange-400 mb-3",
    btext: "text-sm lg:text-lg text-gray-400 font-semibold",
    linkbox: "border border-gray-400/50 bg-gray-500/10 dark:bg-white/5 rounded-lg p-5 lg:p-8 hover:scale-[1.05] duration-300",
    icon: "rounded w-10 h-10 items-center justify-center flex text-2xl mb-2 bg-orange-300/15",
    title: "text-xl lg:text-2xl font-semibold",
    describe: "cdtext-md lg:text-lg text-gray-700 dark:text-gray-300 font-semibold",
    namewrapper: "gap-5 lg:gap-10 mt-10 mb-10 justify-center grid grid-cols-1 md:grid-cols-3 min-[850px]:grid-cols-4 lg:grid-cols-5  px-10",
    link: "border border-gray-500 px-2 py-1 rounded-lg bg-gray-400/50 hover:scale-[1.05] duration-300 flex gap-1 items-center"
}

const PrivacyPolicy = () => {
    return (
        <div className={style.wrapper}>

            <div className="text-center">
                <p className={style.p}>Legal</p>
                <h1 className="text-5xl lg:text-7xl">We respect your privacy</h1>
                <p className="text-md lg:text-xl text-gray-600 dark:text-gray-500 m-3">NepalFlow is built to inform, not to track. Here's a clear breakdown of what data we collect, why, and how we protect it.</p>
            </div>

            <div className="border-b border-gray-500 mt-10 mb-10" />

            <div className={style.boxwrapper}>
                <div className={style.linkbox}>
                    <p className={style.icon}>< IoIosTimer /></p>
                    <p className={style.title}>Data we collect</p>
                    <p className={style.describe}>Account and usage info</p>
                </div>
                <div className={style.linkbox}>
                    <p className={style.icon}>< IoMdTrendingUp /></p>
                    <p className={style.title}>How we use it</p>
                    <p className={style.describe}>Platform and security only</p>
                </div>
                <div className={style.linkbox}>
                    <p className={style.icon}>< BiBarChartAlt2 /></p>
                    <p className={style.title}>Third-part sharing</p>
                    <p className={style.describe}>Minimal, never sold</p>
                </div>
                <div className={style.linkbox}>
                    <p className={style.icon}>< IoMdTrendingUp /></p>
                    <p className={style.title}>Your rights</p>
                    <p className={style.describe}>Access, edit,delete</p>
                </div>
                <div className={style.linkbox}>
                    <p className={style.icon}>< BiBarChartAlt2 /></p>
                    <p className={style.title}>Contact us</p>
                    <p className={style.describe}>We respond within 30 days </p>
                </div>
            </div>

            <div className="border-b border-gray-500 mt-10 mb-10" />

            <div >
                <p className={style.p}>Legal</p>
                <h1 className="text-2xl lg:text-3xl">Data we collect</h1>
                <p className="text-md lg:text-xl text-gray-600 dark:text-gray-500 m-3">NepalFlow is built to inform, not to track. Here's a clear breakdown of what data we collect, why, and how we protect it.</p>
            </div>
        </div>
    )
}
export default PrivacyPolicy;