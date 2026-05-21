import { Link } from "react-router-dom";

import inventoryImg from "../assets/projects/InventoryFlow.png";
import momoImg from "../assets/projects/MoMoBridgeAPI.png";
import techhubImg from "../assets/projects/GhanaTechHub.png";

const projects = [
{
    title: "InventoryFlow",
    description:
    "Modern inventory management platform with shopping cart, analytics and MoMo checkout.",
    image: inventoryImg,
    link: "/projects/inventoryflow",
    stack: ["React", "Tailwind", "Inventory System"],
},

{
    title: "MoMoBridge API",
    description:
    "Premium Ghanaian fintech payment gateway for MTN MoMo, Telecel Cash and AirtelTigo.",
    image: momoImg,
    link: "/projects/momobridge",
    stack: ["Fintech", "API", "Mobile Money"],
},

{
    title: "Ghana Tech Hub",
    description:
    "Developer community platform connecting Ghanaian engineers, designers and startups.",
    image: techhubImg,
    link: "/projects/ghanatechhub",
    stack: ["Community", "Networking", "React"],
},
];

export default function Projects() {
return (
    <section
    id="projects"
    className="py-32 px-6 fade-up bg-[#09090b] text-white"
    >
    <div className="max-w-7xl mx-auto animate-fade-up">

        {/* HEADER */}

        <div className="mb-16 animate-fadeIn">

        <p className="text-blue-400 font-semibold mb-4">
            Featured Projects
        </p>

        <h2 className="text-5xl lg:text-6xl font-medium tracking-normal">
            Recent Work
        </h2>

        </div>

        {/* PROJECT GRID */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {projects.map((project) => (

            <div
            key={project.title}
            className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-[32px] hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500"
            >

            {/* HOVER GLOW */}

            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition duration-500 pointer-events-none"></div>

            {/* IMAGE */}

            <div className="h-64 overflow-hidden">

                <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

            </div>

            {/* CONTENT */}

            <div className="relative z-10 p-8">

            <h3 className="text-3xl font-medium tracking-tight">
                {project.title}
            </h3>

                <p className="text-zinc-400 mt-5 leading-relaxed">
                {project.description}
                </p>

                {/* STACK */}

                <div className="flex flex-wrap gap-3 mt-8">

                {project.stack.map((item) => (

                    <span
                    key={item}
                    className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-300"
                    >
                    {item}
                    </span>

                ))}

                </div>

                {/* BUTTON */}

                <Link
                to={project.link}
                className="block text-center mt-10 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                View Project
                </Link>

            </div>

            </div>

        ))}

        </div>

    </div>
    </section>
);
}