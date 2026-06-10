import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function SupportSuccess() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Verifying payment...");
    const [support, setSupport] = useState(null);

    const reference = searchParams.get("reference");

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/support/verify/${reference}`
                );

                setSupport(response.data.support);
                setStatus("Payment received successfully!");
            } catch (error) {
                setStatus(
                    error.response?.data?.message || "Unable to verify payment"
                );
            }
        };

        if (reference) {
            verifyPayment();
        }
    }, [reference]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white px-4 sm:px-6 py-10 flex items-center justify-center">
            <div className="max-w-xl w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[32px] p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto">
                    <CheckCircle size={42} />
                </div>

                <h1 className="text-4xl font-black mt-6">
                    Thank You!
                </h1>

                <p className="text-zinc-600 dark:text-zinc-400 mt-3">
                    {status}
                </p>

                {support && (
                    <div className="mt-6 bg-white dark:bg-[#09090b] border border-zinc-300 dark:border-zinc-800 rounded-2xl p-5 text-left">
                        <p>
                            <strong>Name:</strong> {support.name}
                        </p>
                        <p className="mt-2">
                            <strong>Amount:</strong> GHS {support.amount}
                        </p>
                        <p className="mt-2">
                            <strong>Reference:</strong> {support.reference}
                        </p>
                    </div>
                )}

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-4 rounded-2xl font-black"
                >
                    <ArrowLeft size={18} />
                    Back to Portfolio
                </Link>
            </div>
        </div>
    );
}