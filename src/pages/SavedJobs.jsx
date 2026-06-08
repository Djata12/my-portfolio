import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Bookmark } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function SavedJobs() {
    const [jobs, setJobs] = useState([]);

    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchSavedJobs = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/jobs/saved`,
                authConfig
            );

            setJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadSavedJobs = async () => {
            await fetchSavedJobs();
        };
    
        loadSavedJobs();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-4 sm:px-6 py-8">
            <div className="max-w-5xl mx-auto">
                <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to jobs
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-black flex items-center justify-center">
                        <Bookmark size={26} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-black">
                            Saved Jobs
                        </h1>

                        <p className="text-zinc-500 mt-1">
                            Jobs you bookmarked for later.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    {jobs.length === 0 && (
                        <div className="col-span-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                            No saved jobs yet.
                        </div>
                    )}

                    {jobs.map((job) => (
                        <article
                            key={job._id}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6"
                        >
                            <h2 className="text-2xl font-black">
                                {job.title}
                            </h2>

                            <p className="text-yellow-600 dark:text-yellow-400 font-semibold mt-1">
                                {job.company}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4 text-sm">
                                <span className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-full px-3 py-1">
                                    {job.location || "Remote"}
                                </span>

                                <span className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-full px-3 py-1">
                                    {job.jobType}
                                </span>

                                {job.salary && (
                                    <span className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-full px-3 py-1">
                                        {job.salary}
                                    </span>
                                )}
                            </div>

                            {job.skills?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {job.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full px-3 py-1 text-sm font-bold"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <p className="text-zinc-700 dark:text-zinc-300 mt-5 whitespace-pre-wrap">
                                {job.description}
                            </p>

                            <div className="flex items-center justify-between gap-4 mt-6">
                                <p className="text-sm text-zinc-500">
                                    Posted by {job.postedBy?.handle}
                                </p>

                                {job.applyLink && (
                                    <a
                                        href={
                                            job.applyLink.startsWith("http")
                                                ? job.applyLink
                                                : `mailto:${job.applyLink}`
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-2xl font-bold"
                                    >
                                        Apply
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}