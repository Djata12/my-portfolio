    import kwame from "../assets/developers/kwame.webp";

    export default function KwameAsante() {
    return (
        <div className="min-h-screen bg-[#09090b] text-white">

        

        <section className="px-6 py-20 border-b border-zinc-800">

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            

            <div>

                <img
                src={kwame}
                alt="Kwame Asante"
                className="w-full h-[700px] object-cover rounded-[40px]"
                />

            </div>

            

            <div>

                <div className="inline-block bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-3 rounded-full text-sm">
                Available For Remote Work
                </div>

                <h1 className="text-7xl font-black mt-8 leading-tight">
                Kwame
                <br />
                Asante
                </h1>

                <p className="text-yellow-400 text-2xl mt-6">
                Frontend Developer
                </p>

                <p className="text-zinc-400 text-xl leading-relaxed mt-8">
                Passionate Ghanaian frontend engineer focused on building modern,
                accessible and scalable web applications using React, Tailwind
                CSS and modern JavaScript technologies.
                </p>

                

                <div className="flex flex-wrap gap-4 mt-10">

                <span className="bg-zinc-800 px-5 py-3 rounded-full">
                    React
                </span>

                <span className="bg-zinc-800 px-5 py-3 rounded-full">
                    Tailwind CSS
                </span>

                <span className="bg-zinc-800 px-5 py-3 rounded-full">
                    JavaScript
                </span>

                <span className="bg-zinc-800 px-5 py-3 rounded-full">
                    Node.js
                </span>

                </div>

                

                <div className="flex gap-4 mt-12">

                <a
                    href="mailto:benjamindjata@gmail.com?subject=Hiring Inquiry"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-2xl font-bold transition inline-block"
                    >
                    Hire Developer
                </a>

                <a
                        href="mailto:jamindjata@gmail.com?subject=Connecting With Kwame Asante&body=Hello Kwame Asante, I would like to connect with you regarding a project."
                        className="border border-zinc-700 hover:border-yellow-500/40 bg-zinc-900 hover:bg-zinc-800 px-8 py-4 rounded-2xl transition inline-block text-center"
                        >
                        Connect
                </a>

                </div>

            </div>

            </div>

        </section>

        

        <section className="px-6 py-20">

            <div className="max-w-6xl mx-auto">

            <h2 className="text-5xl font-black mb-12">
                Experience
            </h2>

            <div className="space-y-8">

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <div className="flex justify-between items-start">

                    <div>

                    <h3 className="text-3xl font-bold">
                        Senior Frontend Developer
                    </h3>

                    <p className="text-yellow-400 mt-3">
                        Accra Digital Solutions
                    </p>

                    </div>

                    <p className="text-zinc-500">
                    2023 - Present
                    </p>

                </div>

                <p className="text-zinc-400 mt-6 leading-relaxed">
                    Leading frontend architecture and building scalable React
                    applications for fintech startups across Ghana.
                </p>

                </div>

            </div>

            </div>

        </section>

        </div>
    );
    }