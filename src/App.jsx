import InventoryDashboard from './components/InventoryDashboard';
import TechHub from './components/TechHub';
import PaymentIntegration from './components/PaymentIntegration';

import inventoryImg from './components/screenshots/inventory.png';
import techHubImg from './components/screenshots/techhub.png';
import paymentImg from './components/screenshots/payment.png';

import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Database, Sun, Moon } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  if (!darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

  // --- DATA: Update these details later ---
  const personalInfo = {
    name: "Benjamin Nii Annang Djata",
    role: "Software Developer",
    location: "Accra, Ghana",
    bio: "I am a software developer based in Ghana, passionate about building accessible, pixel-perfect user interfaces and robust backend systems. I bridge the gap between complex engineering and intuitive design.",
    email: "Jamindjata@gmail.com", // Add your real email
    github: "https://github.com/Djata12",   // Add your GitHub URL
    linkedin: "https://www.linkedin.com/in/jamin-nii-annang-djata-4b0838283/" // Add your LinkedIn URL
  };

  const skills = [
    { name: "Frontend", icon: <Code2 className="w-6 h-6" />, tools: "React, Tailwind, HTML5/CSS3" },
    { name: "Backend", icon: <Terminal className="w-6 h-6" />, tools: "Node.js, Express, Python" },
    { name: "Database", icon: <Database className="w-6 h-6" />, tools: "PostgreSQL, MongoDB" },
  ];

  const projects = [
    {
      title: "Project Alpha",
      description: "A responsive e-commerce dashboard built for local businesses in Accra to manage inventory.",
      tech: ["React", "Node.js", "MongoDB"],
      githubLink: "#",
      liveLink: "#inventory",
      image: inventoryImg
    },
    {
      title: "Ghana Tech Hub",
      description: "A community platform connecting developers across the Greater Accra Region.",
      tech: ["Next.js", "Tailwind", "Firebase"],
      githubLink: "#",
      liveLink: "#techhub",
      image: techHubImg
    },
    {
      title: "Mobile Payment Integration",
      description: "A wrapper API for handling mobile money payments (MOMO) securely.",
      tech: ["Python", "FastAPI", "Docker"],
      githubLink: "#",
      liveLink: "#payment",
      image: paymentImg
    }
  ];

  // --- COMPONENT STRUCTURE ---
    const [status, setStatus] = useState({ type: '', message: '' });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleContactSubmit = async (e) => {
      e.preventDefault();
      setStatus({ type: 'loading', message: 'Sending message...' });
    
      try {
        const response = await fetch('https://portfolio-backend-rl0z.onrender.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (data.success) {
          setStatus({ type: 'success', message: "Message sent to Benjamin's Database! 🚀" });
          setFormData({ name: '', email: '', message: '' });
        } else {
          setStatus({ type: 'error', message: "Something went wrong. Please try again." });
        }
      } catch (err) {
        console.error("Connection Error:", err);
        setStatus({ type: 'error', message: "Backend not running! Start it with 'node server.js'" });
      }
    
      // Auto-hide the message after 5 seconds
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Navigation */}
      <nav className={`fixed w-full backdrop-blur-md shadow-sm z-50 transition-all duration-300 border-b ${
        darkMode 
          ? 'bg-slate-900/70 border-slate-800' 
          : 'bg-white/70 border-white/20'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-blue-600">BD.</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-blue-600 transition">Home</a>
              <a href="#about" className="hover:text-blue-600 transition">About</a>
              <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
              <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
            
              {/* Dark Mode Toggle Button */}
                <button 
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:ring-2 hover:ring-blue-400 transition-all"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className={`md:hidden backdrop-blur-lg border-t transition-colors duration-300 ${
                  darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-100'
              }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">Home</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">About</a>
              <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">Projects</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-600 font-medium mb-4">Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto">
            {personalInfo.role} based in {personalInfo.location}. <br/>
            Building digital solutions for the modern web.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#projects" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              View Work
            </a>
            <a href="#contact" className="px-8 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About & Skills */}
      <section id="about" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              <div className="flex gap-4">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                  <Github className="w-6 h-6 text-slate-700" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                  <Linkedin className="w-6 h-6 text-blue-700" />
                </a>
                <a href={`mailto:${personalInfo.email}`} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                  <Mail className="w-6 h-6 text-red-500" />
                </a>
              </div>
            </div>
            
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <div key={index} className={`rounded-xl overflow-hidden border transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 hover:shadow-xl'}`}>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">{skill.icon}</div>
                    <h3 className="font-bold text-lg">{skill.name}</h3>
                  </div>
                  <p className="text-slate-600 ml-14">{skill.tools}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition duration-300">
              {/* --- THE UPDATED PART START --- */}
          <div className="h-48 overflow-hidden bg-slate-200">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
          {/* --- THE UPDATED PART END --- */}
          
                <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`mb-4 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {project.description}
                    </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <a href={project.githubLink} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                      <Github className="w-4 h-4" /> Code
                    </a>
                    <a href={project.liveLink} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      
      {/* --- PAYMENT DEMO START --- */}
      <section id="payment" className={`py-20 border-t transition-colors ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Project Demo: Payment Gateway</h2>
          <p className="text-slate-600 mb-10">Experience the flow of a Ghanaian MoMo integration</p>
          <PaymentIntegration />
        </div>
      </section>
      {/* --- PAYMENT DEMO END --- */}
      
        {/* --- LIVE DEMO SECTION START --- */}
        <section id="inventory" className={`py-20 border-t transition-colors ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Project Demo: Inventory Manager</h2>
              <p className="text-slate-600 mt-2">Explore the live search and filtering logic below</p>
            </div>
            <div className="rounded-2xl shadow-2xl border border-slate-200 overflow-hidden bg-gray-50">
              <InventoryDashboard />
            </div>
        </div>
      </section>
      
      {/* --- TECH HUB DEMO START --- */}
      <section id="techhub" className={`py-20 border-t transition-colors ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Project Demo: Ghana Tech Hub</h2>
            <p className="text-slate-600 mt-2">A functional member directory with real-time search</p>
          </div>
          <TechHub />
        </div>
      </section>
      {/* --- TECH HUB DEMO END --- */}
      
      
      {/* --- LIVE DEMO SECTION END --- */}
      <section id="contact" className={`py-20 transition-colors ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
  <div className="max-w-xl mx-auto px-4">
    <h2 className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Send Me a Message</h2>
    
      {status.message && (
    <div className={`mb-6 p-4 rounded-lg text-center font-medium transition-all animate-bounce ${
      status.type === 'success' 
        ? 'bg-green-100 text-green-700 border border-green-200' 
        : status.type === 'error'
        ? 'bg-red-100 text-red-700 border border-red-200'
        : 'bg-blue-100 text-blue-700 border border-blue-200'
    }`}>
      {status.message}
    </div>
  )}
    
    <form onSubmit={handleContactSubmit} className="space-y-4">
      <input 
        type="text" 
        placeholder="Your Name" 
        className="w-full p-3 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input 
        type="email" 
        placeholder="Your Email" 
        className="w-full p-3 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <textarea 
        placeholder="Your Message" 
        rows="4" 
        className="w-full p-3 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      ></textarea>
      
      <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
        Send to Benjamin
      </button>
    </form>
  </div>
</section>

    </div>
  );
};

export default App;