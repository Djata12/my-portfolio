import esi from "../assets/developers/esi.jpg";

    export default function EsiHammond() {
    return (
        <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">

        {/* BACKGROUND GLOWS */}

        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[120px] rounded-full"></div>

        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full"></div>

        {/* HERO SECTION */}

        <section className="relative px-6 py-20 border-b border-zinc-800 z-10">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE */}

            <div className="relative">

                <div className="absolute -inset-4 bg-yellow-500/10 blur-3xl rounded-[40px]"></div>

                <img
                src={esi}
                alt="esi hammond"
                className="relative w-full h-[720px] object-cover rounded-[40px] border border-zinc-800"
                />

            </div>

            {/* INFO */}

            <div className="relative z-10">

                {/* STATUS */}

                <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-3 rounded-full text-sm">

                <div className="w-2 h-2 rounded-full bg-green-400"></div>

                Open To Startup Collaborations

                </div>

                {/* NAME */}

                <h1 className="text-6xl lg:text-8xl font-black mt-8 leading-none">

                Esi 
                <br />
                Hammond

                </h1>

                {/* ROLE */}

                <p className="text-yellow-400 text-2xl mt-6 font-semibold">
                Product Designer
                </p>

                {/* LOCATION */}

                <div className="flex items-center gap-3 mt-6 text-zinc-400">

                <span>📍 Cape Coast, Ghana</span>

                <span>•</span>

                <span>4 Years Experience</span>

                </div>

                {/* BIO */}

                <p className="text-zinc-400 text-xl leading-relaxed mt-10 max-w-2xl">

                    Passionate product designer focused on building visually
                    engaging, accessible and user-centered digital experiences
                    for startups and brands across Africa.
                </p>

                {/* STATS */}

                <div className="grid grid-cols-3 gap-6 mt-12">

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6">

                    <h2 className="text-3xl font-black">
                    22+
                    </h2>

                    <p className="text-zinc-500 mt-2 text-sm">
                    Projects Completed
                    </p>

                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6">

                    <h2 className="text-3xl font-black">
                    4.5
                    </h2>

                    <p className="text-zinc-500 mt-2 text-sm">
                    Client Rating
                    </p>

                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6">

                    <h2 className="text-3xl font-black">
                    10K
                    </h2>

                    <p className="text-zinc-500 mt-2 text-sm">
                    Community Reach
                    </p>

                </div>

                </div>

                {/* STACK */}

                <div className="flex flex-wrap gap-4 mt-12">

                <span className="bg-zinc-800/80 border border-zinc-700 px-5 py-3 rounded-full hover:border-yellow-500/40 transition">
                    UI Design
                </span>

                <span className="bg-zinc-800/80 border border-zinc-700 px-5 py-3 rounded-full hover:border-yellow-500/40 transition">
                    Branding
                </span>

                <span className="bg-zinc-800/80 border border-zinc-700 px-5 py-3 rounded-full hover:border-yellow-500/40 transition">
                    Research
                </span>

                <span className="bg-zinc-800/80 border border-zinc-700 px-5 py-3 rounded-full hover:border-yellow-500/40 transition">
                    Figma
                </span>

                <span className="bg-zinc-800/80 border border-zinc-700 px-5 py-3 rounded-full hover:border-yellow-500/40 transition">
                    Typography
                </span>

                <span className="bg-zinc-800/80 border border-zinc-700 px-5 py-3 rounded-full hover:border-yellow-500/40 transition">
                    Product Strategy
                </span>

                </div>

                {/* BUTTONS */}

                <div className="flex flex-wrap gap-4 mt-14">

                <a
                    href="mailto:jamindjata@gmail.com?subject=Esi Hammond"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-5 rounded-2xl font-bold transition inline-block"
                >
                    Hire Developer
                </a>

                <a
                    href="mailto:jamindjata@gmail.com?subject=Connecting With Esi Hammond&body=Hello Esi Hammond, I would like to connect with you regarding a project."
                    className="border border-zinc-700 hover:border-yellow-500/40 bg-zinc-900 hover:bg-zinc-800 px-8 py-4 rounded-2xl transition inline-block text-center"
                    >
                        Connect
                </a>

                </div>

            </div>

            </div>

        </section>

        {/* EXPERIENCE SECTION */}

        <section className="relative px-6 py-24 z-10">

            <div className="max-w-7xl mx-auto">

            <div className="flex items-center justify-between mb-14">

                <div>

                <p className="text-yellow-400 font-semibold mb-3">
                    Career Journey
                </p>

                <h2 className="text-5xl font-black">
                    Experience
                </h2>

                </div>

            </div>

            <div className="space-y-8">

                {/* EXPERIENCE CARD */}

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-[32px] p-10 hover:border-yellow-500/20 transition">

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">

                    <div>

                    <h3 className="text-3xl font-black">
                        Senior Product Designer 
                    </h3>

                    <p className="text-yellow-400 mt-4 text-lg">
                        Cape Coast Digital Solutions
                    </p>

                    </div>

                    <div className="bg-zinc-800 px-5 py-3 rounded-full text-zinc-400 text-sm">
                    2023 — Present
                    </div>

                </div>

                <p className="text-zinc-400 mt-8 leading-relaxed text-lg max-w-4xl">

                    Collaborated with startups and creative teams to design
                    modern interfaces, branding systems and scalable
                    product experiences.
                </p>

                </div>

                {/* EXPERIENCE CARD */}

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-[32px] p-10 hover:border-yellow-500/20 transition">

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">

                    <div>

                    <h3 className="text-3xl font-black">
                        UI Designer
                    </h3>

                    <p className="text-yellow-400 mt-4 text-lg">
                        Accra Cloud Agency
                    </p>

                    </div>

                    <div className="bg-zinc-800 px-5 py-3 rounded-full text-zinc-400 text-sm">
                    2020 — 2022
                    </div>

                </div>

                <p className="text-zinc-400 mt-8 leading-relaxed text-lg max-w-4xl">

                    Passionate product designer focused on building visually
                    engaging, accessible and user-centered digital experiences
                    for startups and brands across Africa.
                </p>

                </div>

            </div>

            </div>

        </section>

        </div>
    );
    }