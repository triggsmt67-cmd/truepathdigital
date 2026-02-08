
import React from 'react';
import { Linkedin, Twitter, Mail, Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/links';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-white/10 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">

          <div className="md:col-span-4 text-center md:text-left">
            <h4 className="text-2xl font-bold text-white mb-4 tracking-tighter">True Path <span className="text-primary">Digital</span></h4>
            <p className="text-sm text-secondary/60 max-w-xs mx-auto md:mx-0 leading-relaxed font-medium italic">
              Clarity over noise. Decisions over hype.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-secondary hover:text-primary hover:border-primary/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-secondary hover:text-primary hover:border-primary/50 transition-all"
                aria-label="X"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-secondary hover:text-primary hover:border-primary/50 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-secondary hover:text-primary hover:border-primary/50 transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="text-[10px] font-mono text-secondary/40 uppercase tracking-[0.3em]">
              Precision Decisions Alpha
            </div>
          </div>

          <div className="md:col-span-4 text-center md:text-right">
            <p className="text-sm text-secondary/40 mb-1">&copy; {new Date().getFullYear()} True Path Digital. All rights reserved.</p>
            <p className="text-xs text-secondary/40 font-mono">Based in Montana. Built for the World.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
