import {
    Code2,
    Database,
    Server,
    Globe,
    Smartphone,
    GitBranch,
} from "lucide-react";

const skills = [
    {
        title: "Frontend",
        icon: <Code2 size={28} className="text-blue-400" />,
        tech: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    },

    {
        title: "Backend",
        icon: <Server size={28} className="text-cyan-400" />,
        tech: ["Node.js", "Express", "Python", "REST APIs"],
    },

    {
        title: "Database",
        icon: <Database size={28} className="text-blue-300" />,
        tech: ["MongoDB", "MySQL", "Firebase"],
    },

    {
        title: "Tools",
        icon: <GitBranch size={28} className="text-cyan-300" />,
        tech: ["Git", "GitHub", "Vercel", "Render"],
    },

    {
        title: "Mobile",
        icon: <Smartphone size={28} className="text-blue-400" />,
        tech: ["Responsive Design", "React Native"],
    },

    {
        title: "Web",
        icon: <Globe size={28} className="text-cyan-400" />,
        tech: ["SEO", "Performance", "Deployment"],
    },
];

export default function Skills() {

    return (

        <section
            id="skills"
            className="py-32 px-6 bg-white dark:bg-[#09090b] text-black dark:text-white"
        >

            <div className="max-w-6xl mx-auto">

                <div className="mb-14">

                    <p className="text-blue-400 font-semibold mb-4">
                        Technical Expertise
                    </p>

                    <h2 className="text-5xl lg:text-6xl font-medium tracking-tight">
                        Skills
                    </h2>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {skills.map((skill) => (

                        <div
                            key={skill.title}
                            className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-8 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300"
                        >

                            <div className="mb-6">
                                {skill.icon}
                            </div>

                            <h3 className="text-2xl font-medium tracking-tight">
                                {skill.title}
                            </h3>

                            <div className="flex flex-wrap gap-3 mt-8">

                                {skill.tech.map((item) => (

                                    <span
                                        key={item}
                                        className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-700 dark:text-zinc-300"
                                    >
                                        {item}
                                    </span>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}