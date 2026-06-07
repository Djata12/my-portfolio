import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                { email }
            );

            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                    "Unable to process request"
            );
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white flex items-center justify-center px-4">
            <form
                onSubmit={submitHandler}
                className="max-w-md w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8"
            >
                <h1 className="text-3xl font-black">
                    Forgot Password
                </h1>

                <p className="text-zinc-500 mt-2">
                    Enter your email and we’ll send a reset link.
                </p>

                {message && (
                    <p className="mt-5 text-sm text-yellow-600 dark:text-yellow-400">
                        {message}
                    </p>
                )}

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full mt-6 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full mt-5 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold"
                >
                    Send Reset Link
                </button>

                <Link
                    to="/login"
                    className="block text-center mt-5 text-zinc-500 hover:text-yellow-500"
                >
                    Back to login
                </Link>
            </form>
        </div>
    );
}