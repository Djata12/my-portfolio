import { useState } from "react";

export default function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
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

            const response = await fetch(
                "https://formspree.io/f/xwvzlkaj",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            if (response.ok) {

                alert("Message sent successfully!");

                setForm({
                    name: "",
                    email: "",
                    company: "",
                    message: "",
                });

            } else {

                alert("Something went wrong.");

            }

        } catch {

            alert("Error sending message.");

        }

        setLoading(false);
    };

    return (

        <section
            id="contact"
            className="py-32 px-6 fade-up bg-[#09090b] text-white"
        >

            <div className="max-w-5xl mx-auto">

                {/* HEADER */}

                <div className="text-center mb-16">

                    <p className="text-blue-400 font-semibold mb-4">
                        Work With Me
                    </p>

                    <h2 className="text-5xl lg:text-6xl font-medium tracking-normal leading-tight">
                        Let’s Build Something Amazing
                    </h2>

                    <p className="text-zinc-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
                        Have a startup idea, freelance project or developer opportunity?
                        Send me a message and I’ll get back to you quickly.
                    </p>

                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="bg-zinc-900 border border-blue-500/20 rounded-[40px] p-8 md:p-10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                >

                    {/* TOP GRID */}

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* NAME */}

                        <div>

                            <label className="block mb-3 text-zinc-300 font-semibold">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-[#09090b] border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all duration-300"
                            />

                        </div>

                        {/* EMAIL */}

                        <div>

                            <label className="block mb-3 text-zinc-300 font-semibold">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full bg-[#09090b] border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all duration-300"
                            />

                        </div>

                    </div>

                    {/* COMPANY */}

                    <div className="mt-8">

                        <label className="block mb-3 text-zinc-300 font-semibold">
                            Company / Brand
                        </label>

                        <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Startup or Company Name"
                            className="w-full bg-[#09090b] border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all duration-300"
                        />

                    </div>

                    {/* MESSAGE */}

                    <div className="mt-8">

                        <label className="block mb-3 text-zinc-300 font-semibold">
                            Project Details
                        </label>

                        <textarea
                            name="message"
                            required
                            rows="6"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project..."
                            className="w-full bg-[#09090b] border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all duration-300 resize-none"
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-10 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-5 rounded-2xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:scale-[1.01] active:scale-[0.98] transition-all duration-300"
                    >
                        {loading ? "Sending Message..." : "Send Me A Message"}
                    </button>

                </form>

            </div>

        </section>
    );
}