import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
    const { token } = useParams();
    const [status, setStatus] = useState("Verifying your email...");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/auth/verify-email/${token}`
                );

                setStatus(response.data.message);
            } catch (error) {
                setStatus(
                    error.response?.data?.message ||
                        "Email verification failed"
                );
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center">
                <h1 className="text-3xl font-black mb-4">
                    Email Verification
                </h1>

                <p className="text-zinc-600 dark:text-zinc-400">
                    {status}
                </p>

                <Link
                    to="/login"
                    className="inline-block mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold"
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
}