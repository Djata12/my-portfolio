import {
    Github,
    Linkedin,
    Mail,
    ArrowUpRight,
} from "lucide-react";

export default function Footer() {

    return (

        <footer className="relative border-t border-zinc-800 bg-[#09090b] text-white overflow-hidden">

            {/* GLOW */}

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/10 blur-[90px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">

                {/* TOP SECTION */}

                <div className="grid lg:grid-cols-3 gap-16">

                    {/* BRAND */}

                    <div>

                        <h2 className="text-4xl font-medium tracking-tight">
                            Benjamin Djata
                        </h2>

                        <p className="text-zinc-400 mt-6 leading-relaxed max-w-md">
                            Building modern web applications, scalable APIs
                            and premium digital experiences for startups,
                            businesses and ambitious founders.
                        </p>

                        {/* SOCIALS */}

                        <div className="flex gap-4 mt-8">

                            <a
                                href="https://github.com/Djata12"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 flex items-center justify-center transition-all duration-300"
                            >
                                <Github size={20} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/jamin-nii-annang-djata-4b0838283/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 flex items-center justify-center transition-all duration-300"
                            >
                                <Linkedin size={20} />
                            </a>

                            <a
                                href="mailto:jamindjata@gmail.com"
                                className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 flex items-center justify-center transition-all duration-300"
                            >
                                <Mail size={20} />
                            </a>

                        </div>

                    </div>

                    {/* NAVIGATION */}

                    <div>

                        <h3 className="text-xl font-medium tracking-tight">
                            Navigation
                        </h3>

                        <div className="flex flex-col gap-4 mt-8">

                            <a
                                href="#top"
                                className="text-zinc-400 hover:text-blue-400 transition"
                            >
                                Home
                            </a>

                            <a
                                href="#projects"
                                className="text-zinc-400 hover:text-blue-400 transition"
                            >
                                Projects
                            </a>

                            <a
                                href="#about"
                                className="text-zinc-400 hover:text-blue-400 transition"
                            >
                                About
                            </a>

                            <a
                                href="#contact"
                                className="text-zinc-400 hover:text-blue-400 transition"
                            >
                                Contact
                            </a>

                        </div>

                    </div>

                    {/* CTA */}

                    <div>

                        <h3 className="text-xl font-medium tracking-tight">
                            Let’s Work Together
                        </h3>

                        <p className="text-zinc-400 mt-6 leading-relaxed">
                            Available for freelance projects, remote roles,
                            startup collaborations and full-stack development opportunities.
                        </p>

                        <a
                            href="mailto:jamindjata@gmail.com"
                            className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 transition"
                        >
                            Send Message
                            <ArrowUpRight size={18} />
                        </a>

                    </div>

                </div>

                {/* BOTTOM */}

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-800 mt-20 pt-8">

                    <p className="text-zinc-500 text-sm text-center md:text-left">
                        © 2026 Benjamin Djata. All rights reserved.
                    </p>

                    <a
                        href="#top"
                        className="bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 px-5 py-3 rounded-2xl text-sm transition-all duration-300"
                    >
                        Back To Top
                    </a>

                </div>

            </div>

        </footer>

    );
}