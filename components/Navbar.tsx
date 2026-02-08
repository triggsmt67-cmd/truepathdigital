
import React, { useState, useEffect } from 'react';
import { Compass, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../types';
import { CONTACT_LINKS } from '../constants/links';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLandingLink = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
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
        backgroundColor: isScrolled ? 'rgba(18, 20, 23, 0.75)' : 'rgba(18, 20, 23, 0)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        borderColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
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
          <div className="relative">
            <Compass className="w-8 h-8 text-primary group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            True Path <span className="text-white/50 font-normal">Digital</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#hero"
            onClick={(e) => handleLandingLink(e, '#hero')}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#how-i-work"
            onClick={(e) => handleLandingLink(e, '#how-i-work')}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            How I Work
          </a>
          <a
            href="#about"
            onClick={(e) => handleLandingLink(e, '#about')}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            About
          </a>

          <button
            onClick={() => onNavigate('resources')}
            className={`text-sm font-medium transition-colors ${(currentView === 'resources' || currentView === 'article') ? 'text-primary' : 'text-secondary hover:text-white'}`}
          >
            Insights
          </button>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
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
                className="text-lg text-gray-300 hover:text-primary font-medium"
                onClick={(e) => { handleLandingLink(e, '#hero'); setMobileMenuOpen(false); }}
              >
                Home
              </a>
              <a
                href="#how-i-work"
                className="text-lg text-gray-300 hover:text-primary font-medium"
                onClick={(e) => { handleLandingLink(e, '#how-i-work'); setMobileMenuOpen(false); }}
              >
                How I Work
              </a>
              <a
                href="#about"
                className="text-lg text-gray-300 hover:text-primary font-medium"
                onClick={(e) => { handleLandingLink(e, '#about'); setMobileMenuOpen(false); }}
              >
                About
              </a>

              <button
                onClick={() => { onNavigate('resources'); setMobileMenuOpen(false); }}
                className={`text-lg text-left font-medium ${(currentView === 'resources' || currentView === 'article') ? 'text-primary' : 'text-gray-300'}`}
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
