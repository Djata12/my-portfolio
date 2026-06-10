import { useState } from "react";
import axios from "axios";
import { ArrowLeft, Coffee, Heart, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Support() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        amount: 20,
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const chooseAmount = (amount) => {
        setForm({ ...form, amount });
    };

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
                `${API_URL}/api/support/initialize`,
                form
            );

            window.location.href = response.data.authorizationUrl;
        } catch (error) {
            alert(error.response?.data?.message || "Unable to start payment");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-4 sm:px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 mb-8"
                >
                    <ArrowLeft size={18} />
                    Back to portfolio
                </Link>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <section className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-8">
                        <div className="w-16 h-16 rounded-3xl bg-yellow-500 text-black flex items-center justify-center mb-6">
                            <Heart size={30} />
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-black">
                            Support My Work
                        </h1>

                        <p className="text-zinc-600 dark:text-zinc-400 mt-5 leading-relaxed">
                            If my projects, portfolio work, or GhanaTechHub have inspired or helped you, you can support future development with a small contribution.
                        </p>

                        <p className="text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                            Every contribution helps me build better tools, improve GhanaTechHub, and create more useful digital products for developers and startups.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-4 mt-8">
                            <button
                                type="button"
                                onClick={() => chooseAmount(20)}
                                className={`rounded-3xl p-5 border text-left ${
                                    Number(form.amount) === 20
                                        ? "bg-yellow-500 text-black border-yellow-500"
                                        : "bg-white dark:bg-[#09090b] border-zinc-300 dark:border-zinc-800"
                                }`}
                            >
                                <Coffee size={24} />
                                <p className="font-black mt-4">Coffee</p>
                                <p className="text-sm opacity-75">GHS 20</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => chooseAmount(50)}
                                className={`rounded-3xl p-5 border text-left ${
                                    Number(form.amount) === 50
                                        ? "bg-yellow-500 text-black border-yellow-500"
                                        : "bg-white dark:bg-[#09090b] border-zinc-300 dark:border-zinc-800"
                                }`}
                            >
                                <Rocket size={24} />
                                <p className="font-black mt-4">Project Boost</p>
                                <p className="text-sm opacity-75">GHS 50</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => chooseAmount(100)}
                                className={`rounded-3xl p-5 border text-left ${
                                    Number(form.amount) === 100
                                        ? "bg-yellow-500 text-black border-yellow-500"
                                        : "bg-white dark:bg-[#09090b] border-zinc-300 dark:border-zinc-800"
                                }`}
                            >
                                <Heart size={24} />
                                <p className="font-black mt-4">Sponsor</p>
                                <p className="text-sm opacity-75">GHS 100</p>
                            </button>
                        </div>
                    </section>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-8 space-y-5"
                    >
                        <h2 className="text-3xl font-black">
                            Make a Contribution
                        </h2>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                        />

                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            required
                            className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                        />

                        <input
                            name="amount"
                            type="number"
                            min="1"
                            value={form.amount}
                            onChange={handleChange}
                            placeholder="Amount in GHS"
                            required
                            className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                        />

                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Optional message"
                            className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none resize-none focus:border-yellow-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-black transition"
                        >
                            {loading ? "Opening Paystack..." : "Support Benjamin"}
                        </button>

                        <p className="text-xs text-zinc-500 text-center">
                            Secure payment powered by Paystack.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}