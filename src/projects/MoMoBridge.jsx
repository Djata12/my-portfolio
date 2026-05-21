    import { useState } from "react";

    import {
    Smartphone,
    ShieldCheck,
    Wallet,
    CheckCircle2,
    } from "lucide-react";

    export default function MoMoBridge() {
    const [network, setNetwork] = useState("MTN");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        if (!phone || !amount) {
        alert("Please fill all payment fields.");
        return;
        }

        setLoading(true);

        setTimeout(() => {
        setLoading(false);

        alert(`Payment Successful!

    Network: ${network}
    Phone: ${phone}
    Amount: GHS ${amount}

    This is a demo payment gateway.
    No real charges were made.`);

        setPhone("");
        setAmount("");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
        
        {/* BACKGROUND */}

        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[120px] rounded-full"></div>

        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full"></div>

        {/* HERO */}

        <section className="relative px-6 py-24 border-b border-zinc-800 z-10">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT */}

            <div>

                <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-3 rounded-full text-sm">
                <ShieldCheck size={18} />
                Secure Mobile Money Payments
                </div>

                <h1 className="text-6xl lg:text-8xl font-medium tracking-tight mt-8 leading-none">
                MoMo
                <br />
                Bridge API
                </h1>

                <p className="text-zinc-400 text-xl leading-relaxed mt-10 max-w-2xl">
                A premium Ghanaian fintech payment gateway enabling businesses
                to accept MTN MoMo, Telecel Cash and AirtelTigo Money payments
                securely through a modern API infrastructure.
                </p>

                {/* STATS */}

                <div className="grid grid-cols-3 gap-6 mt-14">

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/30 transition">
                    <h2 className="text-3xl font-bold">
                    120K+
                    </h2>

                    <p className="text-zinc-500 mt-2 text-sm">
                    Transactions
                    </p>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 hover:border-green-500/30 transition">
                    <h2 className="text-3xl font-bold">
                    99.9%
                    </h2>

                    <p className="text-zinc-500 mt-2 text-sm">
                    Uptime
                    </p>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500/30 transition">
                    <h2 className="text-3xl font-bold">
                    GHS 2M+
                    </h2>

                    <p className="text-zinc-500 mt-2 text-sm">
                    Processed
                    </p>
                </div>

                </div>

            </div>

            {/* PAYMENT CARD */}

            <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[40px] p-10 shadow-2xl shadow-black/30">

                <div className="flex items-center gap-4 mb-10">

                <div className="bg-yellow-500/10 p-4 rounded-2xl">
                    <Wallet className="text-yellow-400" />
                </div>

                <div>
                    <h2 className="text-3xl font-medium tracking-tight">
                    Mobile Money Payment
                    </h2>

                    <p className="text-zinc-500 mt-1">
                    Demo Fintech Checkout
                    </p>
                </div>

                </div>

                {/* NETWORK */}

                <div className="mb-6">

                <label className="block text-zinc-400 mb-3">
                    Select Network
                </label>

                <select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition"
                >
                    <option>MTN</option>
                    <option>Telecel</option>
                    <option>AirtelTigo</option>
                </select>

                </div>

                {/* PHONE */}

                <div className="mb-6">

                <label className="block text-zinc-400 mb-3">
                    Mobile Money Number
                </label>

                <div className="relative">

                    <Smartphone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                    type="text"
                    placeholder="024XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-yellow-500 transition"
                    />

                </div>

                </div>

                {/* AMOUNT */}

                <div>

                <label className="block text-zinc-400 mb-3">
                    Amount
                </label>

                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition"
                />

                </div>

                {/* BUTTON */}

                <button
                onClick={handlePayment}
                className="w-full mt-10 bg-green-500 hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500/20 text-black py-5 rounded-2xl font-semibold transition duration-300"
                >
                {loading ? "Processing Payment..." : "Pay Now"}
                </button>

                {/* DISCLAIMER */}

                <div className="flex items-start gap-3 mt-6 bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl">

                <CheckCircle2
                    size={20}
                    className="text-yellow-400 mt-1"
                />

                <p className="text-sm text-zinc-300 leading-relaxed">
                    This is a demo fintech payment experience created for
                    portfolio purposes. No real mobile money charges will
                    be made.
                </p>

                </div>

            </div>

            </div>

        </section>

        </div>
    );
    }