import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    ArrowLeft,
    Bookmark,
    MessageCircle,
    Repeat2,
    ChevronUp,
    ChevronDown,
} from "lucide-react";

export default function Saved() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchSaved = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/posts/my-bookmarks",
                authConfig
            );

            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        const loadSaved = async () => {
            await fetchSaved();
        };

        loadSaved();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-4 sm:px-6 py-8">
            <div className="max-w-3xl mx-auto">

                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to dashboard
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-black flex items-center justify-center">
                        <Bookmark size={26} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-black">
                            Saved Discussions
                        </h1>

                        <p className="text-zinc-500 mt-1">
                            Your bookmarked GhanaTechHub discussions.
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                        Loading saved discussions...
                    </div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                        No saved discussions yet.
                    </div>
                )}

                <div className="space-y-5">
                    {posts.map((post) => (
                        <article
                            key={post._id}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 sm:p-6"
                        >
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center font-black shrink-0 overflow-hidden">
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
                                        className="font-bold hover:text-yellow-500 transition block truncate"
                                    >
                                        {post.user?.name}
                                    </Link>

                                    <p className="text-yellow-600 dark:text-yellow-400 text-sm truncate">
                                        {post.user?.handle}
                                    </p>

                                    <p className="text-zinc-800 dark:text-zinc-200 mt-4 leading-relaxed whitespace-pre-wrap">
                                        {post.content}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-zinc-500">
                                        <span className="flex items-center gap-2">
                                            <ChevronUp size={18} />
                                            {post.upvotes?.length || 0}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <ChevronDown size={18} />
                                            {post.downvotes?.length || 0}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <MessageCircle size={18} />
                                            {post.commentsCount || 0}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <Repeat2 size={18} />
                                            {post.reshares?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </div>
    );
}