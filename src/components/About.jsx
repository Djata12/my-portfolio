export default function About() {

    return (

        <section
            id="about"
            className="
                pt-40 pb-32 px-6 fade-up
                bg-[#f5f5f5] dark:bg-[#111111]
                transition-colors duration-300
            "
        >

            <div className="max-w-5xl mx-auto">

                <h2
                    className="
                        text-5xl lg:text-6xl font-medium tracking-normal
                        text-black dark:text-white
                        transition-colors duration-300
                    "
                >
                    About Me
                </h2>

                <p
                    className="
                        text-zinc-600 dark:text-zinc-400
                        text-lg leading-relaxed mt-10
                        transition-colors duration-300
                    "
                >
                    I’m a Full-Stack Software Developer passionate about building
                    modern web applications, scalable APIs and premium digital
                    experiences. I enjoy creating clean user interfaces,
                    solving backend challenges and building products that
                    feel fast, modern and intuitive.
                </p>

            </div>

        </section>

    );
}