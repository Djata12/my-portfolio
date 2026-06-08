import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Briefcase, Trash2, X } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [search, setSearch] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("All");
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");

    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        jobType: "Full-time",
        salary: "",
        skills: "",
        description: "",
        applyLink: "",
    });

    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/auth/profile`,
                authConfig
            );

            setCurrentUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSavedJobs = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/jobs/saved`,
                authConfig
            );

            setSavedJobIds(response.data.map((job) => job._id));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchJobs = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/jobs`,
                authConfig
            );

            setJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const submitJob = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${API_URL}/api/jobs`,
                {
                    ...form,
                    skills: form.skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                },
                authConfig
            );

            setForm({
                title: "",
                company: "",
                location: "",
                jobType: "Full-time",
                salary: "",
                skills: "",
                description: "",
                applyLink: "",
            });

            setShowForm(false);
            fetchJobs();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to post job");
        }
    };

    const toggleSaveJob = async (jobId) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/jobs/${jobId}/save`,
                {},
                authConfig
            );

            setSavedJobIds(response.data.map((id) => id.toString()));
        } catch (error) {
            alert(error.response?.data?.message || "Unable to save job");
        }
    };

    const deleteJob = async (jobId) => {
        const confirmDelete = window.confirm("Delete this job post?");

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `${API_URL}/api/jobs/${jobId}`,
                authConfig
            );

            fetchJobs();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to delete job");
        }
    };

    const applyForJob = async () => {
        if (!selectedJob) return;

        try {
            await axios.post(
                `${API_URL}/api/applications/${selectedJob._id}`,
                { coverLetter },
                authConfig
            );

            alert("Application submitted successfully!");

            setSelectedJob(null);
            setCoverLetter("");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Failed to submit application"
            );
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
            job.title?.toLowerCase().includes(keyword) ||
            job.company?.toLowerCase().includes(keyword) ||
            job.location?.toLowerCase().includes(keyword) ||
            job.skills?.some((skill) =>
                skill.toLowerCase().includes(keyword)
            );

        const matchesType =
            jobTypeFilter === "All" || job.jobType === jobTypeFilter;

        return matchesSearch && matchesType;
    });

    useEffect(() => {
        const loadJobsPage = async () => {
            await fetchCurrentUser();
            await fetchJobs();
            await fetchSavedJobs();
        };

        loadJobsPage();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-4 sm:px-6 py-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to dashboard
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-black flex items-center justify-center">
                            <Briefcase size={26} />
                        </div>

                        <div>
                            <h1 className="text-4xl font-black">Jobs</h1>

                            <p className="text-zinc-500 mt-1">
                                Find developer jobs and opportunities on GhanaTechHub.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold"
                    >
                        {showForm ? "Close Form" : "+ Post Job"}
                    </button>
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-5 mb-8">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search jobs by title, company, location, or skill..."
                        className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                    />

                    <div className="flex flex-wrap gap-3 mt-4">
                        {[
                            "All",
                            "Full-time",
                            "Part-time",
                            "Contract",
                            "Internship",
                            "Remote",
                        ].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setJobTypeFilter(type)}
                                className={`px-4 py-2 rounded-full font-bold text-sm ${
                                    jobTypeFilter === type
                                        ? "bg-yellow-500 text-black"
                                        : "bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {showForm && (
                    <form
                        onSubmit={submitJob}
                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6 mb-8 space-y-4"
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Job title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                    })
                                }
                                className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Company"
                                value={form.company}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company: e.target.value,
                                    })
                                }
                                className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={form.location}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        location: e.target.value,
                                    })
                                }
                                className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                            />

                            <select
                                value={form.jobType}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        jobType: e.target.value,
                                    })
                                }
                                className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Internship</option>
                                <option>Remote</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Salary e.g. GHS 5000 - GHS 8000"
                                value={form.salary}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        salary: e.target.value,
                                    })
                                }
                                className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                            />

                            <input
                                type="text"
                                placeholder="Skills e.g. React, Node.js, MongoDB"
                                value={form.skills}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        skills: e.target.value,
                                    })
                                }
                                className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                            />
                        </div>

                        <textarea
                            placeholder="Job description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            rows="5"
                            className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none resize-none focus:border-yellow-500"
                            required
                        />

                        <input
                            type="url"
                            placeholder="Apply link optional"
                            value={form.applyLink}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    applyLink: e.target.value,
                                })
                            }
                            className="w-full bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                        />

                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold"
                        >
                            Post Job
                        </button>
                    </form>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                    {filteredJobs.length === 0 && (
                        <div className="col-span-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                            No jobs posted yet.
                        </div>
                    )}

                    {filteredJobs.map((job) => (
                        <article
                            key={job._id}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-black">
                                        {job.title}
                                    </h2>

                                    <p className="text-yellow-600 dark:text-yellow-400 font-semibold mt-1">
                                        {job.company}
                                    </p>
                                </div>

                                {currentUser?._id === job.postedBy?._id && (
                                    <button
                                        onClick={() => deleteJob(job._id)}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>

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
                                <Link
                                    to={`/profile/${job.postedBy?.username}`}
                                    className="text-sm text-yellow-500 hover:text-yellow-400 font-semibold"
                                >
                                    Posted by {job.postedBy?.handle}
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => toggleSaveJob(job._id)}
                                    className={`px-5 py-3 rounded-2xl font-bold ${
                                        savedJobIds.includes(job._id)
                                            ? "bg-yellow-500 text-black"
                                            : "bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800"
                                    }`}
                                >
                                    {savedJobIds.includes(job._id)
                                        ? "Saved"
                                        : "Save"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedJob(job)}
                                    className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-2xl font-bold"
                                >
                                    Apply
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {selectedJob && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
                    <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-black">
                                    Apply for {selectedJob.title}
                                </h2>

                                <p className="text-zinc-500 mt-1">
                                    {selectedJob.company}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedJob(null);
                                    setCoverLetter("");
                                }}
                                className="text-zinc-500 hover:text-red-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <textarea
                            rows="6"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write your cover letter..."
                            className="w-full mt-5 bg-zinc-100 dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4 outline-none resize-none focus:border-yellow-500"
                        />

                        <div className="flex gap-3 mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedJob(null);
                                    setCoverLetter("");
                                }}
                                className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-2xl py-3 font-bold"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={applyForJob}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl py-3 font-bold"
                            >
                                Submit Application
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}