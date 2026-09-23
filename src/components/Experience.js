import React from 'react';

const Experience = () => {
  const experiences = [
    {
      company: 'Southampton Marine and Maritime Institute (SMMI)',
      role: 'Software Engineer Intern',
      duration: 'Jun 2026 – Sep 2026',
      description: [
        'Built a relational SQL database now used by 300+ researchers to centralise project and partnership data.',
        'Worked on an ArcGIS Online integration enabling interactive geospatial visualisation of project data.',
        'Developed a web-based data entry form for administrators to submit and update project records.',
        'Produced system documentation to ensure long-term platform maintainability and scalability.',
      ],
    },
    {
      company: 'Deloitte',
      role: 'Spring Intern – Advisory',
      duration: 'Apr 2026',
      description: [
        'Produced advisory recommendations on strategy, technology, and cyber risk for a mock music publisher.',
        'Presented on operational vulnerabilities, AI risks, and strategic growth to 60+ people including senior managers.',
      ],
    },
    {
      company: 'Code Ninjas',
      role: 'Programming Instructor',
      duration: 'Jun 2024 – Jul 2025',
      description: [
        'Taught students aged 5–16 programming, from block-based coding to JavaScript and C# development.',
        'Led presentations and summer workshops, using gamification to engage students of all ages.',
      ],
    },
  ];

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-16 lg:py-20 px-6 sm:px-10 lg:px-14 scroll-mt-16">
      <div className="container mx-auto">
        <h2 id="experience-heading" className="font-mono font-bold text-[26px] text-baltic-ink mb-8">Experience</h2>
        <div className="flex flex-col gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 md:gap-10 border-t border-baltic-ink/[0.12] pt-6"
            >
              <div className="md:flex-none md:w-[260px]">
                <div className="font-mono font-bold text-base text-baltic-ink">{exp.company}</div>
                <div className="font-serif text-sm text-baltic-ink/60 mt-1">{exp.role}</div>
                <div className="font-serif text-[13px] text-baltic-ink/45 mt-0.5">{exp.duration}</div>
              </div>
              <ul className="flex-1 list-disc pl-4 font-serif text-[14.5px] text-baltic-ink leading-[1.7] space-y-1">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="mt-11 font-serif text-sm text-baltic-ink/55">
          Find me on{' '}
          <a
            href="https://github.com/AdamWilkinson0"
            target="_blank"
            rel="me noopener noreferrer"
            className="text-baltic-blue hover:underline"
          >
            GitHub
          </a>{' '}
          or{' '}
          <a
            href="https://www.linkedin.com/in/adam-wilkinson-1b34501a8"
            target="_blank"
            rel="me noopener noreferrer"
            className="text-baltic-blue hover:underline"
          >
            LinkedIn
          </a>
          .
        </footer>
      </div>
    </section>
  );
};

export default Experience;
