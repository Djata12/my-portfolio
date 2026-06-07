import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

export default function TrendingDevelopers() {
    const [developers, setDevelopers] = useState([]);

    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchTrendingDevelopers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/users/trending/developers",
                authConfig
            );

            setDevelopers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadTrendingDevelopers = async () => {
            await fetchTrendingDevelopers();
        };

        loadTrendingDevelopers();
    }, []);

    return (
        <aside className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5">
            <h2 className="text-2xl font-black mb-5">
                Trending Developers
            </h2>

            <div className="space-y-4">
                {developers.map((developer) => (
                    <Link
                        key={developer._id}
                        to={`/profile/${developer.username}`}
                        className="flex gap-3 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 hover:border-yellow-500/40 transition"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-black flex items-center justify-center overflow-hidden shrink-0">
                            {developer.profileImage?.startsWith("http://localhost:5000/uploads/") ? (
                                <img
                                    src={developer.profileImage}
                                    alt={developer.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                developer.name?.charAt(0)
                            )}
                        </div>

                        <div className="min-w-0">
                            <h3 className="font-bold truncate">
                                {developer.name}
                            </h3>

                            <p className="text-yellow-600 dark:text-yellow-400 text-sm truncate">
                                {developer.handle}
                            </p>

                            <p className="text-zinc-500 text-sm mt-2 flex items-center gap-1">
                                <Trophy size={14} />
                                {developer.reputation} reputation
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
}