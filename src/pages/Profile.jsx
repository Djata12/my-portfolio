import { io } from "socket.io-client";

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    ArrowLeft,
    MapPin,
    Users,
    MessageCircle,
    Bookmark,
    Repeat2,
    Edit3,
    CalendarDays,
    X,
} from "lucide-react";

const socket = io("http://localhost:5000");

function Avatar({ profile, size = "large" }) {
    const sizeClass =
        size === "small"
            ? "w-12 h-12 rounded-2xl text-xl"
            : "w-28 h-28 rounded-[28px] text-5xl";

    return (
        <div
            className={`${sizeClass} border-4 border-zinc-100 dark:border-zinc-900 bg-yellow-500 text-black flex items-center justify-center font-black shadow-xl overflow-hidden shrink-0`}
        >
            {profile?.profileImage?.startsWith("http://localhost:5000/uploads/") ? (
                <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span>{profile?.name?.charAt(0)}</span>
            )}
        </div>
    );
}

export default function Profile() {
    const { username } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [reputation, setReputation] = useState(0);
    const [activeTab, setActiveTab] = useState("posts");
    const [followModal, setFollowModal] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [onlineUserIds, setOnlineUserIds] = useState([]);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [projectForm, setProjectForm] = useState({
        title: "",
        description: "",
        link: "",
    });
    
    const [editingProjectIndex, setEditingProjectIndex] = useState(null);

    const [editForm, setEditForm] = useState({
        name: "",
        bio: "",
        location: "",
        profileImage: "",
        bannerImage: "",
    });

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

    const fetchProfile = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/users/${username}`
            );

            setProfile(response.data.user);
            setPosts(response.data.posts || []);
            setComments(response.data.comments || []);
            setReputation(response.data.reputation || 0);
            setFeaturedProjects(
                response.data.user.featuredProjects || []
                
            );
            setSkills(response.data.user.skills || []);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const voteItem = async (postId, type) => {
        try {
            await axios.put(
                `http://localhost:5000/api/posts/${postId}/${type}`,
                {},
                authConfig
            );

            fetchProfile();
        } catch (error) {
            alert(error.response?.data?.message || "Vote failed");
        }
    };

    const toggleFollow = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/users/${profile._id}/follow`,
                {},
                authConfig
            );

            fetchProfile();
            fetchCurrentUser();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to follow user");
        }
    };

    const startConversation = async () => {
        try {
            await axios.post(
                `http://localhost:5000/api/messages/conversation/${profile._id}`,
                {},
                authConfig
            );

            navigate("/messages");
        } catch (error) {
            alert(error.response?.data?.message || "Unable to start conversation");
        }
    };

    const openEditModal = () => {
        setEditForm({
            name: profile.name || "",
            bio: profile.bio || "",
            location: profile.location || "",
            profileImage: profile.profileImage || "",
            bannerImage: profile.bannerImage || "",
        });

        setEditOpen(true);
    };
    
    const saveSkills = async (updatedSkills) => {
        try {
            const response = await axios.put(
                "http://localhost:5000/api/users/skills",
                {
                    skills: updatedSkills,
                },
                authConfig
            );
    
            setSkills(response.data);
            fetchProfile();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to update skills");
        }
    };
    
    const addSkill = async () => {
        if (!skillInput.trim()) return;
    
        const updatedSkills = [...skills, skillInput.trim()];
    
        await saveSkills(updatedSkills);
        setSkillInput("");
    };
    
    const removeSkill = async (skillToRemove) => {
        const updatedSkills = skills.filter(
            (skill) => skill !== skillToRemove
        );
    
        await saveSkills(updatedSkills);
    };
    
    const saveFeaturedProjects = async (projects) => {
        try {
            const response = await axios.put(
                "http://localhost:5000/api/users/featured-projects",
                {
                    featuredProjects: projects,
                },
                authConfig
            );
    
            setFeaturedProjects(response.data);
            fetchProfile();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to update featured projects");
        }
    };
    
    const addOrUpdateProject = async () => {
        if (!projectForm.title.trim()) {
            alert("Project title is required");
            return;
        }
    
        let updatedProjects = [];
    
        if (editingProjectIndex !== null) {
            updatedProjects = featuredProjects.map((project, index) =>
                index === editingProjectIndex ? projectForm : project
            );
        } else {
            updatedProjects = [...featuredProjects, projectForm];
        }
    
        await saveFeaturedProjects(updatedProjects);
    
        setProjectForm({
            title: "",
            description: "",
            link: "",
        });
    
        setEditingProjectIndex(null);
    };
    
    const editFeaturedProject = (project, index) => {
        setProjectForm({
            title: project.title || "",
            description: project.description || "",
            link: project.link || "",
        });
    
        setEditingProjectIndex(index);
    };
    
    const deleteFeaturedProject = async (indexToDelete) => {
        const confirmDelete = window.confirm("Delete this featured project?");
    
        if (!confirmDelete) return;
    
        const updatedProjects = featuredProjects.filter(
            (_, index) => index !== indexToDelete
        );
    
        await saveFeaturedProjects(updatedProjects);
    };

    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                "http://localhost:5000/api/users/me/update",
                editForm,
                authConfig
            );

            setEditOpen(false);
            fetchProfile();
            fetchCurrentUser();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to update profile");
        }
    };

    const uploadProfileImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploadingImage(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/uploads/profile-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditForm({
                ...editForm,
                profileImage: response.data.imageUrl,
            });
        } catch (error) {
            alert(error.response?.data?.message || "Image upload failed");
        }

        setUploadingImage(false);
    };

    const uploadBannerImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploadingImage(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/uploads/profile-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditForm({
                ...editForm,
                bannerImage: response.data.imageUrl,
            });
        } catch (error) {
            alert(error.response?.data?.message || "Image upload failed");
        }

        setUploadingImage(false);
    };

    const isFollowing = () => {
        if (!currentUser || !profile?.followers) return false;

        return profile.followers.some((user) => {
            const id = user._id || user;
            return id === currentUser._id;
        });
    };

    const hasUserReacted = (list) => {
        if (!currentUser || !list) return false;

        return list.some((id) => id === currentUser._id);
    };

    const isOnline = (userId) => {
        if (!userId) return false;
        return onlineUserIds.includes(userId);
    };

    const followList =
        followModal === "followers"
            ? profile?.followers || []
            : profile?.following || [];

    useEffect(() => {
        const loadProfile = async () => {
            await fetchCurrentUser();
            await fetchProfile();
        };

        loadProfile();
    }, [username]);

    useEffect(() => {
        socket.on("online-users-list", (ids) => {
            setOnlineUserIds(ids);
        });

        return () => {
            socket.off("online-users-list");
        };
    }, []);

    useEffect(() => {
        if (!token || !currentUser?._id) return;

        socket.emit("user-online", currentUser._id);
        socket.emit("join-user-room", currentUser._id);
        
    }, [token, currentUser]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white flex items-center justify-center">
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white flex items-center justify-center">
                User not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to dashboard
                </Link>

                <section className="overflow-hidden rounded-[32px] border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                    <div className="h-40 sm:h-56 overflow-hidden">
                        {profile.bannerImage ? (
                            <img
                                src={profile.bannerImage}
                                alt="Profile Banner"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500"></div>
                        )}
                    </div>

                    <div className="px-5 sm:px-8 pb-8">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 -mt-10 relative z-10">
                            <div className="flex items-start gap-4">
                                <Avatar profile={profile} />

                                <div className="pt-14 sm:pt-16 min-w-0">
                                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight break-words">
                                        {profile.name}
                                    </h1>

                                    <p className="text-yellow-600 dark:text-yellow-400 font-medium">
                                        {profile.handle}
                                    </p>

                                    {isOnline(profile._id) ? (
                                        <p className="text-green-500 text-sm font-bold mt-1">
                                            ● Online
                                        </p>
                                    ) : (
                                        <p className="text-zinc-400 text-sm mt-1">
                                            ○ Offline
                                        </p>
                                    )}
                                </div>
                            </div>

                            {currentUser?._id === profile._id ? (
                                <button
                                    onClick={openEditModal}
                                    className="sm:mt-16 px-6 py-3 rounded-2xl font-bold transition bg-yellow-500 hover:bg-yellow-400 text-black flex items-center gap-2 justify-center"
                                >
                                    <Edit3 size={18} />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="sm:mt-16 flex gap-3">
                                    <button
                                        onClick={toggleFollow}
                                        className={`px-6 py-3 rounded-2xl font-bold transition ${
                                            isFollowing()
                                                ? "bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white"
                                                : "bg-yellow-500 hover:bg-yellow-400 text-black"
                                        }`}
                                    >
                                        {isFollowing() ? "Following" : "Follow"}
                                    </button>

                                    <button
                                        onClick={startConversation}
                                        className="px-6 py-3 rounded-2xl font-bold bg-blue-500 hover:bg-blue-400 text-white transition"
                                    >
                                        Message
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6 max-w-3xl">
                            {profile.bio || "GhanaTechHub member."}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-5 text-sm text-zinc-500">
                            <span className="inline-flex items-center gap-2">
                                <MapPin size={16} />
                                {profile.location || "Ghana"}
                            </span>

                            <span className="inline-flex items-center gap-2">
                                <CalendarDays size={16} />
                                Joined{" "}
                                {new Date(profile.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </span>

                            <span className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold">
                                🏆 {reputation} reputation
                            </span>

                            <button
                                onClick={() => setFollowModal("followers")}
                                className="inline-flex items-center gap-2 hover:text-yellow-500 transition"
                            >
                                <Users size={16} />
                                {profile.followers?.length || 0} followers
                            </button>

                            <button
                                onClick={() => setFollowModal("following")}
                                className="inline-flex items-center gap-2 hover:text-yellow-500 transition"
                            >
                                <Users size={16} />
                                {profile.following?.length || 0} following
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="mt-8 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6">
    <h2 className="text-2xl font-black mb-5">
        🧠 Skills
    </h2>

    {currentUser?._id === profile._id && (
        <div className="flex gap-3 mb-5">
            <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill e.g. React"
                className="flex-1 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
            />

            <button
                type="button"
                onClick={addSkill}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold"
            >
                Add
            </button>
        </div>
    )}

    {skills.length === 0 ? (
        <p className="text-zinc-500">
            No skills added yet.
        </p>
    ) : (
        <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
                <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-full px-4 py-2 text-sm font-bold"
                >
                    {skill}

                    {currentUser?._id === profile._id && (
                        <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-red-500"
                        >
                            ×
                        </button>
                    )}
                </span>
            ))}
        </div>
    )}
</section>

                <section className="mt-8">
                <section className="mt-8 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6">
    <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black">
            📌 Featured Projects
        </h2>
    </div>

    {currentUser?._id === profile._id && (
        <div className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-5 mb-6 space-y-4">
            <input
                type="text"
                value={projectForm.title}
                onChange={(e) =>
                    setProjectForm({
                        ...projectForm,
                        title: e.target.value,
                    })
                }
                placeholder="Project title"
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
            />

            <textarea
                value={projectForm.description}
                onChange={(e) =>
                    setProjectForm({
                        ...projectForm,
                        description: e.target.value,
                    })
                }
                placeholder="Project description"
                rows="3"
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none resize-none focus:border-yellow-500"
            />

            <input
                type="url"
                value={projectForm.link}
                onChange={(e) =>
                    setProjectForm({
                        ...projectForm,
                        link: e.target.value,
                    })
                }
                placeholder="Project link or GitHub URL"
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
            />

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={addOrUpdateProject}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold"
                >
                    {editingProjectIndex !== null
                        ? "Update Project"
                        : "+ Add Project"}
                </button>

                {editingProjectIndex !== null && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingProjectIndex(null);
                            setProjectForm({
                                title: "",
                                description: "",
                                link: "",
                            });
                        }}
                        className="bg-zinc-200 dark:bg-zinc-800 px-5 py-3 rounded-xl font-bold"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )}

    {featuredProjects.length === 0 ? (
        <p className="text-zinc-500">
            No featured projects yet.
        </p>
    ) : (
        <div className="grid md:grid-cols-2 gap-4">
            {featuredProjects.map((project, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-5 hover:border-yellow-500/40 transition"
                >
                    <a
                        href={project.link || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="block"
                    >
                        <h3 className="font-black text-lg">
                            📌 {project.title}
                        </h3>

                        <p className="text-zinc-500 mt-2">
                            {project.description}
                        </p>

                        {project.link && (
                            <p className="text-yellow-500 mt-3 text-sm">
                                View Project →
                            </p>
                        )}
                    </a>

                    {currentUser?._id === profile._id && (
                        <div className="flex gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() =>
                                    editFeaturedProject(project, index)
                                }
                                className="text-blue-500 text-sm font-bold hover:underline"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    deleteFeaturedProject(index)
                                }
                                className="text-red-500 text-sm font-bold hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )}
</section>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3 mt-8">
                            <button
                                onClick={() => setActiveTab("posts")}
                                className={`px-5 py-3 rounded-2xl font-bold ${
                                    activeTab === "posts"
                                        ? "bg-yellow-500 text-black"
                                        : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800"
                                }`}
                            >
                                Discussions
                            </button>

                            <button
                                onClick={() => setActiveTab("replies")}
                                className={`px-5 py-3 rounded-2xl font-bold ${
                                    activeTab === "replies"
                                        ? "bg-yellow-500 text-black"
                                        : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800"
                                }`}
                            >
                                Replies
                            </button>
                        </div>

                        <p className="text-zinc-500 text-sm">
                            {activeTab === "posts"
                                ? `${posts.length} discussions`
                                : `${comments.length} replies`}
                        </p>
                    </div>

                    <div className="space-y-5">
                        {activeTab === "posts" && (
                            <>
                                {posts.length === 0 && (
                                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                                        No discussions yet.
                                    </div>
                                )}

                                {posts.map((post) => (
                                    <article
                                        key={post._id}
                                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 sm:p-6"
                                    >
                                        <div className="flex gap-4">
                                            <Avatar profile={profile} size="small" />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold truncate">
                                                    {profile.name}
                                                </h3>

                                                <p className="text-yellow-600 dark:text-yellow-400 text-sm truncate">
                                                    {profile.handle}
                                                </p>

                                                <p className="text-zinc-800 dark:text-zinc-200 mt-4 leading-relaxed whitespace-pre-wrap">
                                                    {post.content}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-zinc-500">
                                                    <button
                                                        onClick={() =>
                                                            voteItem(post._id, "upvote")
                                                        }
                                                        className={`flex items-center gap-2 transition ${
                                                            hasUserReacted(post.upvotes)
                                                                ? "text-green-500"
                                                                : "hover:text-green-500"
                                                        }`}
                                                    >
                                                        ▲ {post.upvotes?.length || 0}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            voteItem(post._id, "downvote")
                                                        }
                                                        className={`flex items-center gap-2 transition ${
                                                            hasUserReacted(post.downvotes)
                                                                ? "text-red-500"
                                                                : "hover:text-red-500"
                                                        }`}
                                                    >
                                                        ▼ {post.downvotes?.length || 0}
                                                    </button>

                                                    <span className="flex items-center gap-2">
                                                        <MessageCircle size={18} />
                                                        {post.commentsCount || 0}
                                                    </span>

                                                    <span className="flex items-center gap-2">
                                                        <Bookmark size={18} />
                                                        {post.bookmarks?.length || 0}
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
                            </>
                        )}

                        {activeTab === "replies" && (
                            <>
                                {comments.length === 0 && (
                                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                                        No replies yet.
                                    </div>
                                )}

                                {comments.map((comment) => (
                                    <article
                                        key={comment._id}
                                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 sm:p-6"
                                    >
                                        <p className="text-sm text-zinc-500 mb-4">
                                            Replied to{" "}
                                            <span className="text-yellow-600 dark:text-yellow-400">
                                                {comment.parentPost?.user?.handle ||
                                                    "a discussion"}
                                            </span>
                                        </p>

                                        {comment.parentPost && (
                                            <div className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 mb-5">
                                                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                                    Original discussion
                                                </p>

                                                <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                                                    {comment.parentPost.content}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex gap-4">
                                            <Avatar profile={profile} size="small" />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold">
                                                    {profile.name}
                                                </h3>

                                                <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                                                    {profile.handle}
                                                </p>

                                                <p className="mt-4 text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                                                    {comment.content}
                                                </p>

                                                <div className="flex gap-5 mt-5 text-sm text-zinc-500">
                                                    <button
                                                        onClick={() =>
                                                            voteItem(comment._id, "upvote")
                                                        }
                                                        className={`transition ${
                                                            hasUserReacted(comment.upvotes)
                                                                ? "text-green-500"
                                                                : "hover:text-green-500"
                                                        }`}
                                                    >
                                                        ▲ {comment.upvotes?.length || 0}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            voteItem(
                                                                comment._id,
                                                                "downvote"
                                                            )
                                                        }
                                                        className={`transition ${
                                                            hasUserReacted(comment.downvotes)
                                                                ? "text-red-500"
                                                                : "hover:text-red-500"
                                                        }`}
                                                    >
                                                        ▼{" "}
                                                        {comment.downvotes?.length || 0}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </>
                        )}
                    </div>
                </section>
            </div>

            {followModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black capitalize">
                                {followModal}
                            </h2>

                            <button
                                onClick={() => setFollowModal(null)}
                                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4 mt-6 max-h-[420px] overflow-y-auto">
                            {followList.length === 0 && (
                                <p className="text-zinc-500 text-sm">
                                    No {followModal} yet.
                                </p>
                            )}

                            {followList.map((item) => {
                                const person =
                                    typeof item === "string"
                                        ? null
                                        : item;

                                if (!person) return null;

                                return (
                                    <Link
                                        key={person._id}
                                        to={`/profile/${person.username}`}
                                        onClick={() => setFollowModal(null)}
                                        className="flex gap-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 hover:border-yellow-500/40 transition"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-black flex items-center justify-center overflow-hidden shrink-0">
                                            {person.profileImage?.startsWith(
                                                "http://localhost:5000/uploads/"
                                            ) ? (
                                                <img
                                                    src={person.profileImage}
                                                    alt={person.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                person.name?.charAt(0)
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="font-bold truncate">
                                                {person.name}
                                            </h3>

                                            <p className="text-yellow-600 dark:text-yellow-400 text-sm truncate">
                                                {person.handle}
                                            </p>

                                            {isOnline(person._id) ? (
                                                <p className="text-green-500 text-xs font-bold mt-1">
                                                    ● Online
                                                </p>
                                            ) : (
                                                <p className="text-zinc-400 text-xs mt-1">
                                                    ○ Offline
                                                </p>
                                            )}

                                            <p className="text-zinc-500 text-sm mt-1 line-clamp-2">
                                                {person.bio ||
                                                    "GhanaTechHub developer"}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {editOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <form
                        onSubmit={updateProfile}
                        className="w-full max-w-xl bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-6 max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-3xl font-black">Edit Profile</h2>

                        <p className="text-zinc-500 mt-2">
                            Update your GhanaTechHub identity.
                        </p>

                        <div className="space-y-5 mt-8">
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Full name"
                                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                            />

                            <textarea
                                value={editForm.bio}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        bio: e.target.value,
                                    })
                                }
                                placeholder="Bio"
                                rows="4"
                                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none resize-none focus:border-yellow-500"
                            />

                            <input
                                type="text"
                                value={editForm.location}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        location: e.target.value,
                                    })
                                }
                                placeholder="Location e.g. Accra, Ghana"
                                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                            />

                            <div>
                                <label className="block text-sm font-medium mb-3">
                                    Profile Banner
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={uploadBannerImage}
                                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none"
                                />

                                {editForm.bannerImage && (
                                    <img
                                        src={editForm.bannerImage}
                                        alt="Banner Preview"
                                        className="w-full h-32 object-cover rounded-2xl mt-4 border border-zinc-300 dark:border-zinc-700"
                                    />
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-3">
                                    Profile Photo
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={uploadProfileImage}
                                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none"
                                />

                                {uploadingImage && (
                                    <p className="text-yellow-500 text-sm mt-3">
                                        Uploading image...
                                    </p>
                                )}

                                {editForm.profileImage && (
                                    <img
                                        src={editForm.profileImage}
                                        alt="Profile Preview"
                                        className="w-24 h-24 rounded-2xl object-cover mt-4 border border-zinc-300 dark:border-zinc-700"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setEditOpen(false)}
                                className="px-5 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}