import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

    if (token) {
        navigate("/dashboard");
    }

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                form
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-6 py-12 flex items-center justify-center transition-colors duration-300">

            <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-6 sm:p-8 shadow-xl">

                <h1 className="text-4xl font-bold tracking-tight">
                    Welcome Back
                </h1>

                <p className="text-zinc-600 dark:text-zinc-400 mt-3">
                    Login to continue building your GhanaTechHub profile.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                    />
                    

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                    />
                    
                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-bold transition"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                </form>

                <p className="text-center text-zinc-600 dark:text-zinc-400 mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-yellow-500 font-semibold">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}