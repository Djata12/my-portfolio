import { Link } from "react-router-dom";

export default function Navbar() {

    return (

        <header className="w-full px-6 py-4">

            <nav className="max-w-7xl mx-auto">

                <div
                    className="
                        flex items-center justify-between
                        px-8 py-4 rounded-b-3xl
                        border-b border-zinc-300 dark:border-zinc-800
                        bg-white/80 dark:bg-[#09090b]/80
                        backdrop-blur-xl
                        shadow-2xl shadow-black/5 dark:shadow-black/20
                        transition-colors duration-300
                    "
                >

                    {/* LOGO */}

                    <a
                        href="#"
                        className="
                            text-2xl font-medium tracking-[0.18em]
                            text-black dark:text-white
                            transition-colors duration-300
                        "
                    >
                        Software Developer
                        <span className="text-blue-500">.</span>
                    </a>

                    {/* NAV LINKS */}

                    <div
                        className="
                            hidden md:flex items-center gap-10
                            text-sm
                            text-zinc-600 dark:text-zinc-400
                        "
                    >

                        <a
                            href="#about"
                            className="
                                hover:text-black dark:hover:text-white
                                transition duration-300
                                relative group
                            "
                        >
                            About

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        <a
                            href="#skills"
                            className="
                                hover:text-black dark:hover:text-white
                                transition duration-300
                                relative group
                            "
                        >
                            Skills

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        <a
                            href="#projects"
                            className="
                                hover:text-black dark:hover:text-white
                                transition duration-300
                                relative group
                            "
                        >
                            Projects

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        <a
                            href="#contact"
                            className="
                                hover:text-black dark:hover:text-white
                                transition duration-300
                                relative group
                            "
                        >
                            Contact

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        <Link
                            to="/support"
                            className="
                                bg-gradient-to-r from-blue-500 to-cyan-500
                                text-white px-5 py-3 rounded-2xl font-semibold
                                shadow-lg shadow-blue-500/20
                                hover:shadow-xl hover:shadow-blue-500/30
                                hover:scale-[1.02] active:scale-[0.98]
                                transition-all duration-300
                            "
                        >
                            Support My Work
                        </Link>

                    </div>

                </div>

            </nav>

        </header>

    );
}