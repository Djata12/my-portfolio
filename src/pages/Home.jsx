    import Navbar from "../components/Navbar";
    import Hero from "../components/Hero";
    import About from "../components/About";
    import Skills from "../components/Skills";
    import Projects from "../components/Projects";
    import Contact from "../components/Contact";
    import Footer from "../components/Footer";
    import ScrollProgress from "../components/ScrollProgress";
    import Testimonials from "../components/Testimonials";

    export default function Home() {
    return (
        <div className="bg-[#09090b] text-white">
        
        <ScrollProgress />

        <Navbar />

        <Hero />

        <About />

        <Skills />

        <Projects />
        
        <Testimonials />

        <Contact />

        <Footer />

        </div>
    );
    }