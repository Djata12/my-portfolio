import kwame from "../assets/developers/kwame.webp";
import naa from "../assets/developers/naa.webp";
import richard from "../assets/developers/richard.webp";
import enyonam from "../assets/developers/enyonam.webp";
import daniel from "../assets/developers/daniel.webp";
import esi from "../assets/developers/esi.webp";

import { Link } from "react-router-dom";
import { useState } from "react";

const developers = [
    {
        name: "Kwame Asante",
        role: "Frontend Developer",
        location: "Accra, Ghana",
        experience: "5 Years Experience",
        specialty: "Modern React Applications",
        availability: "Available For Remote Work",
        stack: ["React", "Tailwind", "JavaScript", "Next.js"],
        image: kwame,
        profile: "/developers/kwame-asante",
    },

    {
        name: "Naa Dedei Lamptey",
        role: "Backend Engineer",
        location: "Accra, Ghana",
        experience: "6 Years Experience",
        specialty: "Scalable API Architecture",
        availability: "Open To Fintech Projects",
        stack: ["Node.js", "MongoDB", "Express", "JWT"],
        image: naa,
        profile: "/developers/naa-dedei-lamptey",
    },

    {
        name: "Richard Owusu",
        role: "UI/UX Designer",
        location: "Takoradi, Ghana",
        experience: "4 Years Experience",
        specialty: "Design Systems & UX",
        availability: "Available For Contracts",
        stack: ["Figma", "UX Research", "Wireframing", "Prototyping"],
        image: richard,
        profile: "/developers/richard-owusu",
    },

    {
        name: "Enyonam Agbeko",
        role: "Mobile Developer",
        location: "Tema, Ghana",
        experience: "5 Years Experience",
        specialty: "Cross Platform Apps",
        availability: "Available For Mobile Projects",
        stack: ["React Native", "Firebase", "Expo", "Redux"],
        image: enyonam,
        profile: "/developers/enyonam-agbeko",
    },

    {
        name: "Daniel Nortey",
        role: "DevOps Engineer",
        location: "Accra, Ghana",
        experience: "7 Years Experience",
        specialty: "Cloud Infrastructure",
        availability: "Available For Consulting",
        stack: ["Docker", "AWS", "Kubernetes", "CI/CD"],
        image: daniel,
        profile: "/developers/daniel-nortey",
    },

    {
        name: "Esi Hammond",
        role: "Product Designer",
        location: "Cape Coast, Ghana",
        experience: "5 Years Experience",
        specialty: "Product & Brand Design",
        availability: "Open To Startup Collaborations",
        stack: ["UI Design", "Research", "Branding", "Figma"],
        image: esi,
        profile: "/developers/esi-hammond",
    },
];

