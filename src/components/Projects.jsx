import { Link } from "react-router-dom";

import inventoryImg from "../assets/projects/InventoryFlow.webp";
import momoImg from "../assets/projects/MoMoBridgeAPI.webp";
import techhubImg from "../assets/projects/GhanaTechHub.webp";

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
    link: "/dashboard",
    stack: ["Community", "Networking", "React"],
},
];

export default function Projects() {

return (

<section
id="projects"
className="py-32 px-6 bg-white dark:bg-[#09090b] text-black dark:text-white"
>

<div className="max-w-7xl mx-auto">

<div className="mb-16">

<p className="text-blue-400 font-semibold mb-4">
Featured Projects
</p>

<h2 className="text-5xl lg:text-6xl font-medium tracking-normal">
Recent Work
</h2>

</div>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

{projects.map((project) => (

<div
key={project.title}
className="group relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[32px] hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500"
>

<div className="h-64 overflow-hidden">

<img
src={project.image}
alt={project.title}
className="w-full h-full object-cover"
/>

</div>

<div className="relative z-10 p-8">

<h3 className="text-3xl font-medium tracking-tight">
{project.title}
</h3>

<p className="text-zinc-600 dark:text-zinc-400 mt-5 leading-relaxed">
{project.description}
</p>

<div className="flex flex-wrap gap-3 mt-8">

{project.stack.map((item) => (

<span
key={item}
className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-700 dark:text-zinc-300"
>
{item}
</span>

))}

</div>

<Link
to={project.link}
className="block text-center mt-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-bold"
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