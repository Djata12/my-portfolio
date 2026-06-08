import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

    if (token) {
        navigate("/dashboard");
    }

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "developer",
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
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                form
            );

            alert("Account created successfully!");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-6 py-12 flex items-center justify-center transition-colors duration-300">

            <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-6 sm:p-8 shadow-xl">

                <h1 className="text-4xl font-bold tracking-tight">
                    Create Account
                </h1>

                <p className="text-zinc-600 dark:text-zinc-400 mt-3">
                    Join GhanaTechHub and connect with developers across Ghana.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                    />

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

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                    >
                        <option value="developer">Developer</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="startup">Startup</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-bold transition"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="text-center text-zinc-600 dark:text-zinc-400 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-yellow-500 font-semibold">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}