import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Hash } from "lucide-react";

export default function TrendingHashtags() {
    const [tags, setTags] = useState([]);

    const fetchTrendingHashtags = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/posts/trending/hashtags"
            );

            setTags(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadTrendingHashtags = async () => {
            await fetchTrendingHashtags();
        };

        loadTrendingHashtags();
    }, []);

    return (
        <aside className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 h-fit">
            <h2 className="font-bold text-xl mb-5">
                Trending Tags
            </h2>

            <div className="space-y-3">
                {tags.length === 0 && (
                    <p className="text-zinc-500 text-sm">
                        No trending tags yet.
                    </p>
                )}

                {tags.map((item) => {
                    const cleanTag = item.tag.replace("#", "");

                    return (
                        <Link
                            key={item.tag}
                            to={`/hashtag/${cleanTag}`}
                            className="flex items-center justify-between bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 hover:border-yellow-500/40 transition"
                        >
                            <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold">
                                <Hash size={16} />
                                {cleanTag}
                            </span>

                            <span className="text-zinc-500 text-sm">
                                {item.count} posts
                            </span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}