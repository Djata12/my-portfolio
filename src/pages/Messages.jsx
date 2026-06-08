import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ArrowLeft, Mail, Send } from "lucide-react";
import MentionRenderer from "../components/MentionRenderer";

const socket = io(import.meta.env.VITE_API_URL);
const API_URL = import.meta.env.VITE_API_URL;

export default function Messages() {
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [typingUser, setTypingUser] = useState(null);
    const [onlineUserIds, setOnlineUserIds] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editedText, setEditedText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const typingTimeoutRef = useRef(null);
    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const getId = (value) => {
        if (!value) return "";
        return value._id || value;
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/auth/profile`,
                authConfig
            );

            setCurrentUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchConversations = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/messages/conversations`,
                authConfig
            );

            setConversations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const openConversation = async (conversation) => {
        setActiveConversation(conversation);
        socket.emit("join-conversation", conversation._id);

        try {
            const response = await axios.get(
                `${API_URL}/api/messages/${conversation._id}`,
                authConfig
            );

            setMessages(response.data);

            await axios.put(
                `${API_URL}/api/messages/${conversation._id}/read`,
                {},
                authConfig
            );

            setConversations((prev) =>
                prev.map((item) =>
                    item._id === conversation._id
                        ? { ...item, unreadCount: 0 }
                        : item
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const uploadMessageImage = async (file) => {
        try {
            setUploadingImage(true);

            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post(
                `${API_URL}/api/uploads/message-image`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUploadingImage(false);
            return response.data.imageUrl;
        } catch (error) {
            setUploadingImage(false);
            console.log(error);
            return null;
        }
    };
    
    const uploadMessageFile = async (selectedFile) => {
        try {
            setUploadingFile(true);
    
            const formData = new FormData();
            formData.append("file", selectedFile);
    
            const response = await axios.post(
                `${API_URL}/api/uploads/message-file`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            setUploadingFile(false);
    
            return {
                url: response.data.fileUrl,
                name: response.data.fileName,
                type: response.data.fileType,
                size: response.data.fileSize,
            };
        } catch (error) {
            setUploadingFile(false);
            console.log(error);
            return null;
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if ((!text.trim() && !image && !file) || !activeConversation) return;

        try {
            let imageUrl = "";
            let uploadedFile = null;

            if (image) {
                imageUrl = await uploadMessageImage(image);
            }
            if (file && image) {
                alert("Please send either an image or a file, not both.");
                return;
            }
            
            if (file) {
                uploadedFile = await uploadMessageFile(file);
            }

            await axios.post(
                `${API_URL}/api/messages/${activeConversation._id}`,
                {
                    text,
                    image: imageUrl,
                    file: uploadedFile,
                },
                authConfig
            );

            setText("");
            setImage(null);
            setFile(null);
            setTypingUser(null);
            fetchConversations();

            socket.emit("stop-typing", {
                conversationId: activeConversation._id,
            });
        } catch (error) {
            alert(error.response?.data?.message || "Unable to send message");
        }
    };
    
    const editMessage = async (messageId) => {
        try {
            await axios.put(
                `${API_URL}/api/messages/message/${messageId}/edit`,
                {
                    text: editedText,
                },
                authConfig
            );
    
            setEditingMessageId(null);
            setEditedText("");
        } catch (error) {
            alert(error.response?.data?.message || "Unable to edit message");
        }
    };
    
    const deleteMessage = async (messageId) => {
        const confirmDelete = window.confirm("Delete this message?");
    
        if (!confirmDelete) return;
    
        try {
            await axios.delete(
                `${API_URL}/api/messages/message/${messageId}`,
                authConfig
            );
        } catch (error) {
            alert(error.response?.data?.message || "Unable to delete message");
        }
    };

    const reactToMessage = async (messageId, emoji) => {
        try {
            await axios.put(
                `${API_URL}/api/messages/message/${messageId}/reaction`,
                { emoji },
                authConfig
            );
        } catch (error) {
            console.log(error);
        }
    };
    
    const searchMessages = async (value) => {
        setSearchTerm(value);
    
        if (!value.trim() || !activeConversation) {
            setSearchResults([]);
            return;
        }
    
        try {
            const response = await axios.get(
                `${API_URL}/api/messages/${activeConversation._id}/search?q=${value}`,
                authConfig
            );
    
            setSearchResults(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getOtherParticipant = (conversation) => {
        return conversation.participants.find(
            (person) => person._id !== currentUser?._id
        );
    };

    useEffect(() => {
        const loadMessages = async () => {
            await fetchCurrentUser();
            await fetchConversations();
        };

        loadMessages();
    }, []);

    useEffect(() => {
        if (!currentUser?._id) return;

        socket.emit("user-online", currentUser._id);
        socket.emit("join-user-room", currentUser._id);
    }, [currentUser]);

    useEffect(() => {
        const handleNewMessage = (message) => {
            if (getId(message.conversation) === activeConversation?._id) {
                setMessages((prev) => {
                    const exists = prev.some((item) => item._id === message._id);

                    if (exists) return prev;

                    return [...prev, message];
                });
            }

            fetchConversations();
        };

        const handleTyping = ({ conversationId, user }) => {
            if (
                conversationId === activeConversation?._id &&
                user?._id !== currentUser?._id
            ) {
                setTypingUser(user);
            }
        };

        const handleStopTyping = ({ conversationId }) => {
            if (conversationId === activeConversation?._id) {
                setTypingUser(null);
            }
        };

        const handleMessagesRead = ({ conversationId, userId }) => {
            if (conversationId === activeConversation?._id) {
                setMessages((prev) =>
                    prev.map((message) => {
                        const alreadyRead = message.readBy?.some(
                            (id) => getId(id) === userId
                        );

                        if (alreadyRead) return message;

                        return {
                            ...message,
                            readBy: [...(message.readBy || []), userId],
                        };
                    })
                );
            }
        };

        const handleMessageReaction = (updatedMessage) => {
            setMessages((prev) =>
                prev.map((message) =>
                    message._id === updatedMessage._id
                        ? updatedMessage
                        : message
                )
            );
        };
        
        const handleMessageDeleted = ({ messageId }) => {
            setMessages((prev) =>
                prev.filter((message) => message._id !== messageId)
            );
        
            fetchConversations();
        };
        
        const handleMessageEdited = (updatedMessage) => {
            setMessages((prev) =>
                prev.map((message) =>
                    message._id === updatedMessage._id
                        ? updatedMessage
                        : message
                )
            );
        };

        socket.on("new-message", handleNewMessage);
        socket.on("typing", handleTyping);
        socket.on("stop-typing", handleStopTyping);
        socket.on("messages-read", handleMessagesRead);
        socket.on("message-reaction", handleMessageReaction);
        socket.on("message-deleted", handleMessageDeleted);
        socket.on("message-edited", handleMessageEdited);

        return () => {
            socket.off("new-message", handleNewMessage);
            socket.off("typing", handleTyping);
            socket.off("stop-typing", handleStopTyping);
            socket.off("messages-read", handleMessagesRead);
            socket.off("message-reaction", handleMessageReaction);
            socket.off("message-deleted", handleMessageDeleted);
            socket.off("message-edited", handleMessageEdited);
        };
    }, [activeConversation, currentUser]);

    useEffect(() => {
        if (!activeConversation?._id) return;

        socket.emit("join-conversation", activeConversation._id);
    }, [activeConversation]);

    useEffect(() => {
        const handleOnlineUsersList = (ids) => {
            setOnlineUserIds(ids);
        };

        socket.on("online-users-list", handleOnlineUsersList);

        return () => {
            socket.off("online-users-list", handleOnlineUsersList);
        };
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
                        <Mail size={26} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-black">
                            Direct Messages
                        </h1>

                        <p className="text-zinc-500 mt-1">
                            Private conversations with GhanaTechHub developers.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[320px_1fr] gap-6">
                    <aside className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-4 h-fit">
                        <h2 className="font-black text-xl mb-4">Inbox</h2>

                        <div className="space-y-3">
                            {conversations.length === 0 && (
                                <p className="text-zinc-500 text-sm">
                                    No conversations yet.
                                </p>
                            )}

                            {conversations.map((conversation) => {
                                const otherUser =
                                    getOtherParticipant(conversation);

                                return (
                                    <button
                                        key={conversation._id}
                                        onClick={() =>
                                            openConversation(conversation)
                                        }
                                        className={`w-full text-left rounded-2xl p-4 border transition ${
                                            activeConversation?._id ===
                                            conversation._id
                                                ? "bg-yellow-500/10 border-yellow-500/40"
                                                : "bg-white dark:bg-[#09090b] border-zinc-300 dark:border-zinc-800 hover:border-yellow-500/40"
                                        }`}
                                    >
                                        <div className="flex gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black overflow-hidden shrink-0">
                                        {otherUser?.profileImage?.startsWith(`${API_URL}/uploads/`) ? (
                                            <img
                                                src={otherUser.profileImage}
                                                alt={otherUser.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            otherUser?.name?.charAt(0) || "U"
                                        )}
                                    </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-3">
                                                    <h3 className="font-bold truncate">
                                                        {otherUser?.name}
                                                    </h3>

                                                    {conversation.unreadCount >
                                                        0 && (
                                                        <span className="bg-blue-500 text-white text-xs font-black min-w-6 h-6 px-2 rounded-full flex items-center justify-center">
                                                            {
                                                                conversation.unreadCount
                                                            }
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-yellow-600 dark:text-yellow-400 text-sm truncate">
                                                    {otherUser?.handle}
                                                </p>

                                                {onlineUserIds.includes(
                                                    otherUser?._id
                                                ) ? (
                                                    <p className="text-green-500 text-xs font-bold mt-1">
                                                        ● Online
                                                    </p>
                                                ) : (
                                                    <p className="text-zinc-400 text-xs mt-1">
                                                        ○ Offline
                                                    </p>
                                                )}

                                                <p className="text-zinc-500 text-sm truncate mt-1">
                                                    {conversation.lastMessage ||
                                                        "No messages yet"}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <main className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] overflow-hidden min-h-[600px] flex flex-col">
                        {!activeConversation ? (
                            <div className="flex-1 flex items-center justify-center text-center p-8">
                                <div>
                                    <Mail
                                        size={40}
                                        className="mx-auto text-zinc-500 mb-4"
                                    />

                                    <h2 className="text-2xl font-black">
                                        Select a conversation
                                    </h2>

                                    <p className="text-zinc-500 mt-2">
                                        Choose a developer from your inbox to
                                        start chatting.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-5 border-b border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#09090b]">
                                    {(() => {
                                        const otherUser =
                                            getOtherParticipant(
                                                activeConversation
                                            );

                                        return (
                                            <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black overflow-hidden">
                                        {otherUser?.profileImage?.startsWith(`${API_URL}/uploads/`) ? (
                                            <img
                                                src={otherUser.profileImage}
                                                alt={otherUser.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            otherUser?.name?.charAt(0) || "U"
                                        )}
                                    </div>

                                                <div>
                                                    <h2 className="font-black">
                                                        {otherUser?.name}
                                                    </h2>

                                                    <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                                                        {otherUser?.handle}
                                                    </p>

                                                    {onlineUserIds.includes(
                                                        otherUser?._id
                                                    ) ? (
                                                        <p className="text-green-500 text-xs font-bold mt-1">
                                                            ● Online
                                                        </p>
                                                    ) : (
                                                        <p className="text-zinc-400 text-xs mt-1">
                                                            ○ Offline
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                                <div className="p-4 border-b border-zinc-300 dark:border-zinc-800">
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchTerm}
                                    onChange={(e) => searchMessages(e.target.value)}
                                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
                                />
                            </div>

                                <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                                    {messages.length === 0 && (
                                        <p className="text-zinc-500 text-center mt-10">
                                            No messages yet. Start the
                                            conversation.
                                        </p>
                                    )}

                                    {(searchTerm ? searchResults : messages).map((message) => {
                                        const isMine =
                                            message.sender?._id ===
                                            currentUser?._id;

                                        const isRead =
                                            message.readBy?.some(
                                                (id) =>
                                                    getId(id) !==
                                                    currentUser?._id
                                            ) || false;

                                        return (
                                            <div
                                                key={message._id}
                                                className={`flex ${
                                                    isMine
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                                                        isMine
                                                            ? "bg-yellow-500 text-black"
                                                            : "bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800"
                                                    }`}
                                                >
                                                {message.image && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedImage(message.image)}
                                                        className="block"
                                                    >
                                                        <img
                                                            src={message.image}
                                                            alt="message"
                                                            className="rounded-xl mb-2 max-w-xs cursor-pointer hover:opacity-90 transition"
                                                        />
                                                    </button>
                                                )}

                                            {editingMessageId === message._id ? (
                                            <div className="space-y-2">
                                                <input
                                                    value={editedText}
                                                    onChange={(e) => setEditedText(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border bg-white text-black"
                                                />

                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => editMessage(message._id)}
                                                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs"
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditingMessageId(null);
                                                            setEditedText("");
                                                        }}
                                                        className="bg-zinc-500 text-white px-3 py-1 rounded-lg text-xs"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                        <>
                                            {message.file?.url && (
                                                <a
                                                    href={message.file.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="block bg-zinc-200 dark:bg-zinc-800 rounded-xl p-3 mb-2 text-sm hover:underline"
                                                >
                                                    <div className="font-bold break-all">
                                                    {message.file.name?.endsWith(".pdf")
                                                        ? "📄"
                                                        : message.file.name?.endsWith(".doc") ||
                                                        message.file.name?.endsWith(".docx")
                                                        ? "📝"
                                                        : message.file.name?.endsWith(".zip")
                                                        ? "🗜"
                                                        : "📎"}{" "}
                                                    {message.file.name || "Attachment"}
                                                </div>

                                                <div className="text-xs opacity-70 mt-1">
                                                    {message.file.type || "File"}
                                                </div>
                                                </a>
                                            )}

                                            {message.text && (
                                            <p className="whitespace-pre-wrap">
                                                <MentionRenderer text={message.text} />
                                            </p>
                                        )}
                                        </>
                                    )}

                                                    <div className="flex gap-2 mt-3 flex-wrap">
                                                        {[
                                                            "👍",
                                                            "❤️",
                                                            "😂",
                                                            "🔥",
                                                            "🎉",
                                                        ].map((emoji) => {
                                                            const count =
                                                                message.reactions?.filter(
                                                                    (
                                                                        reaction
                                                                    ) =>
                                                                        reaction.emoji ===
                                                                        emoji
                                                                ).length || 0;

                                                            const reacted =
                                                                message.reactions?.some(
                                                                    (
                                                                        reaction
                                                                    ) =>
                                                                        reaction.emoji ===
                                                                            emoji &&
                                                                        getId(
                                                                            reaction.user
                                                                        ) ===
                                                                            currentUser?._id
                                                                ) || false;

                                                            return (
                                                                <button
                                                                    key={emoji}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        reactToMessage(
                                                                            message._id,
                                                                            emoji
                                                                        )
                                                                    }
                                                                    className={`text-sm rounded-full px-2 py-1 border transition ${
                                                                        reacted
                                                                            ? "bg-blue-500 text-white border-blue-500"
                                                                            : "bg-transparent border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                                                    }`}
                                                                >
                                                                    {emoji}{" "}
                                                                    {count > 0
                                                                        ? count
                                                                        : ""}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    {isMine && (
                                                    <div className="flex gap-3 mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingMessageId(message._id);
                                                                setEditedText(message.text || "");
                                                            }}
                                                            className="text-xs text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => deleteMessage(message._id)}
                                                            className="text-xs text-red-500 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}

                                                    <p
                                                        className={`text-xs mt-2 ${
                                                            isMine
                                                                ? "text-black/60"
                                                                : "text-zinc-500"
                                                        }`}
                                                    >
                                                    {message.edited && (
                                                        <span className="mr-2 italic">
                                                            (edited)
                                                        </span>
                                                    )}
                                                    
                                                        {new Date(
                                                            message.createdAt
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}

                                                        {isMine && (
                                                            <span className="ml-2">
                                                                {isRead
                                                                    ? "✓✓ Read"
                                                                    : "✓ Sent"}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {typingUser && (
                                    <div className="px-5 pb-2 text-sm text-zinc-500">
                                        {typingUser.name} is typing...
                                    </div>
                                )}

                                {image && (
                                    <div className="px-5 pb-3">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="preview"
                                            className="w-40 rounded-xl border"
                                        />
                                    </div>
                                )}
                                {file && (
                                    <div className="px-5 pb-3">
                                        <div className="inline-flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-4 py-3 rounded-2xl text-sm">
                                            📎 {file.name}
                                        </div>
                                    </div>
                                )}
                                {uploadingFile && (
                                    <p className="px-5 pb-2 text-sm text-yellow-600">
                                        Uploading file...
                                    </p>
                                )}

                                {uploadingImage && (
                                    <p className="px-5 pb-2 text-sm text-yellow-600">
                                        Uploading image...
                                    </p>
                                )}

                                <form
                                    onSubmit={sendMessage}
                                    className="p-4 border-t border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#09090b] flex gap-3"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                        className="hidden"
                                        id="message-image"
                                    />
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="hidden"
                                        id="message-file"
                                    />

                                    <label
                                        htmlFor="message-file"
                                        className="cursor-pointer bg-zinc-200 dark:bg-zinc-800 px-4 py-3 rounded-2xl"
                                    >
                                        📎
                                    </label>

                                    <label
                                        htmlFor="message-image"
                                        className="cursor-pointer bg-zinc-200 dark:bg-zinc-800 px-4 py-3 rounded-2xl"
                                    >
                                        📷
                                    </label>

                                    <input
                                        value={text}
                                        onChange={(e) => {
                                            setText(e.target.value);

                                            if (
                                                !activeConversation ||
                                                !currentUser
                                            )
                                                return;

                                            socket.emit("typing", {
                                                conversationId:
                                                    activeConversation._id,
                                                user: {
                                                    _id: currentUser._id,
                                                    name: currentUser.name,
                                                    handle: currentUser.handle,
                                                },
                                            });

                                            if (typingTimeoutRef.current) {
                                                clearTimeout(
                                                    typingTimeoutRef.current
                                                );
                                            }

                                            typingTimeoutRef.current =
                                                setTimeout(() => {
                                                    socket.emit(
                                                        "stop-typing",
                                                        {
                                                            conversationId:
                                                                activeConversation._id,
                                                        }
                                                    );
                                                }, 1200);
                                        }}
                                        placeholder="Write a message..."
                                        className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-3 outline-none focus:border-yellow-500"
                                    />

                                    <button
                                        type="submit"
                                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold flex items-center gap-2"
                                    >
                                        <Send size={18} />
                                        Send
                                    </button>
                                </form>
                            </>
                        )}
                    </main>
                </div>
            </div>
                    {selectedImage && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center text-2xl"
                >
                    ×
                </button>

                <img
                    src={selectedImage}
                    alt="Full view"
                    className="max-w-full max-h-[90vh] rounded-2xl object-contain"
                />
            </div>
        )}
        </div>
        
    );
}