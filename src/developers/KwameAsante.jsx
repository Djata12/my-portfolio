    import kwame from "../assets/developers/kwame.webp";

    export default function KwameAsante() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white transition-colors duration-300 overflow-hidden">

        {/* BACKGROUND GLOWS */}

        <div className="absolute top-0 left-[-120px] w-[400px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full"></div>

        <div className="absolute bottom-0 right-[-120px] w-[400px] h-[400px] bg-green-500/10 blur-[100px] rounded-full"></div>

        {/* HERO */}

        <section className="relative px-6 py-20 border-b border-zinc-300 dark:border-zinc-800">

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            {/* IMAGE */}

            <div className="relative group">

                <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-[40px] opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <img
                src={kwame}
                alt="Kwame Asante"
                className="relative w-full h-[700px] object-cover rounded-[40px] border border-zinc-300 dark:border-zinc-800 group-hover:border-yellow-500/30 transition duration-500"
                />

            </div>

            {/* CONTENT */}

            <div>

                <div className="inline-block bg-green-500/10 border border-green-500/20 text-green-500 dark:text-green-400 px-5 py-3 rounded-full text-sm">
                Available For Remote Work
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mt-8 leading-tight">
                Kwame
                <br />
                Asante
                </h1>

                <p className="text-yellow-500 dark:text-yellow-400 text-2xl mt-6">
                Frontend Developer
                </p>

                <p className="text-zinc-600 dark:text-zinc-400 text-xl leading-relaxed mt-8">
                Passionate Ghanaian frontend engineer focused on building modern,
                accessible and scalable web applications using React, Tailwind
                CSS and modern JavaScript technologies.
                </p>

                {/* STACK */}

                <div className="flex flex-wrap gap-4 mt-10">

                <span className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500/40 px-5 py-3 rounded-full transition">
                    React
                </span>

                <span className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500/40 px-5 py-3 rounded-full transition">
                    Tailwind CSS
                </span>

                <span className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500/40 px-5 py-3 rounded-full transition">
                    JavaScript
                </span>

                <span className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500/40 px-5 py-3 rounded-full transition">
                    Node.js
                </span>

                </div>

                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row gap-4 mt-12">

                <a
                    href="mailto:benjamindjata@gmail.com?subject=Hiring Inquiry"
                    className="bg-yellow-500 hover:bg-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/20 text-black px-8 py-4 rounded-2xl font-bold transition-all duration-300 inline-block text-center"
                >
                    Hire Developer
                </a>

                <a
                    href="mailto:jamindjata@gmail.com?subject=Connecting With Kwame Asante&body=Hello Kwame Asante, I would like to connect with you regarding a project."
                    className="border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500/40 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-8 py-4 rounded-2xl transition-all duration-300 inline-block text-center"
                >
                    Connect
                </a>

                </div>

            </div>

            </div>

        </section>

        {/* EXPERIENCE */}

        <section className="px-6 py-20">

            <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl sm:text-5xl font-black mb-12">
                Experience
            </h2>

            <div className="space-y-8">

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-8 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">

                    <div>

                    <h3 className="text-3xl font-bold">
                        Senior Frontend Developer
                    </h3>

                    <p className="text-yellow-500 dark:text-yellow-400 mt-3">
                        Accra Digital Solutions
                    </p>

                    </div>

                    <p className="text-zinc-500">
                    2023 - Present
                    </p>

                </div>

                <p className="text-zinc-600 dark:text-zinc-400 mt-6 leading-relaxed text-lg">
                    Leading frontend architecture and building scalable React
                    applications for fintech startups across Ghana.
                </p>

                </div>

            </div>

            </div>

        </section>

        </div>
    );
    }