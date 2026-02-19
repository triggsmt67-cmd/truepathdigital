
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../types';
import { CONTACT_LINKS } from '../constants/links';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isDarkMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, isDarkMode = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState<string>('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active segment based on scroll position for landing page
      if (currentView === 'landing') {
        const sections = ['hero', 'how-i-work', 'about'];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const { top, bottom } = el.getBoundingClientRect();
            const absoluteTop = top + window.scrollY;
            const absoluteBottom = bottom + window.scrollY;

            if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
              setActiveSegment(`#${section}`);
              break;
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleLandingLink = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSegment(id); // Optimistic update
    if (currentView !== 'landing') {

      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id.replace('#', ''));
        if (el) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 450);
    } else {
      const el = document.getElementById(id.replace('#', ''));
      if (el) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        y: isScrolled ? 12 : 0,
        scale: isScrolled ? 0.98 : 1,
        backgroundColor: isScrolled
          ? (isDarkMode ? 'rgba(18, 20, 23, 0.75)' : 'rgba(255, 255, 255, 0.85)')
          : 'rgba(0, 0, 0, 0)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        borderColor: isScrolled
          ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')
          : 'rgba(0, 0, 0, 0)',
        borderRadius: isScrolled ? '24px' : '0px',
        width: isScrolled ? 'calc(100% - 32px)' : '100%',
        margin: isScrolled ? '0 16px' : '0 0',
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b flex justify-center py-4"
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { onNavigate('landing'); }}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className={`font-semibold text-lg tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            True Path <span className={`font-normal transition-colors ${isDarkMode ? 'text-secondary' : 'text-slate-400'}`}>Digital</span>
          </span>
        </button>

        <div className={`hidden md:flex items-center gap-2 border rounded-full p-1.5 backdrop-blur-md transition-all ${isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-slate-100/50 border-slate-200'
          }`}>
          {[
            { id: '#hero', label: 'Home', view: 'landing' },
            { id: '#how-i-work', label: 'How I Work', view: null },
            { id: '#about', label: 'About', view: null },
            { id: 'resources', label: 'Insights', view: 'resources' }
          ].map((item) => {
            const isActive = item.id.startsWith('#')
              ? currentView === 'landing' && activeSegment === item.id
              : currentView === item.view || (item.view === 'resources' && currentView === 'article');


            return (
              <div key={item.label} className="relative">
                <a
                  href={item.id.startsWith('#') ? item.id : undefined}
                  onClick={(e) => {
                    if (item.id.startsWith('#')) {
                      handleLandingLink(e, item.id);
                    } else {
                      onNavigate('resources');
                    }
                  }}
                  className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 block ${isActive
                      ? (isDarkMode ? 'text-white' : 'text-slate-900')
                      : (isDarkMode ? 'text-secondary hover:text-white' : 'text-slate-500 hover:text-slate-900')
                    }`}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-full z-0 ${isDarkMode ? 'bg-white/10' : 'bg-white shadow-sm'}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            );
          })}
        </div>


        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href={CONTACT_LINKS.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-[#ff8533] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transform hover:-translate-y-0.5"
          >
            Start with a conversation
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <a
                href="#hero"
                className="text-lg text-secondary hover:text-primary font-medium"
                onClick={(e) => { handleLandingLink(e, '#hero'); setMobileMenuOpen(false); }}
              >
                Home
              </a>
              <a
                href="#how-i-work"
                className="text-lg text-secondary hover:text-primary font-medium"
                onClick={(e) => { handleLandingLink(e, '#how-i-work'); setMobileMenuOpen(false); }}
              >
                How I Work
              </a>
              <a
                href="#about"
                className="text-lg text-secondary hover:text-primary font-medium"
                onClick={(e) => { handleLandingLink(e, '#about'); setMobileMenuOpen(false); }}
              >
                About
              </a>

              <button
                onClick={() => { onNavigate('resources'); setMobileMenuOpen(false); }}
                className={`text-lg text-left font-medium ${(currentView === 'resources' || currentView === 'article') ? 'text-primary' : 'text-secondary'}`}
              >
                Insights
              </button>
              <a
                href={CONTACT_LINKS.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-primary w-full py-3 rounded-full text-white font-bold"
              >
                Start with a conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
