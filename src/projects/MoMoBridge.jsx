import { Link } from "react-router-dom";

import {
    ShieldCheck,
    Wallet,
    CheckCircle2,
    Moon,
    CreditCard,
    Smartphone,
    ArrowLeft,
} from "lucide-react";

export default function MoMoBridge() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white overflow-hidden transition-colors duration-300">
            {/* BACKGROUND GLOWS */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[120px] rounded-full"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full"></div>

            {/* DARK MODE BUTTON */}
            <button className="fixed bottom-6 right-6 z-50 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition">
                <Moon size={20} />
            </button>

            <section className="relative px-6 py-24 border-b border-zinc-300 dark:border-zinc-800 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 mb-10 transition"
                    >
                        <ArrowLeft size={18} />
                        Back to portfolio
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* LEFT SIDE */}
                        <div>
                            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-500 dark:text-green-400 px-5 py-3 rounded-full text-sm">
                                <ShieldCheck size={18} />
                                Secure Mobile Money Payments
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mt-8 leading-none">
                                MoMo
                                <br />
                                Bridge API
                            </h1>

                            <p className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl leading-relaxed mt-10 max-w-2xl">
                                A premium Ghanaian fintech payment gateway concept
                                built to support MTN MoMo, Telecel Cash,
                                AirtelTigo Money, and card payments through a
                                modern API-driven checkout experience.
                            </p>

                            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mt-6 max-w-2xl">
                                The demo has now evolved into a real Paystack-powered
                                Support My Work checkout, allowing visitors to
                                support my projects securely.
                            </p>

                            {/* STATS */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
                                <div className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-6 overflow-hidden hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300">
                                    <h2 className="text-2xl sm:text-3xl font-bold break-words leading-tight">
                                        Paystack
                                    </h2>
                                    <p className="text-zinc-500 mt-2 text-sm">
                                        Integration
                                    </p>
                                </div>

                                <div className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-6 overflow-hidden hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
                                    <h2 className="text-2xl sm:text-3xl font-bold break-words leading-tight">
                                        GHS
                                    </h2>
                                    <p className="text-zinc-500 mt-2 text-sm">
                                        Mobile Money
                                    </p>
                                </div>

                                <div className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-6 overflow-hidden hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300">
                                    <h2 className="text-2xl sm:text-3xl font-bold break-words leading-tight">
                                        Live
                                    </h2>
                                    <p className="text-zinc-500 mt-2 text-sm">
                                        Checkout
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="bg-zinc-100 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-300 dark:border-zinc-800 rounded-[40px] p-6 sm:p-10 shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden transition-all duration-300">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="bg-yellow-500/10 p-4 rounded-2xl">
                                    <Wallet className="text-yellow-500 dark:text-yellow-400" />
                                </div>

                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
                                        Live Support Checkout
                                    </h2>

                                    <p className="text-zinc-500 mt-1">
                                        Powered by Paystack
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-2xl p-5">
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="text-green-500" />
                                        <div>
                                            <h3 className="font-semibold">
                                                Mobile Money Support
                                            </h3>
                                            <p className="text-zinc-500 text-sm mt-1">
                                                Designed for Ghanaian payment flows.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-2xl p-5">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="text-blue-500" />
                                        <div>
                                            <h3 className="font-semibold">
                                                Card & Digital Payments
                                            </h3>
                                            <p className="text-zinc-500 text-sm mt-1">
                                                Supports secure online checkout through Paystack.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/support"
                                    className="w-full bg-green-500 hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500/20 text-black py-5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center"
                                >
                                    Open Live Support Checkout
                                </Link>
                            </div>

                            <div className="flex items-start gap-3 mt-6 bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl">
                                <CheckCircle2
                                    size={20}
                                    className="text-yellow-500 dark:text-yellow-400 mt-1 flex-shrink-0"
                                />

                                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                    This project now powers a live Support My Work checkout using Paystack.
                                    Visitors can support my work securely through a real payment flow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}