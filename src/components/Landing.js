import React, { useState, useRef, useEffect } from 'react';
import { FiLinkedin } from 'react-icons/fi';

const FACTS = [
  '$ hobbies → go karting, rock climbing, running',
  '$ built → Terrivia & Countrivia, geography games on a live world map',
  '$ currently → an AI analyser scoring news sentiment vs 14-day NYSE prices',
  '$ next_project → tbd, taking suggestions',
];

const SKILLS = ['Python', 'JavaScript', 'SQL', 'Java', 'Node.js', 'D3.js'];

const Highlight = ({ children }) => (
  <span className="bg-baltic-blue/[0.14] px-1.5 py-0.5 rounded">{children}</span>
);

const EMAIL = 'adamowilkinson14@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/adam-wilkinson-1b34501a8';

const Landing = () => {
  const [fact, setFact] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    if (!contactOpen) return;
    const handleClickOutside = (e) => {
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contactOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      // Clipboard API unavailable — fall back silently
    }
  };

  const cycleFact = () => setFact((f) => (f + 1) % FACTS.length);

  return (
    <section
      id="landing"
      className="relative px-6 sm:px-10 lg:px-14 pt-28 pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="container mx-auto flex flex-col lg:flex-row gap-12 lg:gap-14 items-start">
        {/* Identity column */}
        <div className="lg:flex-none lg:w-[380px] flex flex-col gap-6">
          <div className="relative w-24 h-24 mb-3">
            <div className="absolute -inset-1.5 border-[1.5px] border-dashed border-baltic-blue rounded-2xl" />
            <span className="absolute top-[-9px] left-[-9px] w-1.5 h-1.5 bg-baltic-blue" />
            <span className="absolute top-[-9px] right-[-9px] w-1.5 h-1.5 bg-baltic-blue" />
            <span className="absolute bottom-[-9px] left-[-9px] w-1.5 h-1.5 bg-baltic-blue" />
            <span className="absolute bottom-[-9px] right-[-9px] w-1.5 h-1.5 bg-baltic-blue" />
            <img
              src="/images/profile.png"
              alt="Adam Wilkinson"
              className="relative w-24 h-24 object-cover rounded-[14px] border-2 border-white shadow-[0_2px_8px_rgba(23,38,58,0.15)]"
            />
            <span className="absolute bottom-[-22px] left-0 font-mono text-[9px] text-baltic-bg bg-baltic-ink px-1.5 py-0.5 rounded-[3px]">96×96</span>
          </div>
          <h1 className="font-mono font-bold text-5xl md:text-6xl leading-[1.05] tracking-tight text-baltic-ink">
            Adam<br />Wilkinson
          </h1>
          <p className="font-serif text-lg leading-relaxed text-baltic-ink/70 max-w-xs">
            Building tools to fix everyday problems &amp; help people learn about the world.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href="/Adam_Wilkinson_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[15px] bg-baltic-ink text-baltic-bg px-6 py-3 rounded-lg hover:bg-baltic-blue transition-colors"
            >
              My CV
            </a>
            <div className="relative" ref={contactRef}>
              <button
                onClick={() => setContactOpen((o) => !o)}
                aria-expanded={contactOpen}
                className="font-semibold text-[15px] text-baltic-ink px-6 py-3 rounded-lg border-[1.5px] border-baltic-ink/25 hover:border-baltic-ink/60 transition-colors"
              >
                Contact Me
              </button>

              {contactOpen && (
                <div className="absolute left-0 top-full mt-2 z-40 w-72 rounded-lg border border-baltic-ink/10 bg-white p-3 shadow-[0_10px_30px_rgba(23,38,58,0.18)]">
                  <button
                    onClick={copyEmail}
                    className="w-full flex items-center justify-between gap-2 rounded-md px-3 py-2 text-left font-mono text-[12.5px] text-baltic-ink bg-baltic-surface hover:bg-baltic-blue/15 transition-colors"
                  >
                    <span className="truncate">{EMAIL}</span>
                    <span className="flex-none text-[11px] font-sans text-baltic-blue">
                      {copied ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-[14px] text-baltic-ink hover:text-baltic-blue transition-colors"
                  >
                    <FiLinkedin className="flex-none" /> LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About column */}
        <div id="about" className="flex-1 flex flex-col gap-6 pt-1 scroll-mt-24">
          <p className="font-serif text-[17px] leading-[1.65] text-baltic-ink">
            I'm a self-taught developer and CS student at{' '}
            <Highlight>University of Southampton</Highlight>, currently a Software
            Engineering Intern at <Highlight>SMMI</Highlight>. I got into code through
            games, and now I build small tools that solve everyday problems — like{' '}
            <Highlight>Terrivia</Highlight>, a geography trivia game, and an AI-driven{' '}
            <Highlight>NYSE Sentiment Analyser</Highlight>. Outside of code: go karting,
            rock climbing, running.
          </p>

          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[12.5px] text-baltic-ink bg-baltic-surface border border-baltic-ink/10 px-2.5 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="bg-baltic-ink rounded-[10px] px-5 py-4 font-mono text-[13.5px] text-baltic-surface shadow-[0_8px_24px_rgba(23,38,58,0.25)]">
            <div className="flex gap-[7px] mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e0796a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#e8b95f]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#9fc1e0]" />
            </div>
            <div className="text-[#9fc1e0]">adamwilkinson@site ~ %</div>
            <div className="mt-1.5 min-h-[20px]">
              {FACTS[fact]}
              <span className="animate-blink">▌</span>
            </div>
            <button
              onClick={cycleFact}
              className="mt-3 inline-block text-[#7ea3c4] underline underline-offset-4 cursor-pointer"
            >
              next fact →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
