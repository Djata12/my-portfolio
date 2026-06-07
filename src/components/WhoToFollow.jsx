import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

export default function WhoToFollow() {
    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/users/suggestions/who-to-follow",
                authConfig
            );

            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const followUser = async (userId) => {
        try {
            await axios.put(
                `http://localhost:5000/api/users/${userId}/follow`,
                {},
                authConfig
            );

            fetchSuggestions();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to follow user");
        }
    };

    const isValidUploadedImage = (image) => {
        return image && image.startsWith("http://localhost:5000/uploads/");
    };

    useEffect(() => {
        const loadSuggestions = async () => {
            await fetchSuggestions();
        };

        loadSuggestions();
    }, []);

    return (
        <aside className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5">

            <h2 className="text-2xl font-black mb-5">
                Who to Follow
            </h2>

            <div className="space-y-4">

                {users.length === 0 && (
                    <p className="text-zinc-500 text-sm">
                        No suggestions available.
                    </p>
                )}

                {users.map((user) => (
                    <div
                        key={user._id}
                        className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4"
                    >
                        <div className="flex items-start gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-black flex items-center justify-center overflow-hidden shrink-0">

                                {isValidUploadedImage(user.profileImage) ? (
                                    <img
                                        src={user.profileImage}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserRound size={26} />
                                )}

                            </div>

                            <div className="flex-1 min-w-0">

                                <Link
                                    to={`/profile/${user.username}`}
                                    className="font-bold block truncate hover:text-yellow-500 transition"
                                >
                                    {user.name}
                                </Link>

                                <p className="text-yellow-600 dark:text-yellow-400 text-sm truncate">
                                    {user.handle}
                                </p>

                                <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
                                    {user.bio || "GhanaTechHub developer"}
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={() => followUser(user._id)}
                            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-2xl font-bold transition"
                        >
                            Follow
                        </button>
                    </div>
                ))}

            </div>

        </aside>
    );
}