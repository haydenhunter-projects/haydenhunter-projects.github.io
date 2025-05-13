"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Navigation smooth scroll handler
    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      
      // Handle scroll to top
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // Handle scroll to section
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        
        if (element) {
          const headerOffset = 80; // Account for fixed header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Back to top button visibility handler
    const handleScroll = () => {
      const backToTopButton = document.getElementById('backToTop');
      if (backToTopButton) {
        if (window.scrollY > 500) {
          backToTopButton.classList.remove('opacity-0', 'invisible');
          backToTopButton.classList.add('opacity-100', 'visible');
        } else {
          backToTopButton.classList.add('opacity-0', 'invisible');
          backToTopButton.classList.remove('opacity-100', 'visible');
        }
      }
    };

    // Intersection Observer for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Add event listeners and observers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleNavClick);
    });

    window.addEventListener('scroll', handleScroll);

    // Small delay to ensure DOM is ready before observing
    setTimeout(() => {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
      });
    }, 100);

    // Cleanup event listeners and observers
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleNavClick);
      });
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white">
      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .scroll-indicator {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      {/* Back to Top Button */}
      <button
        id="backToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-red-600 to-red-500 text-white p-3 rounded-full shadow-lg cursor-pointer opacity-0 invisible transition-all duration-300 hover:from-red-700 hover:to-red-600 hover:shadow-xl z-50"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Name */}
            <a href="#top" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text group-hover:from-red-700 group-hover:to-red-600 transition-all duration-300">
                Hayden Hunter
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {['About', 'Resume', 'Skills', 'Projects'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-gray-800 hover:text-red-600 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
              <a
                href="#contact"
                className="ml-2 px-5 py-2 text-white bg-gradient-to-r from-red-600 to-red-500 rounded-full hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className="hidden md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['About', 'Resume', 'Skills', 'Projects'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-red-600 to-red-500"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Profile Picture */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden ring-4 ring-red-500/80 ring-offset-4 transition-transform duration-300 hover:scale-105 hover:ring-red-600 hover:shadow-xl">
              <Image
                src="/GraduationPicture.jpg"
                alt="Hayden Hunter"
                fill
                sizes="(max-width: 768px) 192px, 224px"
                quality={100}
                className="object-cover hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">
              Hi, I'm Hayden Hunter
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl">
              A passionate software developer focused on creating impactful digital experiences.
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="border-2 border-red-500/50 hover:border-red-500 hover:bg-red-50 px-6 py-3 rounded-full font-medium transition-all duration-300 text-gray-800"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/80">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">About Me</h2>
          <p className="text-gray-700 mb-6">
            I am an aspiring software developer with a passion for creating impactful digital experiences. 
            I recently graduated from North Carolina State University with a Bachelor of Science in Business Administration and Management with a concentration in Information Technology. 
            I am currently pursuing new opportunities in the software development field preferably in the Raleigh, NC area. 
            I am a quick learner and I am always looking for new challenges and opportunities to grow.
          </p>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 bg-gradient-to-r from-red-50 via-white to-red-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">Resume</h2>
          <div className="bg-white shadow-lg border border-red-100 rounded-xl p-8 text-center">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">View My Full Resume</h3>
              <p className="text-gray-700 mb-6">
                Download or view my complete resume to learn more about my experience, education, and skills.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="/Hunter_Hayden_Resume_SoftwareEngineer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Resume
              </a>
              <a
                href="/Hunter_Hayden_Resume_SoftwareEngineer.pdf"
                download
                className="group inline-flex items-center border-2 border-red-500/50 hover:border-red-500 hover:bg-red-50 px-6 py-3 rounded-full font-medium transition-all duration-300 text-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white/80">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Front-End Development',
                skills: 'React, Next.js, HTML, CSS, Tailwind CSS, jQuery, Bootstrap'
              },
              {
                title: 'Back-End Development',
                skills: 'Node.js, Python, Java, SQL, PostgreSQL'
              },
              {
                title: 'Full-Stack & Tools',
                skills: 'Django, CouchDB, Tableau, Git, REST APIs'
              }
            ].map((category, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300"
              >
                <h3 className="font-semibold mb-2 text-gray-800">{category.title}</h3>
                <p className="text-gray-700">{category.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-r from-red-50 via-white to-red-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Cards */}
            {[
              {
                title: 'My Resume Website',
                image: '/firstwebsite.jpg',
                description: 'This is the first website I created using HTML and CSS on a Bootstrap grid. It\'s a simple website that I created to learn the basics of HTML, CSS, and Bootstrap.',
                link: 'https://haydenhunterbus443.s3.us-east-2.amazonaws.com/Project2/Project2/project2.html',
                technologies: ['HTML', 'CSS', 'Bootstrap']
              },
              {
                title: 'Admin Dashboard Project',
                image: '/AdminDashboard.jpg',
                description: 'A modern, responsive dashboard for a PostgreSQL database. This project was created using Django and jQuery.',
                link: 'https://github.com/haydenhunter-projects/SchoolCodingProjects/tree/main/finalproject',
                technologies: ['PostgreSQL', 'HTML', 'Django', 'jQuery']
              }
            ].map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="bg-white border border-red-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-red-200 transition-all duration-300">
                  <div className="aspect-video relative group-hover:brightness-95 transition-all">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-xl text-gray-800">{project.title}</h3>
                      <div className="flex gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 text-xs rounded-full bg-red-50 text-red-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="flex items-center text-red-600 font-medium">
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/80">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">Get in Touch</h2>
          <p className="text-gray-700 mb-8">
            I'm always open to new opportunities and interesting projects.
          </p>
          <a
            href="mailto:therealhaydenhunter@gmail.com"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 rounded-full font-medium inline-block transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Send me an email
          </a>
          <div className="mt-8 flex justify-center space-x-6">
            <a
              href="https://github.com/haydenhunter-projects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/thehaydenhunter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
