    import { useEffect, useState } from "react";

    export default function ScrollProgress() {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const updateScroll = () => {
        const currentScroll = window.scrollY;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        setScroll((currentScroll / height) * 100);
        };

        window.addEventListener("scroll", updateScroll);

        return () =>
        window.removeEventListener("scroll", updateScroll);
    }, []);

    return (
        <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 z-[100]"
        style={{ width: `${scroll}%` }}
        />
    );
    }