import profileImg from "../assets/profile/profile.webp";
import cvFile from "../assets/Benjamin-Djata-CV.pdf";
import { Link } from "react-router-dom";

import {
    FaReact,
    FaNodeJs,
    FaDocker,
} from "react-icons/fa";

import {
    SiJavascript,
    SiTailwindcss,
    SiExpress,
    SiMongodb,
    SiVercel,
    SiRender,
} from "react-icons/si";

export default function Hero() {

    return (

        <section className="relative min-h-screen flex items-center px-6 bg-white dark:bg-[#09090b] text-black dark:text-white overflow-hidden">

            <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full"></div>

            <div className="absolute bottom-[-150px] right-[-100px] w-[450px] h-[450px] bg-cyan-500/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center pb-24">

                <div>

                    <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-2 rounded-full text-sm">
                        Available For Remote Work
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] mt-6">
                        Benjamin
                        <br />
                        Djata
                    </h1>

                    <p className="text-zinc-600 dark:text-zinc-400 text-xl mt-6 max-w-xl leading-relaxed">
                        Full-Stack Developer crafting scalable products,
                        modern user experiences and impactful digital solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">

                        <a
                            href={cvFile}
                            download
                            className="border border-zinc-300 dark:border-zinc-700 hover:border-cyan-500 px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                        >
                            Download CV
                        </a>

                        <a
                            href="#projects"
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                            View Projects
                        </a>

                        <a
                            href="#contact"
                            className="border border-zinc-300 dark:border-zinc-700 hover:border-blue-500 px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                        >
                            Contact Me
                        </a>
                        
                        <Link
                            to="/support"
                            className="border border-blue-500/30 bg-blue-500/10 text-blue-500 dark:text-blue-400 hover:border-cyan-500 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                        >
                            Support My Work
                        </Link>

                    </div>

                    <div className="grid sm:grid-cols-3 gap-5 mt-16">

                        {/* FRONTEND */}

                        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300">

                            <div className="flex items-center gap-3 mb-4">
                                <FaReact className="text-cyan-400 text-xl" />
                                <SiJavascript className="text-yellow-500 text-lg" />
                                <SiTailwindcss className="text-sky-400 text-lg" />
                            </div>

                            <h3 className="text-blue-400 font-bold text-xl">
                                Frontend
                            </h3>

                            <p className="text-zinc-700 dark:text-zinc-300 mt-2 text-sm">
                                React • Tailwind • JavaScript
                            </p>

                        </div>

                        {/* BACKEND */}

                        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-5 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300">

                            <div className="flex items-center gap-3 mb-4">
                                <FaNodeJs className="text-green-500 text-xl" />
                                <SiExpress className="text-zinc-700 dark:text-zinc-300 text-lg" />
                                <SiMongodb className="text-green-400 text-lg" />
                            </div>

                            <h3 className="text-cyan-400 font-bold text-xl">
                                Backend
                            </h3>

                            <p className="text-zinc-700 dark:text-zinc-300 mt-2 text-sm">
                                Node.js • Express • MongoDB
                            </p>

                        </div>

                        {/* DEVOPS */}

                        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-5 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-400/20 hover:-translate-y-2 transition-all duration-300">

                            <div className="flex items-center gap-3 mb-4">
                                <FaDocker className="text-blue-400 text-xl" />
                                <SiVercel className="text-black dark:text-white text-lg" />
                                <SiRender className="text-purple-400 text-lg" />
                            </div>

                            <h3 className="text-blue-300 font-bold text-xl">
                                DevOps
                            </h3>

                            <p className="text-zinc-700 dark:text-zinc-300 mt-2 text-sm">
                                Docker • Vercel • Render
                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex justify-center lg:justify-end mt-16 lg:mt-0">

                    <div className="relative">

                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-110"></div>

                        <img
                            src={profileImg}
                            alt="Benjamin Nii Annang Djata"
                            className="relative w-[230px] h-[230px] sm:w-[320px] sm:h-[320px] object-cover rounded-full border-4 border-blue-500/30 shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                        />

                        <div className="absolute -bottom-12 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 px-5 sm:px-6 py-3 rounded-2xl shadow-xl w-max">

                            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                                Based In
                            </p>

                            <h3 className="font-bold text-base sm:text-lg text-center whitespace-nowrap">
                                Accra, Ghana 🇬🇭
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}