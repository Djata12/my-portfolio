export default function Navbar() {
    return (
        <header className="w-full px-6 py-4">

            <nav className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between px-8 py-4 rounded-b-3xl border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-xl shadow-2xl shadow-black/20">

                    {/* LOGO */}

                    <a
                        href="#"
                        className="text-2xl font-medium tracking-[0.18em] text-white"
                    >
                        Software Developer
                        <span className="text-blue-500">.</span>
                    </a>

                    {/* NAV LINKS */}

                    <div className="hidden md:flex items-center gap-10 text-sm text-zinc-400">

                        <a
                            href="#about"
                            className="hover:text-white transition duration-300 relative group"
                        >
                            About

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        <a
                            href="#skills"
                            className="hover:text-white transition duration-300 relative group"
                        >
                            Skills

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        <a
                            href="#projects"
                            className="hover:text-white transition duration-300 relative group"
                        >
                            Projects

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        <a
                            href="#contact"
                            className="hover:text-white transition duration-300 relative group"
                        >
                            Contact

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                    </div>

                </div>

            </nav>

        </header>
    );
}