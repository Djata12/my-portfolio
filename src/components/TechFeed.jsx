import { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLink } from "lucide-react";

export default function TechFeed() {
    const [news, setNews] = useState({
        devTo: [],
        hackerNews: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/news");

                setNews(response.data);
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="text-zinc-500 text-sm">
                Loading tech feed...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div>
                <h2 className="font-bold text-xl">
                    Tech Feed
                </h2>

                <p className="text-zinc-500 text-sm mt-1">
                    Trending developer and startup news.
                </p>
            </div>

            <div>
                <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm mb-3">
                    Dev Community
                </p>

                <div className="space-y-3">
                    {news.devTo.slice(0, 4).map((item) => (
                        <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 hover:border-yellow-500/40 transition"
                        >
                            <div className="flex items-start gap-2">
                                <p className="text-sm font-medium leading-relaxed">
                                    {item.title}
                                </p>

                                <ExternalLink size={14} className="shrink-0 text-zinc-500 mt-1" />
                            </div>

                            <p className="text-xs text-zinc-500 mt-2">
                                {item.readable_publish_date}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm mb-3">
                    Hacker News
                </p>

                <div className="space-y-3">
                    {news.hackerNews.slice(0, 4).map((item) => (
                        <a
                            key={item.id}
                            href={item.url || `https://news.ycombinator.com/item?id=${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 hover:border-yellow-500/40 transition"
                        >
                            <div className="flex items-start gap-2">
                                <p className="text-sm font-medium leading-relaxed">
                                    {item.title}
                                </p>

                                <ExternalLink size={14} className="shrink-0 text-zinc-500 mt-1" />
                            </div>

                            <p className="text-xs text-zinc-500 mt-2">
                                {item.score || 0} points
                            </p>
                        </a>
                    ))}
                </div>
            </div>

        </div>
    );
}