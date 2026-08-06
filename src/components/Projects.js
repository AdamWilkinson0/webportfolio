import React, { useState } from 'react';

const ProjectCard = ({ name, tagline, technologies, images, link }) => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-baltic-bg rounded-[10px] overflow-hidden border border-baltic-ink/10 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:rotate-[-0.6deg] hover:shadow-[0_16px_34px_rgba(23,38,58,0.2)]"
    >
      <div className="relative">
        <img
          src={images[activeImg]}
          alt={`${name} screenshot ${activeImg + 1}`}
          className="w-full h-56 object-cover object-top border-b border-baltic-ink/10"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setActiveImg(i); }}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  i === activeImg ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`View screenshot ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-mono font-bold text-[17px] text-baltic-ink mb-2">{name}</h3>
        <p className="font-serif text-sm text-baltic-ink/65 leading-relaxed mb-3.5">{tagline}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="font-mono text-[11px] text-baltic-ink bg-baltic-surface px-2.5 py-1 rounded-xl"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const projects = [
    {
      name: 'Countrivia',
      tagline: 'Geography quiz: map & typing challenge modes.',
      technologies: ['JavaScript', 'HTML/CSS'],
      images: ['/images/countrivia-1.png', '/images/countrivia-2.png'],
      link: 'https://countriviaa.netlify.app',
    },
    {
      name: 'Terrivia',
      tagline: 'Clue-based country identification on a live world map.',
      technologies: ['Node.js', 'Express', 'D3.js', 'JavaScript'],
      images: ['/images/terrivia.png'],
      link: 'https://terrivia.com',
    },
    {
      name: 'Kotlin Wallet',
      tagline: 'Android tap-to-pay demo: card carousel paid with blank NFC tags.',
      technologies: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Android NFC'],
      images: ['/images/kotlin-wallet.png'],
      link: 'https://github.com/AdamWilkinson0/kotlinWallet',
    },
    {
      name: 'NYSE Sentiment Analysis',
      tagline: 'Financial news sentiment vs. 14-day stock price trends.',
      technologies: ['Python', 'Streamlit', 'FinBERT', 'Plotly', 'Pandas'],
      images: ['/images/nyse-1.png', '/images/nyse-2.png'],
      link: 'https://github.com/AdamWilkinson0/Stock-News-Sentiment-Analysis',
    },
  ];

  return (
    <section id="projects" className="bg-baltic-surface py-16 lg:py-20 px-6 sm:px-10 lg:px-14 scroll-mt-16">
      <div className="container mx-auto">
        <h2 className="font-mono font-bold text-[26px] text-baltic-ink mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
