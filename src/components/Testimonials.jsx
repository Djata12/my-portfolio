import michael from "../assets/testimonials/michael.jpg";
import akosua from "../assets/testimonials/akosua.jpg";
import david from "../assets/testimonials/david.jpg";

const testimonials = [
    {
        name: "Michael Owusu",
        role: "Startup Founder",
        company: "Accra Digital",
        location: "Accra, Ghana",
        verified: true,
        review:
            "Benjamin delivered our dashboard faster than expected. The UI was clean, modern and highly responsive across all devices.",
        image: michael,
    },

    {
        name: "Akosua Mensah",
        role: "Product Manager",
        company: "RemoteStack Africa",
        location: "Kumasi, Ghana",
        verified: true,
        review:
            "One of the best frontend developers I’ve worked with. Excellent communication, clean code and strong React skills.",
        image: akosua,
    },

    {
        name: "David Mensah",
        role: "Tech Lead",
        company: "Ghana Tech Hub",
        location: "Tema, Ghana",
        verified: true,
        review:
            "Benjamin has strong full-stack development skills with great attention to performance, UX and scalability.",
        image: david,
    },
];

export default function Testimonials() {

    return (

        <section className="relative py-32 px-6 bg-[#09090b] text-white overflow-hidden">

            {/* BACKGROUND GLOWS */}

            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[140px] rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* HEADER */}

                <div className="text-center mb-20">

                    <p className="text-blue-400 font-semibold mb-4">
                        Testimonials
                    </p>

                    <h2 className="text-5xl lg:text-6xl font-medium tracking-tight">
                        What People Say
                    </h2>

                    <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                        Feedback from founders, startups and teams I’ve worked
                        with on modern web applications and digital products.
                    </p>

                </div>

                {/* GRID */}

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {testimonials.map((item) => (

                        <div
                            key={item.name}
                            className="group bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-8 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-3"
                        >

                            {/* TOP */}

                            <div className="flex items-center gap-4">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700 group-hover:border-blue-500/40 transition"
                                />

                                <div>

                                    <div className="flex items-center gap-2">

                                        <h3 className="text-xl font-medium tracking-tight">
                                            {item.name}
                                        </h3>

                                        {item.verified && (
                                            <span className="text-blue-400 text-sm">
                                                ✔
                                            </span>
                                        )}

                                    </div>

                                    <p className="text-blue-400 text-sm mt-1">
                                        {item.role}
                                    </p>

                                    <p className="text-zinc-500 text-sm">
                                        {item.company}
                                    </p>

                                </div>

                            </div>

                            {/* LOCATION */}

                            <div className="mt-5">

                                <span className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-300">
                                    🇬🇭 {item.location}
                                </span>

                            </div>

                            {/* STARS */}

                            <div className="flex gap-1 mt-6 text-yellow-400 text-xl">

                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>

                            </div>

                            {/* REVIEW */}

                            <p className="text-zinc-400 leading-relaxed mt-6 text-lg">
                                “{item.review}”
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}