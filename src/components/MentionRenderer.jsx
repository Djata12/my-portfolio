import { Link } from "react-router-dom";

export default function MentionRenderer({ text }) {
    if (!text) return null;

    const pattern = /(@(?:gth)?[A-Za-z0-9_]+|#[A-Za-z0-9_]+)/g;
    const parts = text.split(pattern);

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith("@")) {
                    const username = part.startsWith("@gth")
                        ? part.replace("@gth", "")
                        : part.replace("@", "");

                    return (
                        <Link
                            key={index}
                            to={`/profile/${username}`}
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-20 text-yellow-600 dark:text-yellow-400 hover:underline font-bold cursor-pointer"
                        >
                            {part}
                        </Link>
                    );
                }

                if (part.startsWith("#")) {
                    const tag = part.replace("#", "");

                    return (
                        <Link
                            key={index}
                            to={`/hashtag/${tag}`}
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-20 text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
                        >
                            {part}
                        </Link>
                    );
                }

                return <span key={index}>{part}</span>;
            })}
        </>
    );
}