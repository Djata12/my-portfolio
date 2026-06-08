import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyApplications() {
    const [applications, setApplications] = useState([]);

    const token = localStorage.getItem("token");

    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchApplications = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/applications/me/all`,
                authConfig
            );

            setApplications(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadApplications = async () => {
            await fetchApplications();
        };

        loadApplications();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Applied":
                return "bg-yellow-500 text-black";

            case "Under Review":
                return "bg-blue-500 text-white";

            case "Interview":
                return "bg-purple-500 text-white";

            case "Rejected":
                return "bg-red-500 text-white";

            case "Hired":
                return "bg-green-500 text-white";

            default:
                return "bg-zinc-500 text-white";
        }
    };
    
    const getStatusMessage = (status) => {
        switch (status) {
            case "Applied":
                return "Your application has been submitted successfully.";
    
            case "Under Review":
                return "The recruiter is currently reviewing your application.";
    
            case "Interview":
                return "Congratulations! The recruiter would like to interview you.";
    
            case "Rejected":
                return "The recruiter has moved forward with another candidate.";
    
            case "Hired":
                return "Congratulations! You have been selected for this role.";
    
            default:
                return "Your application status has been updated.";
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-4 sm:px-6 py-8">

            <div className="max-w-5xl mx-auto">

                <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to jobs
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-black">
                        <Briefcase size={28} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-black">
                            My Applications
                        </h1>

                        <p className="text-zinc-500">
                            Track all jobs you've applied for.
                        </p>
                    </div>
                </div>

                {applications.length === 0 ? (
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                        You haven't applied for any jobs yet.
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {applications.map((application) => (
                            <article
                                key={application._id}
                                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-black">
                                            {application.job?.title}
                                        </h2>

                                        <p className="text-yellow-500 font-semibold">
                                            {application.job?.company}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                                            application.status
                                        )}`}
                                    >
                                        {application.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-full px-3 py-1">
                                        {application.job?.location}
                                    </span>

                                    <span className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-full px-3 py-1">
                                        {application.job?.jobType}
                                    </span>

                                    <span className="bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-full px-3 py-1">
                                        {application.job?.salary}
                                    </span>
                                </div>

                                <p className="mt-5 text-zinc-600 dark:text-zinc-300">
                                    {application.job?.description}
                                </p>
                                <div className="mt-5 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-4">
                                    <p className="text-sm text-zinc-500">
                                        Application Update
                                    </p>

                                    <p className="mt-2 font-semibold">
                                        {getStatusMessage(application.status)}
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-between items-center">
                                    <Link
                                        to={`/profile/${application.job?.postedBy?.username}`}
                                        className="text-yellow-500 hover:text-yellow-400 font-semibold"
                                    >
                                        {application.job?.postedBy?.handle}
                                    </Link>

                                    <span className="text-sm text-zinc-500">
                                        Applied on{" "}
                                        {new Date(
                                            application.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}