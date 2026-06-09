import { io } from "socket.io-client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TechFeed from "../components/TechFeed";
import WhoToFollow from "../components/WhoToFollow";
import TrendingDevelopers from "../components/TrendingDevelopers";
import TrendingHashtags from "../components/TrendingHashtags";
import MentionRenderer from "../components/MentionRenderer";

import {
    Bell,
    Bookmark,
    Heart,
    MessageCircle,
    Repeat2,
    Send,
    Mail,
    Trash2,
    Home,
    Search,
    ChevronUp,
    ChevronDown,
    Compass,
    Briefcase,
    X,
} from "lucide-react";


const socket = io(import.meta.env.VITE_API_URL);
const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [mentionSuggestions, setMentionSuggestions] = useState([]);
    const [showMentions, setShowMentions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [activeCommentPost, setActiveCommentPost] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [unreadDmCount, setUnreadDmCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    
    
    const [analytics, setAnalytics] = useState({
        usersOnline: 0,
        visitorsToday: 0,
        date: null,
    });
    
    const [onlineUserIds, setOnlineUserIds] = useState([]);

    const token = localStorage.getItem("token");
    const isGuest = !token;

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchProfile = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/auth/profile`,
                authConfig
            );

            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/posts`);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const fetchUnreadNotifications = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/notifications`,
                authConfig
            );
    
            const unread = response.data.filter(
                (notification) => notification.read === false
            );
    
            setUnreadCount(unread.length);
        } catch (error) {
            console.log(error);
        }
    };
    
    const fetchAnalytics = async () => {
        try {
            const visitorId =
                localStorage.getItem("visitorId") ||
                crypto.randomUUID();
    
            localStorage.setItem("visitorId", visitorId);
    
            await axios.post(`${API_URL}/api/analytics/track`, {
                visitorId,
                userId: user?._id || null,
            });
    
            const response = await axios.get(
                `${API_URL}/api/analytics/summary`
            );
    
            setAnalytics((prev) => ({
                ...prev,
                visitorsToday: response.data.visitorsToday,
                date: response.data.date,
            }));
        } catch (error) {
            console.log(error);
        }
    };



    const createDiscussion = async (e) => {
        if (isGuest) {
            alert("Please login to use this feature.");
            return;
        }
        e.preventDefault();

        if (!content.trim()) return;

        setLoading(true);

        try {
            await axios.post(
                `${API_URL}/api/posts`,
                { content },
                authConfig
            );

            setContent("");
            fetchPosts();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to create discussion");
        }

        setLoading(false);
    };

    const deletePost = async (postId) => {
        if (isGuest) {
            alert("Please login to use this feature.");
            return;
        }
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this discussion?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `${API_URL}/api/posts/${postId}`,
                authConfig
            );

            fetchPosts();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to delete discussion");
        }
    };

    const toggleAction = async (postId, action) => {
        if (isGuest) {
            alert("Please login to use this feature.");
            return;
        }
    
        try {
            await axios.put(
                `${API_URL}/api/posts/${postId}/${action}`,
                {},
                authConfig
            );
    
            fetchPosts();
        } catch (error) {
            alert(error.response?.data?.message || "Action failed");
        }
    };
    
    const votePost = async (postId, type) => {
        if (isGuest) {
            alert("Please login to use this feature.");
            return;
        }
    
        try {
            await axios.put(
                `${API_URL}/api/posts/${postId}/${type}`,
                {},
                authConfig
            );
    
            fetchPosts();
    
            if (activeCommentPost) {
                fetchComments(activeCommentPost);
            }
        } catch (error) {
            alert(error.response?.data?.message || "Vote failed");
        }
    };

    const createComment = async () => {
        if (isGuest) {
            alert("Please login to use this feature.");
            return;
        }
    
        if (!commentText.trim() || !activeCommentPost) return;
    
        setCommentLoading(true);
    
        try {
            await axios.post(
                `${API_URL}/api/posts/${activeCommentPost}/comment`,
                { content: commentText },
                authConfig
            );
    
            setCommentText("");
            fetchPosts();
            fetchComments(activeCommentPost);
        } catch (error) {
            alert(error.response?.data?.message || "Unable to comment");
        }
    
        setCommentLoading(false);
    };
    
    const fetchComments = async (postId) => {
        setLoadingComments(true);
    
        try {
            const response = await axios.get(
                `${API_URL}/api/posts/${postId}/comments`
            );
    
            setComments(response.data);
        } catch (error) {
            console.log(error);
        }
    
        setLoadingComments(false);
    };
    
    const searchMentions = async (query) => {
        try {
            const response = await axios.get(
                `${API_URL}/api/users/search/mentions?q=${query}`,
                authConfig
            );
    
            setMentionSuggestions(response.data);
            setShowMentions(true);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    
        window.location.replace("/");
    };

    const hasUserReacted = (list) => {
        if (!user || !list) return false;

        return list.some((id) => id === user._id);
    };



    const filteredPosts = posts.filter((post) => {
        const keyword = search.toLowerCase();

        return (
            post.content?.toLowerCase().includes(keyword) ||
            post.user?.name?.toLowerCase().includes(keyword) ||
            post.user?.handle?.toLowerCase().includes(keyword)
        );
    });

    useEffect(() => {
        const loadDashboard = async () => {
            if (!isGuest) {
                await fetchProfile();
                await fetchUnreadNotifications();
            }
    
            await fetchPosts();
            await fetchAnalytics();
        };
    
        loadDashboard();
    }, []);
    
    useEffect(() => {
        socket.on("online-users-count", (count) => {
            setAnalytics((prev) => ({
                ...prev,
                usersOnline: count,
            }));
        });
    
        socket.on("online-users-list", (ids) => {
            setOnlineUserIds(ids);
        });
    
        socket.on("new-notification", () => {
            setUnreadCount((prev) => prev + 1);
        });
        
        socket.on("new-message", () => {
            setUnreadDmCount((prev) => prev + 1);
        });
    
        return () => {
            socket.off("online-users-count");
            socket.off("online-users-list");
            socket.off("new-notification");
            socket.off("new-message");
            socket.off("new-message");
        };
    }, []);
    
    useEffect(() => {
        if (!token || !user?._id) return;
    
        socket.emit("user-online", user._id);
        socket.emit("join-user-room", user._id);
    }, [token, user]);
    
    
    
    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            
            <header className="lg:hidden sticky top-0 z-40 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 -mx-4 px-4 py-3 mb-4 flex items-center justify-between">
    <button
        onClick={() => setMobileMenuOpen(true)}
        className="w-11 h-11 rounded-2xl bg-yellow-500 text-black flex items-center justify-center font-black overflow-hidden"
    >
        {user?.profileImage?.startsWith(`${API_URL}/uploads/`) ? (
            <img
                src={user.profileImage}
                alt={user.name}
                className="w-full h-full object-cover"
            />
        ) : (
            user?.name?.charAt(0) || "G"
        )}
    </button>

                <div className="text-center">
                    <h1 className="font-black text-lg">
                        GhanaTechHub
                    </h1>
                    <p className="text-xs text-zinc-500">
                        {analytics.usersOnline} online • 👁 {analytics.visitorsToday} today
                    </p>
                    
                </div>
                
                

                <Link
                    to="/notifications"
                    className="relative w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center"
                >
                    <Bell size={18} />

                    {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </Link>
            </header>

            <header className="hidden lg:flex gap-4 items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-2xl border border-zinc-700 bg-zinc-900"></div>

                            <div className="relative text-4xl font-black leading-none">
                                <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">
                                    G
                                </span>

                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-1 bg-black rounded-full"></div>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl font-black tracking-tight">
                                GhanaTechHub
                            </h1>

                            <p className="text-sm text-zinc-500">
                                Discussions for Ghanaian developers
                            </p>
                        </div>
                        <div className="hidden lg:flex items-center gap-3 text-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-4 py-3">
                        <span className="text-green-500 font-bold">
                            {analytics.usersOnline} users online
                        </span>

                        <span className="text-zinc-400">•</span>

                        <span>
                            👁 {analytics.visitorsToday} visitors today
                        </span>

                        <span className="text-zinc-400">•</span>

                        <span className="text-zinc-500">
                            {analytics.date
                                ? new Date(analytics.date).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : ""}
                        </span>
                    </div>
                    </div>

                    <Link
                        to="/explore"
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition"
                    >
                        <Compass size={18} />
                        Explore
                    </Link>

                    <button
                        onClick={() => {
                            setSearch("");
                            fetchPosts();
                        }}
                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 px-4 py-3 rounded-2xl flex items-center justify-center gap-2 hover:border-yellow-500/40 transition"
                    >
                        <Home size={18} />
                        Home
                    </button>
                </header>

                <div className="hidden lg:block relative mb-6">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type="text"
                        placeholder="Search discussions, ideas, problems, or hashtags like #react #python..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-yellow-500 transition"
                    />
                </div>

                <div className="grid lg:grid-cols-[280px_1fr_280px] gap-6">
                <aside className="hidden lg:block bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 h-fit">

                    <Link
                        to={`/profile/${user?.username}`}
                        className="flex items-center gap-4 group"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-black flex items-center justify-center font-bold text-xl overflow-hidden">
                        {user?.profileImage?.startsWith(`${API_URL}/uploads/`) ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                user?.name?.charAt(0) || "G"
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="font-bold text-lg truncate group-hover:text-yellow-500 transition">
                                {user?.name || "GTH User"}
                            </h2>

                            <p className="text-yellow-600 dark:text-yellow-400 text-sm truncate">
                                {user?.handle || "@gthUser"}
                            </p>
                        </div>
                    </Link>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-5 leading-relaxed">
                            {user?.bio || "Developer building and learning on GhanaTechHub."}
                        </p>

                        <p className="text-zinc-500 text-sm mt-4">
                            📍 {user?.location || "Ghana"}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                        <Link
                            to="/notifications"
                            className="relative bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl py-3 flex items-center justify-center gap-2"
                        >
                            <Bell size={18} />
                            Alerts

                            {unreadCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black min-w-6 h-6 px-2 rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            to="/messages"
                            onClick={() => setUnreadDmCount(0)}
                            className="relative bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl py-3 flex items-center justify-center gap-2"
                        >
                            <Mail size={18} />
                            DMs

                            {unreadDmCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-black min-w-6 h-6 px-2 rounded-full flex items-center justify-center">
                                    {unreadDmCount}
                                </span>
                            )}
                        </Link>
                        
                        <Link
                            to="/jobs"
                            className="col-span-2 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl py-3 flex items-center justify-center gap-2"
                        >
                            <Briefcase size={18} />
                            Jobs
                        </Link>
                        
                        <Link
                            to="/saved-jobs"
                            className="col-span-2 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl py-3 flex items-center justify-center gap-2"
                        >
                            <Bookmark size={18} />
                            Saved Jobs
                        </Link>
                        
                        <Link
                            to="/my-applications"
                            className="col-span-2 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl py-3 flex items-center justify-center gap-2"
                        >
                            <Briefcase size={18} />
                            My Applications
                        </Link>
                        <Link
                            to="/recruiter/applications"
                            className="col-span-2 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl py-3 flex items-center justify-center gap-2"
                        >
                            <Briefcase size={18} />
                            Recruiter Dashboard
                        </Link>


                            <button
                                onClick={logout}
                                className="col-span-2 bg-red-500 hover:bg-red-400 text-white py-3 rounded-2xl font-semibold transition"
                            >
                                Logout
                            </button>
                            </div>

                            <div className="mt-6">
                                <WhoToFollow />
                            </div>
                            
                            <div className="mt-6">
                                <TrendingDevelopers />
                            </div>

                            </aside>

                    <main className="space-y-6">
                    {!isGuest && (
                        <form
                            onSubmit={createDiscussion}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 sm:p-6"
                        >
                            <div className="flex gap-4">
                            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-yellow-500 text-black items-center justify-center font-bold overflow-hidden">
                            {user?.profileImage?.startsWith(`${API_URL}/uploads/`) ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        user?.name?.charAt(0) || "G"
                                    )}
                                </div>

                                <div className="flex-1">
                                    <textarea
                                        value={content}
                                        onChange={(e) => {
                                        const value = e.target.value;

                                        setContent(value);

                                        const match = value.match(/@([a-zA-Z0-9_]*)$/);

                                        if (match) {
                                            searchMentions(match[1]);
                                        } else {
                                            setShowMentions(false);
                                        }
                                    }}
                                        placeholder="Start a discussion, ask for feedback, share an idea, or mention @gthSomeone..."
                                        rows="4"
                                        className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none resize-none focus:border-yellow-500 transition"
                                    />
                                                            
                                                            {showMentions && mentionSuggestions.length > 0 && (
                            <div className="mt-2 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl overflow-hidden">
                                {mentionSuggestions.map((person) => (
                                    <button
                                        key={person._id}
                                        type="button"
                                        onClick={() => {
                                            const updatedContent = content.replace(
                                                /@([a-zA-Z0-9_]*)$/,
                                                person.handle
                                            );

                                            setContent(`${updatedContent} `);

                                            setShowMentions(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold overflow-hidden">
                                            {person.profileImage?.startsWith("http") ? (
                                                <img
                                                    src={person.profileImage}
                                                    alt={person.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                person.name?.charAt(0)
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                {person.name}
                                            </p>

                                            <p className="text-yellow-500 text-sm">
                                                {person.handle}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                                        <p className="text-zinc-500 text-sm">
                                            Discussions work best when you ask for ideas, feedback, or opinions.
                                        </p>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition"
                                        >
                                            <Send size={18} />
                                            {loading ? "Posting..." : "Discuss"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                    
                    {isGuest && (
    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6 text-center">
        <h2 className="text-2xl font-black">
            Browse GhanaTechHub
        </h2>

        <p className="text-zinc-500 mt-2">
            You can explore discussions, tags, and tech news. Login to post, reply, follow, or message developers.
        </p>

        <div className="flex justify-center gap-3 mt-5">
            <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold"
            >
                Login
            </Link>

            <Link
                to="/register"
                className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 px-5 py-3 rounded-2xl font-bold"
            >
                Register
            </Link>
        </div>
    </div>
)}

                        {filteredPosts.map((post) => (
                            <article
                                key={post._id}
                                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 sm:p-6"
                            >
                                <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold shrink-0 overflow-hidden">
                                {post.user?.profileImage?.startsWith(`${API_URL}/uploads/`) ? (
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
                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0">
                                                <Link
                                                    to={`/profile/${post.user?.username}`}
                                                    className="block"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-bold truncate hover:text-yellow-500 transition">
                                                            {post.user?.name}
                                                        </h3>

                                                        {onlineUserIds.includes(post.user?._id) ? (
                                                            <span className="text-green-500 text-xs font-bold">
                                                                ● Online
                                                            </span>
                                                        ) : (
                                                            <span className="text-zinc-400 text-xs">
                                                                ○ Offline
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-yellow-600 dark:text-yellow-400 text-sm truncate hover:text-yellow-500 transition">
                                                        {post.user?.handle}
                                                    </p>
                                                </Link>
                                            </div>

                                            {user?._id === post.user?._id && (
                                                <button
                                                    onClick={() => deletePost(post._id)}
                                                    className="text-red-500 hover:text-red-400 transition"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>

                                        <p className="text-zinc-800 dark:text-zinc-200 mt-4 leading-relaxed whitespace-pre-wrap">
                                            <MentionRenderer text={post.content} />
                                        </p>

                                        {post.quotedPost && (
                                            <div className="mt-5 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 bg-white dark:bg-[#09090b]">
                                                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                                    Quoted discussion
                                                </p>

                                                <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                                                    <MentionRenderer text={post.quotedPost.content} />
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-6 text-sm text-zinc-500">

                                            <button
                                                onClick={() => {
                                                    setActiveCommentPost(post._id);
                                                    fetchComments(post._id);
                                                }}
                                                                                                                className="flex items-center gap-2 hover:text-yellow-500 transition"
                                            >
                                                <MessageCircle size={18} />
                                                {post.commentsCount || 0}
                                            </button>

                                            <button
                                                onClick={() => toggleAction(post._id, "favorite")}
                                                className={`flex items-center gap-2 transition ${
                                                    hasUserReacted(post.favorites)
                                                        ? "text-red-500"
                                                        : "hover:text-red-500"
                                                }`}
                                            >
                                                <Heart size={18} />
                                                {post.favorites?.length || 0}
                                            </button>

                                            <button
                                                onClick={() => toggleAction(post._id, "bookmark")}
                                                className={`flex items-center gap-2 transition ${
                                                    hasUserReacted(post.bookmarks)
                                                        ? "text-blue-500"
                                                        : "hover:text-blue-500"
                                                }`}
                                            >
                                                <Bookmark size={18} />
                                                {post.bookmarks?.length || 0}
                                            </button>

                                            <button
                                                onClick={() => toggleAction(post._id, "reshare")}
                                                className={`flex items-center gap-2 transition ${
                                                    hasUserReacted(post.reshares)
                                                        ? "text-green-500"
                                                        : "hover:text-green-500"
                                                }`}
                                            >
                                                <Repeat2 size={18} />
                                                {post.reshares?.length || 0}
                                            </button>
                                            <button
                                            onClick={() => votePost(post._id, "upvote")}
                                            className={`flex items-center gap-2 transition ${
                                                hasUserReacted(post.upvotes)
                                                    ? "text-green-500"
                                                    : "hover:text-green-500"
                                            }`}
                                        >
                                            <ChevronUp size={18} />
                                            {post.upvotes?.length || 0}
                                        </button>

                                        <button
                                            onClick={() => votePost(post._id, "downvote")}
                                            className={`flex items-center gap-2 transition ${
                                                hasUserReacted(post.downvotes)
                                                    ? "text-red-500"
                                                    : "hover:text-red-500"
                                            }`}
                                        >
                                            <ChevronDown size={18} />
                                            {post.downvotes?.length || 0}
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}

                        {filteredPosts.length === 0 && (
                            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                                No discussions found.
                            </div>
                        )}
                    </main>

                    <aside className="hidden lg:block space-y-6">
                    
                        <TrendingHashtags />

                        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 h-fit">
                            <h2 className="font-bold text-xl">
                                GTH Spaces
                            </h2>

                            <div className="space-y-3 mt-5 text-sm">
                                {[
                                    "#react",
                                    "#javascript",
                                    "#python",
                                    "#jobs",
                                    "#events",
                                ].map((space) => (
                                    <button
                                        key={space}
                                        onClick={() => setSearch(space)}
                                        className="w-full text-left bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 hover:border-yellow-500/40 transition"
                                    >
                                        {space}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <aside className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 h-fit">
                            <TechFeed />
                        </aside>

                    </aside>
                </div>
            </div>
            
            {mobileMenuOpen && (
    <div className="fixed inset-0 z-50 lg:hidden">
        <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <aside className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-white dark:bg-[#09090b] border-r border-zinc-300 dark:border-zinc-800 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <Link
                    to={`/profile/${user?.username}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3"
                >
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-black flex items-center justify-center font-black overflow-hidden">
                    {user?.profileImage?.startsWith(`${API_URL}/uploads/`) ? (
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            user?.name?.charAt(0) || "G"
                        )}
                    </div>

                    <div>
                        <h2 className="font-black">
                            {user?.name || "GTH User"}
                        </h2>
                        <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                            {user?.handle || "@gthUser"}
                        </p>
                    </div>
                </Link>

                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="space-y-3">
                <Link onClick={() => setMobileMenuOpen(false)} to={`/profile/${user?.username}`} className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold">
                    Profile
                </Link>

                <Link onClick={() => setMobileMenuOpen(false)} to="/explore" className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold">
                    Explore
                </Link>

                <Link onClick={() => setMobileMenuOpen(false)} to="/notifications" className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold">
                    Notifications {unreadCount > 0 ? `(${unreadCount})` : ""}
                </Link>

                <Link onClick={() => setMobileMenuOpen(false)} to="/messages" className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold">
                    Messages
                </Link>
                <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/jobs"
                    className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold"
                >
                    Jobs
                </Link>

                <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/saved-jobs"
                    className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold"
                >
                    Saved Jobs
                </Link>
                
                                <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/my-applications"
                    className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold"
                >
                    My Applications
                </Link>
                <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/recruiter/applications"
                    className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold"
                >
                    Recruiter Dashboard
                </Link>
                

                <Link onClick={() => setMobileMenuOpen(false)} to="/saved" className="block bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 font-bold">
                    Saved Discussions
                </Link>
            </div>

            <div className="mt-6">
                <TrendingHashtags />
            </div>

            <div className="mt-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5">
                <h2 className="font-bold text-xl">
                    GTH Spaces
                </h2>

                <div className="space-y-3 mt-5 text-sm">
                    {["#react", "#javascript", "#python", "#jobs", "#events"].map((space) => (
                        <button
                            key={space}
                            onClick={() => {
                                setSearch(space);
                                setMobileMenuOpen(false);
                            }}
                            className="w-full text-left bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4"
                        >
                            {space}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <TechFeed />
            </div>

            <button
                onClick={logout}
                className="w-full mt-6 bg-red-500 hover:bg-red-400 text-white py-4 rounded-2xl font-bold"
            >
                Logout
            </button>
        </aside>
    </div>
)}

            {activeCommentPost && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-xl bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-6">
                        <h2 className="text-2xl font-black">
                            Reply to discussion
                        </h2>

                        <p className="text-zinc-500 mt-2">
                            Share your ideas, feedback or solution.
                        </p>
                        <div className="mt-6 max-h-72 overflow-y-auto space-y-4">

    {loadingComments && (
        <p className="text-zinc-500 text-sm">
            Loading replies...
        </p>
    )}

    {!loadingComments && comments.length === 0 && (
        <p className="text-zinc-500 text-sm">
            No replies yet.
        </p>
    )}

    {comments.map((comment) => (

        <div
            key={comment._id}
            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4"
        >

            <div className="flex gap-3">

                <div className="w-10 h-10 rounded-xl bg-yellow-500 text-black flex items-center justify-center font-bold shrink-0 overflow-hidden">

                    {comment.user?.profileImage ? (

                        <img
                            src={comment.user.profileImage}
                            alt={comment.user.name}
                            className="w-full h-full object-cover"
                        />

                    ) : (

                        comment.user?.name?.charAt(0)

                    )}

                </div>

                <div className="flex-1">

                    <h4 className="font-bold">
                        {comment.user?.name}
                    </h4>

                    <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                        {comment.user?.handle}
                    </p>

                    <p className="mt-3 text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                        <MentionRenderer text={comment.content} />
                    </p>

                    <div className="flex items-center gap-4 mt-4 text-sm">

                        <button
                            onClick={() => votePost(comment._id, "upvote")}
                            className={`flex items-center gap-1 ${
                                hasUserReacted(comment.upvotes)
                                    ? "text-green-500"
                                    : "text-zinc-500"
                            }`}
                        >
                            <ChevronUp size={16} />
                            {comment.upvotes?.length || 0}
                        </button>

                        <button
                            onClick={() => votePost(comment._id, "downvote")}
                            className={`flex items-center gap-1 ${
                                hasUserReacted(comment.downvotes)
                                    ? "text-red-500"
                                    : "text-zinc-500"
                            }`}
                        >
                            <ChevronDown size={16} />
                            {comment.downvotes?.length || 0}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    ))}

</div>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            rows="5"
                            placeholder="Write your reply..."
                            className="w-full mt-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none resize-none focus:border-yellow-500 transition"
                        />

                        <div className="flex items-center justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setActiveCommentPost(null);
                                    setCommentText("");
                                }}
                                className="px-5 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={createComment}
                                disabled={commentLoading}
                                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold transition"
                            >
                                {commentLoading ? "Replying..." : "Reply"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}