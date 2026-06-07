import naa from "../assets/developers/naa.webp";

export default function NaaDedeiLamptey() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white overflow-hidden relative transition-colors duration-300">

            {/* BACKGROUND GLOWS */}

            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            {/* HERO */}

            <section className="relative px-6 py-20 border-b border-zinc-300 dark:border-zinc-800 z-10">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                    {/* IMAGE */}

                    <div className="relative">

                        <div className="absolute -inset-4 bg-yellow-500/10 blur-3xl rounded-[40px]"></div>

                        <img
                            src={naa}
                            alt="Naa Dedei Lamptey"
                            className="relative w-full h-[500px] sm:h-[650px] lg:h-[720px] object-cover rounded-[40px] border border-zinc-300 dark:border-zinc-800"
                        />

                    </div>

                    {/* CONTENT */}

                    <div className="relative z-10">

                        <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-500 dark:text-green-400 px-5 py-3 rounded-full text-sm">

                            <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></div>

                            Available For Fintech Projects

                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mt-8 leading-none break-words">

                            Naa
                            <br />
                            Dedei Lamptey

                        </h1>

                        <p className="text-yellow-500 dark:text-yellow-400 text-2xl mt-6 font-semibold">
                            Backend Engineer
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-6 text-zinc-600 dark:text-zinc-400">

                            <span>📍 Accra, Ghana</span>

                            <span className="hidden sm:block">•</span>

                            <span>6 Years Experience</span>

                        </div>

                        <p className="text-zinc-700 dark:text-zinc-400 text-lg sm:text-xl leading-relaxed mt-10 max-w-2xl">

                            Experienced backend engineer specializing in scalable APIs,
                            authentication systems and cloud infrastructure. Passionate
                            about building secure fintech and enterprise solutions for
                            modern African startups using Node.js, Express, MongoDB and
                            cloud technologies.

                        </p>

                        {/* STATS */}

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">

                            <div className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/20 transition">

                                <h2 className="text-3xl font-black">
                                    32+
                                </h2>

                                <p className="text-zinc-500 mt-2 text-sm">
                                    Projects Completed
                                </p>

                            </div>

                            <div className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/20 transition">

                                <h2 className="text-3xl font-black">
                                    4.9
                                </h2>

                                <p className="text-zinc-500 mt-2 text-sm">
                                    Client Rating
                                </p>

                            </div>

                            <div className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/20 transition">

                                <h2 className="text-3xl font-black">
                                    12K
                                </h2>

                                <p className="text-zinc-500 mt-2 text-sm">
                                    Community Reach
                                </p>

                            </div>

                        </div>

                        {/* TECH STACK */}

                        <div className="flex flex-wrap gap-4 mt-12">

                            {[
                                "Node.js",
                                "Express",
                                "MongoDB",
                                "JWT",
                                "Docker",
                                "PostgreSQL",
                            ].map((tech) => (

                                <span
                                    key={tech}
                                    className="bg-zinc-200 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 px-5 py-3 rounded-full hover:border-yellow-500/40 transition"
                                >
                                    {tech}
                                </span>

                            ))}

                        </div>

                        {/* BUTTONS */}

                        <div className="flex flex-col sm:flex-row gap-4 mt-14">

                            <a
                                href="mailto:jamindjata@gmail.com?subject=Hiring Naa Dedei Lamptey"
                                className="bg-yellow-500 hover:bg-yellow-600 hover:shadow-xl hover:shadow-yellow-500/20 text-black px-10 py-5 rounded-2xl font-bold transition text-center"
                            >
                                Hire Developer
                            </a>

                            <a
                                href="mailto:jamindjata@gmail.com?subject=Connecting With Naa Dedei Lamptey&body=Hello Naa Dedei Lamptey, I would like to connect with you regarding a project."
                                className="border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500/40 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 px-10 py-5 rounded-2xl transition text-center"
                            >
                                Connect
                            </a>

                        </div>

                    </div>

                </div>

            </section>

            {/* EXPERIENCE */}

            <section className="relative px-6 py-24 z-10">

                <div className="max-w-7xl mx-auto">

                    <div className="flex items-center justify-between mb-14">

                        <div>

                            <p className="text-yellow-500 dark:text-yellow-400 font-semibold mb-3">
                                Career Journey
                            </p>

                            <h2 className="text-5xl font-black">
                                Experience
                            </h2>

                        </div>

                    </div>

                    <div className="space-y-8">

                        {/* EXPERIENCE 1 */}

                        <div className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-8 sm:p-10 hover:border-yellow-500/20 transition">

                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">

                                <div>

                                    <h3 className="text-2xl sm:text-3xl font-black">
                                        Senior Backend Engineer
                                    </h3>

                                    <p className="text-yellow-500 dark:text-yellow-400 mt-4 text-lg">
                                        Gold Coast Technologies
                                    </p>

                                </div>

                                <div className="bg-zinc-200 dark:bg-zinc-800 px-5 py-3 rounded-full text-zinc-600 dark:text-zinc-400 text-sm whitespace-nowrap">
                                    2023 — Present
                                </div>

                            </div>

                            <p className="text-zinc-700 dark:text-zinc-400 mt-8 leading-relaxed text-lg max-w-4xl">

                                Designed and maintained scalable REST APIs, payment integrations
                                and authentication systems for fintech startups serving thousands
                                of users across Ghana and West Africa.

                            </p>

                        </div>

                        {/* EXPERIENCE 2 */}

                        <div className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-8 sm:p-10 hover:border-yellow-500/20 transition">

                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">

                                <div>

                                    <h3 className="text-2xl sm:text-3xl font-black">
                                        API Infrastructure Engineer
                                    </h3>

                                    <p className="text-yellow-500 dark:text-yellow-400 mt-4 text-lg">
                                        Accra Fintech Labs
                                    </p>

                                </div>

                                <div className="bg-zinc-200 dark:bg-zinc-800 px-5 py-3 rounded-full text-zinc-600 dark:text-zinc-400 text-sm whitespace-nowrap">
                                    2020 — 2023
                                </div>

                            </div>

                            <p className="text-zinc-700 dark:text-zinc-400 mt-8 leading-relaxed text-lg max-w-4xl">

                                Built secure backend systems, cloud deployment pipelines and
                                authentication services powering mobile banking and payment
                                applications across Ghana.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}