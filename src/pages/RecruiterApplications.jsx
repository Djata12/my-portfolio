import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Mail } from "lucide-react";

export default function RecruiterApplications() {
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
                "http://localhost:5000/api/applications/recruiter/all",
                authConfig
            );

            setApplications(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (applicationId, status) => {
        try {
            await axios.put(
                `http://localhost:5000/api/applications/${applicationId}/status`,
                { status },
                authConfig
            );

            fetchApplications();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to update status");
        }
    };
    
    const updateNotes = async (applicationId, recruiterNotes) => {
        try {
            await axios.put(
                `http://localhost:5000/api/applications/${applicationId}/notes`,
                { recruiterNotes },
                authConfig
            );
    
            fetchApplications();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to save notes");
        }
    };
    
    const totalApplications = applications.length;

const underReviewCount = applications.filter(
    (application) => application.status === "Under Review"
).length;

const interviewCount = applications.filter(
    (application) => application.status === "Interview"
).length;

const hiredCount = applications.filter(
    (application) => application.status === "Hired"
).length;

    useEffect(() => {
        const loadApplications = async () => {
            await fetchApplications();
        };

        loadApplications();
    }, []);

    const getStatusClass = (status) => {
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

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-4 sm:px-6 py-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to dashboard
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-black">
                        <Briefcase size={28} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-black">
                            Recruiter Dashboard
                        </h1>

                        <p className="text-zinc-500">
                            Manage applicants for jobs you posted.
                        </p>
                    </div>
                </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-5">
                    <p className="text-3xl font-black">
                        {totalApplications}
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">
                        Applications
                    </p>
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-5">
                    <p className="text-3xl font-black text-blue-500">
                        {underReviewCount}
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">
                        Under Review
                    </p>
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-5">
                    <p className="text-3xl font-black text-purple-500">
                        {interviewCount}
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">
                        Interviews
                    </p>
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-5">
                    <p className="text-3xl font-black text-green-500">
                        {hiredCount}
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">
                        Hired
                    </p>
                </div>
            </div>

                {applications.length === 0 ? (
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-8 text-center text-zinc-500">
                        No applications yet.
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {applications.map((application) => (
                            <article
                                key={application._id}
                                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[28px] p-6"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                                    <div>
                                        <p className="text-sm text-zinc-500">
                                            Applied for
                                        </p>

                                        <h2 className="text-2xl font-black">
                                            {application.job?.title}
                                        </h2>

                                        <p className="text-yellow-500 font-semibold">
                                            {application.job?.company}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-4 text-sm">
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
                                    </div>

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-bold w-fit ${getStatusClass(
                                            application.status
                                        )}`}
                                    >
                                        {application.status}
                                    </span>
                                </div>

                                <div className="mt-6 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <Link
                                                to={`/profile/${application.applicant?.username}`}
                                                className="text-xl font-black hover:text-yellow-500"
                                            >
                                                {application.applicant?.name}
                                            </Link>

                                            <p className="text-yellow-500">
                                                {application.applicant?.handle}
                                            </p>

                                            <p className="text-sm text-zinc-500 mt-1">
                                                {application.applicant?.role} •{" "}
                                                {application.applicant?.location || "Ghana"}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Link
                                                to={`/profile/${application.applicant?.username}`}
                                                className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
                                            >
                                                View Profile
                                            </Link>

                                            <a
                                                href={`mailto:${application.applicant?.email}`}
                                                className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
                                            >
                                                <Mail size={18} />
                                                Email Applicant
                                            </a>
                                        </div>
                                    </div>

                                    {application.coverLetter && (
                                        <div className="mt-5">
                                            <p className="text-sm text-zinc-500">
                                                Cover Letter
                                            </p>

                                            <p className="mt-2 text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                                                {application.coverLetter}
                                            </p>
                                        </div>
                                    )}
                                    <div className="mt-5">
                                    <p className="text-sm text-zinc-500 mb-2">
                                        Recruiter Notes
                                    </p>

                                    <textarea
                                        defaultValue={application.recruiterNotes || ""}
                                        onBlur={(e) =>
                                            updateNotes(application._id, e.target.value)
                                        }
                                        rows="3"
                                        placeholder="Add private notes about this applicant..."
                                        className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-4 py-3 outline-none resize-none focus:border-yellow-500"
                                    />
                                </div>
                                </div>

                                <div className="mt-5">
                                    <p className="text-sm text-zinc-500 mb-3">
                                        Update application status
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            "Applied",
                                            "Under Review",
                                            "Interview",
                                            "Rejected",
                                            "Hired",
                                        ].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() =>
                                                    updateStatus(
                                                        application._id,
                                                        status
                                                    )
                                                }
                                                className={`px-4 py-2 rounded-full text-sm font-bold ${
                                                    application.status === status
                                                        ? getStatusClass(status)
                                                        : "bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800"
                                                }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}