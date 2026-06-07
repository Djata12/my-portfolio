import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    ArrowLeft,
    Compass,
    Hash,
    MessageCircle,
    Trophy,
    UserPlus,
    ChevronUp,
    ChevronDown,
} from "lucide-react";

export default function Explore() {
    const [posts, setPosts] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchExploreData = async () => {
        try {
            const [postsRes, developersRes, tagsRes, suggestionsRes] =
                await Promise.all([
                    axios.get("http://localhost:5000/api/posts"),
                    axios.get(
                        "http://localhost:5000/api/users/trending/developers",
                        authConfig
                    ),
                    axios.get("http://localhost:5000/api/posts/trending/hashtags"),
                    axios.get(
                        "http://localhost:5000/api/users/suggestions/who-to-follow",
                        authConfig
                    ),
                ]);

            const trendingPosts = postsRes.data
                .map((post) => ({
                    ...post,
                    score:
                        (post.upvotes?.length || 0) * 5 +
                        (post.commentsCount || 0) * 3 +
                        (post.reshares?.length || 0) * 2,
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, 5);

            setPosts(trendingPosts);
            setDevelopers(developersRes.data);
            setTags(tagsRes.data);
            setSuggestions(suggestionsRes.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const followUser = async (userId) => {
        try {
            await axios.put(
                `http://localhost:5000/api/users/${userId}/follow`,
                {},
                authConfig
            );

            fetchExploreData();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to follow user");
        }
    };

    useEffect(() => {
        const loadExplore = async () => {
            await fetchExploreData();
        };

        loadExplore();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-4 sm:px-6 py-8">
            <div className="max-w-6xl mx-auto">

                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to dashboard
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-black flex items-center justify-center">
                        <Compass size={26} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-black">
                            Explore GhanaTechHub
                        </h1>

                        <p className="text-zinc-500 mt-1">
                            Discover trending discussions, developers, and tags.
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                        Loading explore page...
                    </div>
                )}

                {!loading && (
                    <div className="grid lg:grid-cols-[1fr_320px] gap-6">

                        <main className="space-y-6">

                            <section className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 sm:p-6">
                                <h2 className="text-2xl font-black mb-5">
                                    Trending Discussions
                                </h2>

                                <div className="space-y-4">
                                    {posts.length === 0 && (
                                        <p className="text-zinc-500">
                                            No trending discussions yet.
                                        </p>
                                    )}

                                    {posts.map((post) => (
                                        <article
                                            key={post._id}
                                            className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-5"
                                        >
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black overflow-hidden shrink-0">
                                                    {post.user?.profileImage?.startsWith("http://localhost:5000/uploads/") ? (
                                                        <img
                                                            src={post.user.profileImage}
                                                            alt={post.user.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        post.user?.name?.charAt(0) || "U"
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <Link
                                                        to={`/profile/${post.user?.username}`}
                                                        className="font-bold hover:text-yellow-500 transition"
                                                    >
                                                        {post.user?.name}
                                                    </Link>

                                                    <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                                                        {post.user?.handle}
                                                    </p>

                                                    <p className="mt-4 text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                                                        {post.content}
                                                    </p>

                                                    <div className="flex gap-5 mt-5 text-sm text-zinc-500">
                                                        <span className="flex items-center gap-1">
                                                            <ChevronUp size={16} />
                                                            {post.upvotes?.length || 0}
                                                        </span>

                                                        <span className="flex items-center gap-1">
                                                            <ChevronDown size={16} />
                                                            {post.downvotes?.length || 0}
                                                        </span>

                                                        <span className="flex items-center gap-1">
                                                            <MessageCircle size={16} />
                                                            {post.commentsCount || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                        </main>

                        <aside className="space-y-6">

                            <section className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <Trophy size={20} />
                                    Top Developers
                                </h2>

                                <div className="space-y-3">
                                    {developers.map((developer) => (
                                        <Link
                                            key={developer._id}
                                            to={`/profile/${developer.username}`}
                                            className="flex gap-3 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 hover:border-yellow-500/40 transition"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black overflow-hidden shrink-0">
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

                                                <p className="text-sm text-yellow-600 dark:text-yellow-400 truncate">
                                                    {developer.reputation} reputation
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <Hash size={20} />
                                    Trending Tags
                                </h2>

                                <div className="space-y-3">
                                    {tags.map((item) => {
                                        const cleanTag = item.tag.replace("#", "");

                                        return (
                                            <Link
                                                key={item.tag}
                                                to={`/hashtag/${cleanTag}`}
                                                className="flex items-center justify-between bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 hover:border-yellow-500/40 transition"
                                            >
                                                <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                                                    {item.tag}
                                                </span>

                                                <span className="text-zinc-500 text-sm">
                                                    {item.count}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>

                            <section className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <UserPlus size={20} />
                                    Who to Follow
                                </h2>

                                <div className="space-y-3">
                                    {suggestions.map((user) => (
                                        <div
                                            key={user._id}
                                            className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4"
                                        >
                                            <Link
                                                to={`/profile/${user.username}`}
                                                className="font-bold hover:text-yellow-500 transition"
                                            >
                                                {user.name}
                                            </Link>

                                            <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                                                {user.handle}
                                            </p>

                                            <button
                                                onClick={() => followUser(user._id)}
                                                className="w-full mt-3 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-xl font-bold transition"
                                            >
                                                Follow
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </aside>

                    </div>
                )}

            </div>
        </div>
    );
}