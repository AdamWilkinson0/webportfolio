import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: 'landing', label: 'About' },
    { to: 'projects', label: 'Projects' },
    { to: 'experience', label: 'Experience' },
  ];

  return (
    <nav className="fixed w-full bg-baltic-bg/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between h-[72px]">
          <Link
            to="landing"
            smooth={true}
            duration={500}
            className="font-mono font-bold text-base text-baltic-ink cursor-pointer"
          >
            adamwilkinson<span className="text-baltic-blue">.</span>site
          </Link>

          <div className="hidden md:flex items-center gap-9 text-sm">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                className="text-baltic-ink hover:text-baltic-blue transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-baltic-ink hover:text-baltic-blue focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? <FiMenu className="h-6 w-6" /> : <FiX className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-baltic-ink/10" id="mobile-menu">
          <div className="px-6 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="text-baltic-ink hover:text-baltic-blue block px-2 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
