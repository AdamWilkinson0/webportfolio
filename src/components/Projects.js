import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProjectCard = ({ name, tagline, technologies, images, link }) => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-full bg-baltic-bg rounded-[10px] overflow-hidden border border-baltic-ink/10 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:rotate-[-0.6deg] hover:shadow-[0_16px_34px_rgba(23,38,58,0.2)]"
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

const getItemsPerView = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

const Projects = () => {
  const projects = [
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
      technologies: ['Kotlin', 'Jetpack Compose', 'Android NFC'],
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
    {
      name: 'Countrivia',
      tagline: 'Geography quiz: map & typing challenge modes.',
      technologies: ['JavaScript', 'HTML/CSS'],
      images: ['/images/countrivia-1.png', '/images/countrivia-2.png'],
      link: 'https://countriviaa.netlify.app',
    },
  ];

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const viewportRef = useRef(null);
  const wheelAccum = useRef(0);
  const wheelLock = useRef(0);
  const lastWheel = useRef(0);

  useEffect(() => {
    const onResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const move = (delta) => setIndex((i) => Math.min(Math.max(i + delta, 0), maxIndex));

  // Two-finger trackpad swipes: React's onWheel is passive, so bind it directly
  // to keep the page (and browser back-navigation) from taking the gesture.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current > 200) wheelAccum.current = 0;
      lastWheel.current = now;
      if (now < wheelLock.current) return;
      wheelAccum.current += e.deltaX;
      if (Math.abs(wheelAccum.current) > 40) {
        move(wheelAccum.current > 0 ? 1 : -1);
        wheelAccum.current = 0;
        wheelLock.current = now + 450;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [maxIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const onTouchEnd = (e) => {
    if (touchStartX === null) return;
    const distance = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
    setTouchStartX(null);
  };

  // Straddles the outer edge of the first/last visible card, centred on the artwork.
  const arrowClass =
    'absolute top-[124px] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-baltic-bg border border-baltic-ink/15 text-baltic-ink shadow-[0_4px_14px_rgba(23,38,58,0.18)] transition-all duration-200 hover:bg-white hover:shadow-[0_6px_18px_rgba(23,38,58,0.25)] disabled:opacity-25 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-baltic-bg';

  return (
    <section id="projects" className="bg-baltic-surface py-16 lg:py-20 px-6 sm:px-10 lg:px-14 scroll-mt-16">
      <div className="container mx-auto">
        <h2 className="font-mono font-bold text-[26px] text-baltic-ink mb-8">Projects</h2>
        <div className="relative">
          <div
            ref={viewportRef}
            className="overflow-hidden -mx-3 -my-3 py-3"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * (100 / itemsPerView)}%)` }}
            >
              {projects.map((project, i) => (
                <div key={i} className="flex-none px-3" style={{ width: `${100 / itemsPerView}%` }}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
          {maxIndex > 0 && (
            <>
              <button
                onClick={() => move(-1)}
                disabled={index === 0}
                className={`${arrowClass} left-0 -translate-x-1/2`}
                aria-label="Previous projects"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={() => move(1)}
                disabled={index === maxIndex}
                className={`${arrowClass} right-0 translate-x-1/2`}
                aria-label="Next projects"
              >
                <FiChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-7">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-baltic-ink' : 'w-2 bg-baltic-ink/25 hover:bg-baltic-ink/45'
                }`}
                aria-label={`Show projects ${i + 1} to ${i + itemsPerView}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
