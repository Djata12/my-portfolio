import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {

    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (

        <button
            onClick={toggleTheme}
            className="
                fixed bottom-6 right-6 z-50
                w-14 h-14 rounded-full
                bg-white dark:bg-zinc-900
                border border-zinc-300 dark:border-zinc-700
                flex items-center justify-center
                shadow-2xl
                transition-all duration-300
                hover:scale-110
            "
        >

            {darkMode ? (

                <FaSun className="text-yellow-400 text-xl" />

            ) : (

                <FaMoon className="text-zinc-800 text-xl" />

            )}

        </button>

    );
}