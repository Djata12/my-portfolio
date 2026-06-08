import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon } from "lucide-react";
import axios from "axios";

import kwame from "../assets/developers/kwame.webp";
import naa from "../assets/developers/naa.webp";
import richard from "../assets/developers/richard.webp";
import enyonam from "../assets/developers/enyonam.webp";
import daniel from "../assets/developers/daniel.webp";
import esi from "../assets/developers/esi.webp";

const imageMap = {
    "kwame.webp": kwame,
    "naa.webp": naa,
    "richard.webp": richard,
    "enyonam.webp": enyonam,
    "daniel.webp": daniel,
    "esi.webp": esi,
};

const API_URL = import.meta.env.VITE_API_URL;

export default function GhanaTechHub() {
    const [developers, setDevelopers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/developers`);
                setDevelopers(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDevelopers();
    }, []);

    const filteredDevelopers = developers.filter((dev) => {
        const keyword = search.toLowerCase();

        return (
            dev.name?.toLowerCase().includes(keyword) ||
            dev.role?.toLowerCase().includes(keyword) ||
            dev.location?.toLowerCase().includes(keyword) ||
            dev.stack?.join(" ").toLowerCase().includes(keyword)
        );
    });

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white overflow-hidden transition-colors duration-300">

            <button className="fixed bottom-6 right-6 z-50 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition">
                <Moon size={20} />
            </button>

            <section className="relative px-6 pt-24 pb-20 border-b border-zinc-300 dark:border-zinc-800 overflow-hidden">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[120px] rounded-full"></div>

                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto relative z-10">

                    <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-300 px-5 py-3 rounded-full text-sm backdrop-blur-xl">
                        🇬🇭 Ghana&apos;s Fastest Growing Developer Community
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-8xl font-medium tracking-tight leading-none mt-8 break-words">
                        Connecting
                        <br />
                        Ghanaian
                        <br />
                        Developers
                    </h1>

                    <p className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl mt-8 max-w-3xl leading-relaxed">
                        Ghana Tech Hub is a modern African developer community helping
                        engineers, designers and founders collaborate, network and build
                        impactful products across Ghana and beyond.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-10">
                        {["🇬🇭 Accra", "💻 Remote Friendly", "🚀 Startup Ecosystem", "🌍 African Innovation"].map((item) => (
                            <span
                                key={item}
                                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 px-5 py-3 rounded-full text-zinc-700 dark:text-zinc-300"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                        {[
                            ["4.2K+", "Developers"],
                            ["120+", "Events Hosted"],
                            ["300+", "Startups"],
                            ["16", "Regions"],
                        ].map(([number, label]) => (
                            <div
                                key={label}
                                className="bg-zinc-100 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-300 dark:border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 overflow-hidden"
                            >
                                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight break-words">
                                    {number}
                                </h2>

                                <p className="text-zinc-500 mt-2">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

            </section>

            <section className="px-6 py-16">

                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-center">

                        <div>
                            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight">
                                Discover Developers
                            </h2>

                            <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-lg">
                                Explore talented developers and creators across Ghana.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

                            <input
                                type="text"
                                placeholder="Search developers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-6 py-4 w-full sm:w-[320px] min-w-0 outline-none focus:border-yellow-500 transition"
                            />

                            <div className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-medium tracking-tight whitespace-nowrap flex items-center justify-center shadow-lg shadow-yellow-500/20">
                                Live Search
                            </div>

                        </div>

                    </div>

                </div>

            </section>

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

                        {filteredDevelopers.map((dev) => {
                            const imageName = dev.image?.split("/").pop();
                            const developerImage = imageMap[imageName];

                            return (
                                <div
                                    key={dev._id}
                                    className="group relative bg-zinc-100 dark:bg-[#121212] border border-zinc-300 dark:border-zinc-800 rounded-[32px] overflow-hidden hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:-translate-y-3"
                                >

                                    <div className="relative h-80 overflow-hidden">

                                        <img
                                            src={developerImage}
                                            alt={dev.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                                        <div className="absolute bottom-6 left-6">
                                            <div className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm backdrop-blur-xl">
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

                                                <p className="text-yellow-500 dark:text-yellow-400 mt-2 break-words">
                                                    {dev.role}
                                                </p>
                                            </div>

                                            <div className="w-3 h-3 rounded-full bg-yellow-400 mt-4 shrink-0"></div>

                                        </div>

                                        <div className="mt-4 space-y-2">

                                            <p className="text-zinc-500">
                                                {dev.location}
                                            </p>

                                            <p className="text-zinc-500 text-sm">
                                                {dev.experience}
                                            </p>

                                            <p className="text-yellow-500 dark:text-yellow-400 text-sm break-words">
                                                {dev.specialty}
                                            </p>

                                        </div>

                                        <div className="flex flex-wrap gap-3 mt-8">

                                            {dev.stack?.map((item) => (
                                                <span
                                                    key={item}
                                                    className="bg-white dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500/40 px-4 py-2 rounded-full text-sm transition"
                                                >
                                                    {item}
                                                </span>
                                            ))}

                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 mt-10 pt-6 border-t border-zinc-300 dark:border-zinc-800">

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

                                            <button className="flex-1 border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500/40 py-4 rounded-2xl transition">
                                                Connect
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

        </div>
    );
}