export default function GhanaTechHub() {

    const [search, setSearch] = useState("");

    const filteredDevelopers = developers.filter(
        (dev) =>
            dev.name.toLowerCase().includes(search.toLowerCase()) ||
            dev.role.toLowerCase().includes(search.toLowerCase()) ||
            dev.location.toLowerCase().includes(search.toLowerCase()) ||
            dev.stack.join(" ").toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">

            {/* HERO */}

            <section className="relative px-6 pt-24 pb-20 border-b border-zinc-800 overflow-hidden">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[120px] rounded-full"></div>

                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto relative z-10">

                    <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-5 py-3 rounded-full text-sm backdrop-blur-xl">
                        🇬🇭 Ghana's Fastest Growing Developer Community
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-8xl font-medium tracking-tight leading-none mt-8 break-words">
                        Connecting
                        <br />
                        Ghanaian
                        <br />
                        Developers
                    </h1>

                    <p className="text-zinc-400 text-lg sm:text-xl mt-8 max-w-3xl leading-relaxed">
                        Ghana Tech Hub is a modern African developer community helping
                        engineers, designers and founders collaborate, network and build
                        impactful products across Ghana and beyond.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-10">

                        <span className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-full text-zinc-300">
                            🇬🇭 Accra
                        </span>

                        <span className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-full text-zinc-300">
                            💻 Remote Friendly
                        </span>

                        <span className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-full text-zinc-300">
                            🚀 Startup Ecosystem
                        </span>

                        <span className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-full text-zinc-300">
                            🌍 African Innovation
                        </span>

                    </div>

                    {/* STATS */}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/20 transition overflow-hidden">

                            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight break-words">
                                4.2K+
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                Developers
                            </p>

                        </div>

                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/20 transition overflow-hidden">

                            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight break-words">
                                120+
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                Events Hosted
                            </p>

                        </div>

                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/20 transition overflow-hidden">

                            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight break-words">
                                300+
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                Startups
                            </p>

                        </div>

                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/20 transition overflow-hidden">

                            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight break-words">
                                16
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                Regions
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* SEARCH */}

            <section className="px-6 py-16">

                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-center">

                        <div>

                            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight">
                                Discover Developers
                            </h2>

                            <p className="text-zinc-400 mt-4 text-lg">
                                Explore talented developers and creators across Ghana.
                            </p>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

                            <input
                                type="text"
                                placeholder="Search developers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 w-full sm:w-[320px] min-w-0 outline-none focus:border-yellow-500 transition"
                            />

                            <div className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-medium tracking-tight whitespace-nowrap flex items-center justify-center shadow-lg shadow-yellow-500/20">
                                Live Search
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* DEVELOPERS */}

            <section className="px-6 pb-24">

                <div className="max-w-7xl mx-auto">

                    {filteredDevelopers.length === 0 && (

                        <div className="text-center py-20">

                            <h2 className="text-4xl font-medium tracking-tight">
                                No Developers Found
                            </h2>

                            <p className="text-zinc-500 mt-4">
                                Try searching for React, Backend, UI/UX, Accra...
                            </p>

                        </div>

                    )}

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {filteredDevelopers.map((dev) => (

                            <div
                                key={dev.name}
                                className="group relative bg-[#121212] border border-zinc-800 rounded-[32px] overflow-hidden hover:border-yellow-500/30 transition duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/10"
                            >

                                <div className="relative h-80 overflow-hidden">

                                    <img
                                        src={dev.image}
                                        alt={dev.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/20 to-transparent"></div>

                                    <div className="absolute bottom-6 left-6">

                                        <div className="bg-black/40 border border-white/10 text-zinc-200 px-4 py-2 rounded-full text-sm backdrop-blur-xl">
                                            {dev.availability}
                                        </div>

                                    </div>

                                </div>

                                <div className="p-8">

                                    <div className="flex items-start justify-between gap-4">

                                        <div className="min-w-0">

                                            <h3 className="text-3xl font-medium tracking-tight break-words">
                                                {dev.name}
                                            </h3>

                                            <p className="text-yellow-400 mt-2 break-words">
                                                {dev.role}
                                            </p>

                                        </div>

                                        <div className="w-3 h-3 rounded-full bg-yellow-400 mt-4 shrink-0"></div>

                                    </div>

                                    <div className="mt-4 space-y-2">

                                        <p className="text-zinc-500">
                                            {dev.location}
                                        </p>

                                        <p className="text-zinc-400 text-sm">
                                            {dev.experience}
                                        </p>

                                        <p className="text-yellow-400 text-sm break-words">
                                            {dev.specialty}
                                        </p>

                                    </div>

                                    <div className="flex flex-wrap gap-3 mt-8">

                                        {dev.stack.map((item) => (

                                            <span
                                                key={item}
                                                className="bg-zinc-800/80 border border-zinc-700 hover:border-yellow-500/30 px-4 py-2 rounded-full text-sm transition"
                                            >
                                                {item}
                                            </span>

                                        ))}

                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 mt-10 pt-6 border-t border-zinc-800">

                                        <div>

                                            <p className="text-2xl font-medium tracking-tight">
                                                24+
                                            </p>

                                            <p className="text-zinc-500 text-sm">
                                                Projects
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-2xl font-medium tracking-tight">
                                                4.9
                                            </p>

                                            <p className="text-zinc-500 text-sm">
                                                Rating
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-2xl font-medium tracking-tight">
                                                12K
                                            </p>

                                            <p className="text-zinc-500 text-sm">
                                                Followers
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 mt-10">

                                        <Link
                                            to={dev.profile}
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-medium tracking-tight transition text-center shadow-lg hover:shadow-yellow-500/20"
                                        >
                                            View Profile
                                        </Link>

                                        <button className="flex-1 border border-zinc-700 hover:border-yellow-500/40 py-4 rounded-2xl transition">
                                            Connect
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

        </div>
    );
}