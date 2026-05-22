import {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaDocker,
} from "react-icons/fa";

import {
    SiJavascript,
    SiTailwindcss,
    SiExpress,
    SiMongodb,
    SiFirebase,
    SiRender,
    SiVercel,
} from "react-icons/si";

export default function Experience() {

    const experiences = [

        {
            year: "2025",
            title: "Freelance Full-Stack Developer",
            company: "Remote • Self-Employed",
            description:
                "Building modern web applications, APIs, dashboards and scalable digital products for startups and businesses.",
            stack: [
                {
                    name: "React",
                    icon: <FaReact className="text-cyan-400" />,
                },

                {
                    name: "Node.js",
                    icon: <FaNodeJs className="text-green-500" />,
                },

                {
                    name: "MongoDB",
                    icon: <SiMongodb className="text-green-400" />,
                },

                {
                    name: "Tailwind",
                    icon: <SiTailwindcss className="text-sky-400" />,
                },
            ],
        },

        {
            year: "2024",
            title: "Frontend & Backend Projects",
            company: "Personal Development",
            description:
                "Developed scalable full-stack applications including fintech systems, inventory platforms and developer communities.",
            stack: [
                {
                    name: "JavaScript",
                    icon: <SiJavascript className="text-yellow-400" />,
                },

                {
                    name: "Express",
                    icon: <SiExpress className="text-zinc-300" />,
                },

                {
                    name: "Firebase",
                    icon: <SiFirebase className="text-orange-400" />,
                },

                {
                    name: "APIs",
                    icon: <FaNodeJs className="text-green-500" />,
                },
            ],
        },

        {
            year: "2023",
            title: "Backend Engineering Journey",
            company: "Self Learning",
            description:
                "Focused on backend architecture, authentication systems and scalable API development.",
            stack: [
                {
                    name: "Node.js",
                    icon: <FaNodeJs className="text-green-500" />,
                },

                {
                    name: "MongoDB",
                    icon: <SiMongodb className="text-green-400" />,
                },

                {
                    name: "Vercel",
                    icon: <SiVercel className="text-white" />,
                },

                {
                    name: "Render",
                    icon: <SiRender className="text-purple-400" />,
                },
            ],
        },

        {
            year: "2022",
            title: "Frontend Development",
            company: "Web Development",
            description:
                "Started building responsive websites and interactive user interfaces using modern frontend technologies.",
            stack: [
                {
                    name: "HTML",
                    icon: <FaHtml5 className="text-orange-500" />,
                },

                {
                    name: "CSS",
                    icon: <FaCss3Alt className="text-blue-400" />,
                },

                {
                    name: "JavaScript",
                    icon: <SiJavascript className="text-yellow-400" />,
                },

                {
                    name: "React",
                    icon: <FaReact className="text-cyan-400" />,
                },
            ],
        },
    ];

    return (

        <section
            id="experience"
            className="relative py-32 px-6 bg-[#09090b] text-white overflow-hidden"
        >

            {/* GLOWS */}

            <div className="absolute top-0 left-[-120px] w-[400px] h-[400px] bg-blue-500/10 blur-[90px] rounded-full"></div>

            <div className="absolute bottom-0 right-[-120px] w-[400px] h-[400px] bg-cyan-500/10 blur-[90px] rounded-full"></div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* HEADER */}

                <div className="text-center mb-24">

                    <p className="text-blue-400 font-semibold mb-4">
                        Experience & Journey
                    </p>

                    <h2 className="text-5xl lg:text-6xl font-medium tracking-tight">
                        My Developer Path
                    </h2>

                    <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                        Building modern applications, scalable APIs and premium digital experiences.
                    </p>

                </div>

                {/* TIMELINE */}

                <div className="relative">

                    {/* CENTER LINE */}

                    <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-zinc-800 -translate-x-1/2"></div>

                    <div className="space-y-16">

                        {experiences.map((item, index) => (

                            <div
                                key={index}
                                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                                    index % 2 === 0
                                        ? "md:flex-row"
                                        : "md:flex-row-reverse"
                                }`}
                            >

                                {/* TIMELINE DOT */}

                                <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-[#09090b] -translate-x-1/2 shadow-lg shadow-blue-500/40"></div>

                                {/* CARD */}

                                <div className="w-[calc(100%-4rem)] md:w-[46%] ml-14 md:ml-0">

                                    <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl sm:rounded-[32px] p-8 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transform-gpu transition-all duration-300">

                                        {/* YEAR */}

                                        <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
                                            {item.year}
                                        </div>

                                        {/* TITLE */}

                                        <h3 className="text-3xl font-medium tracking-tight">
                                            {item.title}
                                        </h3>

                                        {/* COMPANY */}

                                        <p className="text-cyan-400 mt-3 font-medium">
                                            {item.company}
                                        </p>

                                        {/* DESCRIPTION */}

                                        <p className="text-zinc-400 mt-6 leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* STACK */}

                                        <div className="flex flex-wrap gap-3 mt-8">

                                            {item.stack.map((tech) => (

                                                <div
                                                    key={tech.name}
                                                    className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-300 hover:border-blue-500/30 transition"
                                                >

                                                    <span className="text-lg">
                                                        {tech.icon}
                                                    </span>

                                                    <span>
                                                        {tech.name}
                                                    </span>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}