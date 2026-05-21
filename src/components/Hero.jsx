import profileImg from "../assets/profile/profile.jpeg";
import cvFile from "../assets/Benjamin-Djata-CV.pdf";

export default function Hero() {
    return (
        <section
        id="home"
        className="relative min-h-screen flex items-center px-6 bg-[#09090b] text-white overflow-hidden"
        >

            {/* BACKGROUND GLOWS */}

            <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full"></div>

            <div className="absolute bottom-[-150px] right-[-100px] w-[450px] h-[450px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[180px] rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center pb-24">

                {/* LEFT SIDE */}

                <div>

                    {/* BADGE */}

                    <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-2 rounded-full text-sm">
                        Available For Remote Work
                    </div>

                    {/* TITLE */}

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] mt-6">
                        Benjamin
                        <br />
                        Djata
                    </h1>

                    {/* DESCRIPTION */}

                    <p className="text-zinc-400 text-xl mt-6 max-w-xl leading-relaxed">
                        Full-Stack Software Developer building scalable web applications,
                        APIs, dashboards and modern digital experiences using React,
                        Node.js, Python and MongoDB.
                    </p>

                    {/* BUTTONS */}

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">

                        {/* VIEW PROJECTS */}

                        <a
                            href="#projects"
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center"
                        >
                            View Projects
                        </a>

                        {/* CONTACT */}

                        <a
                            href="#contact"
                            className="border border-zinc-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 px-8 py-4 rounded-2xl transition-all duration-300 text-center"
                        >
                            Contact Me
                        </a>

                        {/* DOWNLOAD CV */}

                        <a
                            href={cvFile}
                            download
                            className="bg-zinc-900 border border-zinc-800 hover:border-cyan-500 px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 text-center"
                        >
                            Download CV
                        </a>

                    </div>

                    {/* TECH STACK */}

                    <div className="grid sm:grid-cols-3 gap-5 mt-16">

                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">

                            <h3 className="text-blue-400 font-bold text-xl">
                                Frontend
                            </h3>

                            <p className="text-zinc-300 mt-2 text-sm leading-relaxed">
                                React • Tailwind • JavaScript
                            </p>

                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">

                            <h3 className="text-cyan-400 font-bold text-xl">
                                Backend
                            </h3>

                            <p className="text-zinc-300 mt-2 text-sm leading-relaxed">
                                Node.js • Express • MongoDB
                            </p>

                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-400/10 transition-all duration-300">

                            <h3 className="text-blue-300 font-bold text-xl">
                                DevOps
                            </h3>

                            <p className="text-zinc-300 mt-2 text-sm leading-relaxed">
                                Docker • Vercel • Render
                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="flex justify-center lg:justify-end">

                    <div className="relative">

                        {/* GLOW EFFECT */}

                        <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full scale-110"></div>

                        {/* IMAGE */}

                        <img
                            src={profileImg}
                            alt="Benjamin Nii Annang Djata"
                            className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] object-cover rounded-full border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:scale-105 hover:rotate-1 transition duration-500"
                        />

                        {/* FLOATING BADGE */}

                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl shadow-xl">

                            <p className="text-sm text-zinc-400">
                                Based In
                            </p>

                            <h3 className="font-bold text-lg">
                                Accra, Ghana 🇬🇭
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}