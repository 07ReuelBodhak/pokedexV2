import React from "react";
import pfp from "../../assets/pfp.png";

const About: React.FC = () => {
  return (
    <div className="min-h-screen z-20 bg-white text-gray-800">
      <section className="bg-black border-black border-2 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img
              src={pfp}
              alt="Roy"
              className="rounded-full bg-white border-4 border-white shadow-lg lg:w-72 lg:h-72 w-64 h-64"
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Reuel</h1>
            <p className="text-xl md:text-2xl font-semibold mb-2">
              Full-Stack Web Developer & Software Developer
            </p>
            <p className="text-lg md:text-xl font-mono text-gray-300">
              Welcome to my Pokedex app! I'm passionate about web development,
              and this app serves as a showcase of my skills. It combines my
              love for both Pokémon and modern web technologies, providing a
              comprehensive Pokémon database with interactive features and a
              seamless user experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-mono mb-8 text-center text-white">
            MY SKILLS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "React",
              "python",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Express",
              "MongoDB",
              "REST APIs",
            ].map((skill) => (
              <div
                key={skill}
                className="text-center py-3 bg-white hover:-translate-y-2 transition-all duration-150 ease shadow-md border border-gray-400 rounded-xl"
              >
                <h1 className="font-medium">{skill}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container bg-white mx-auto px-4 py-5">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
            My Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pokedex App",
                description:
                  "A comprehensive Pokémon database with detailed information on all Pokémon.",
              },
              {
                title: "DocSwift",
                description:
                  "An online service for seamless document creation and application, simplifying your paperwork needs.",
              },
              {
                title: "QuickFlash",
                description:
                  "Quick Flash is a fast and intuitive Python library for seamless web application development, simplifying your backend workflow.",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-150 ease-out"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-red-600 font-mono lg:text-xl md:text-lg text-black py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 Your Pokedex App. All rights reserved.</p>
          <p>Connect with me:</p>
          <div className="flex justify-center space-x-4 mt-4">
            {[
              { name: "GitHub", link: "https://github.com/07ReuelBodhak" },
              {
                name: "LinkedIn",
                link: "https://www.linkedin.com/in/reuel-b-155815300/",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="hover:text-red-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
