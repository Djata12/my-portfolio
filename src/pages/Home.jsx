import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";

export default function Home() {

    return (

        <div
            id="top"
            className="
                bg-white text-black
                dark:bg-[#09090b] dark:text-white
                transition-colors duration-300
            "
        >

            {/* SCROLL PROGRESS */}

            <ScrollProgress />

            {/* NAVBAR */}

            <Navbar />

            {/* HERO */}

            <Hero />

            {/* ABOUT */}

            <About />

            {/* SKILLS */}

            <Skills />

            {/* PROJECTS */}

            <Projects />

            {/* EXPERIENCE */}

            <Experience />

            {/* TESTIMONIALS */}

            <Testimonials />

            {/* CONTACT */}

            <Contact />

            {/* FOOTER */}

            <Footer />

        </div>

    );
}