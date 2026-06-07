import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
    ArrowLeft,
    Bell,
    Heart,
    MessageCircle,
    Repeat2,
    Quote,
    UserPlus,
    AtSign,
} from "lucide-react";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [followedBackIds, setFollowedBackIds] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/auth/profile",
                authConfig
            );

            setCurrentUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/notifications",
                authConfig
            );

            setNotifications(
                response.data.filter((notification) => notification.read === false)
            );
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const markAsRead = async (id) => {
        try {
            await axios.put(
                `http://localhost:5000/api/notifications/${id}/read`,
                {},
                authConfig
            );

            fetchNotifications();
        } catch (error) {
            console.log(error);
        }
    };

    const followBack = async (userId, notificationId) => {
        if (!userId) return;

        try {
            await axios.put(
                `http://localhost:5000/api/users/${userId}/follow`,
                {},
                authConfig
            );

            setFollowedBackIds((prev) => [...prev, userId]);

            await markAsRead(notificationId);
            await fetchCurrentUser();
            await fetchNotifications();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to follow user");
        }
    };

    const isAlreadyFollowing = (senderId) => {
        if (!senderId) return false;

        const following = currentUser?.following || [];

        return (
            followedBackIds.includes(senderId) ||
            following.some((id) => {
                const realId = id?._id || id;
                return realId === senderId;
            })
        );
    };

    const getIcon = (type) => {
        if (type === "favorite") return <Heart size={18} />;
        if (type === "comment") return <MessageCircle size={18} />;
        if (type === "reshare") return <Repeat2 size={18} />;
        if (type === "quote") return <Quote size={18} />;
        if (type === "follow") return <UserPlus size={18} />;
        if (type === "mention") return <AtSign size={18} />;

        return <Bell size={18} />;
    };

    useEffect(() => {
        const loadNotifications = async () => {
            await fetchCurrentUser();
            await fetchNotifications();
        };

        loadNotifications();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to dashboard
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">
                            Notifications
                        </h1>

                        <p className="text-zinc-500 mt-2">
                            Mentions, follows, replies, quotes and reactions.
                        </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-black flex items-center justify-center">
                        <Bell size={24} />
                    </div>
                </div>

                {loading && (
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                        Loading notifications...
                    </div>
                )}

                {!loading && notifications.length === 0 && (
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                        No notifications yet.
                    </div>
                )}

                <div className="space-y-4">
                    {notifications.map((notification) => {
                        const senderId = notification.sender?._id;
                        const alreadyFollowing = isAlreadyFollowing(senderId);

                        return (
                            <div
                                key={notification._id}
                                className={`border rounded-[24px] p-5 transition ${
                                    notification.read
                                        ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800"
                                        : "bg-yellow-500/10 border-yellow-500/30"
                                }`}
                            >
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-yellow-500 text-black flex items-center justify-center shrink-0">
                                        {getIcon(notification.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div>
                                                <p className="font-semibold leading-relaxed">
                                                    {notification.message}
                                                </p>

                                                <Link
                                                    to={`/profile/${notification.sender?.username}`}
                                                    className="text-sm text-zinc-500 mt-1 block hover:text-yellow-500 transition"
                                                >
                                                    From{" "}
                                                    {notification.sender?.handle || "GTH user"}
                                                </Link>
                                            </div>

                                            <div className="flex gap-2">

                                                {notification.type === "follow" &&
                                                    notification.sender &&
                                                    !alreadyFollowing && (
                                                        <button
                                                            onClick={() =>
                                                                followBack(
                                                                    senderId,
                                                                    notification._id
                                                                )
                                                            }
                                                            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-sm font-bold transition"
                                                        >
                                                            Follow Back
                                                        </button>
                                                    )}

                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification._id)}
                                                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-bold transition"
                                                    >
                                                        Mark Read
                                                    </button>
                                                )}

                                            </div>
                                        </div>

                                        {notification.post && (
                                            <div className="mt-4 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4">
                                                <p className="text-xs text-zinc-500 mb-2">
                                                    Related discussion
                                                </p>

                                                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                                    {notification.post.content}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}