
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/links';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-10 md:py-16 bg-[#121417] relative overflow-hidden border-t border-white/5">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">

          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-orange-600 rounded-2xl blur opacity-20 transform translate-x-2 translate-y-2"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] group">
              <img
                src="https://admin.truepath406.com/wp-content/uploads/2025/12/Gemini_Generated_Image_gqrc0ygqrc0ygqrc.jpg"
                alt="Trevor Riggs, Founder"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,20,23,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none opacity-60"></div>
            </div>
          </motion.div>

          {/* Right Column: Credibility & Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-4 text-gray-400 font-mono text-xs md:text-sm uppercase tracking-widest font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Credibility</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
              Decisions Over Hype.
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-light">
              <p>
                I work with <span className="text-white font-medium">Montana-based businesses</span> that need clarity during change.
                That usually means paid growth decisions, system cleanup, and figuring out what actually deserves attention when everything feels noisy.
              </p>
              <p>
                I’m not interested in chasing trends or shipping tactics for the sake of activity. My work is about helping owners slow things down, see the signal, and make decisions they can stand behind.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3 text-primary mb-1">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-white font-medium">Where AI helps</span>
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    Automation that reduces effort and noise — not replaces judgment or adds complexity.
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3 text-primary mb-1">
                    <FileText className="w-5 h-5" />
                    <span className="text-white font-medium">What’s been proven</span>
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    Examples, references, and past work available by request.
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA Button */}
            <div className="text-center sm:text-left">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex h-14 overflow-hidden rounded-full p-[2px] focus:outline-none group shadow-[0_0_50px_-10px_rgba(255,107,0,0.5)] w-full sm:w-auto"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#FF6B00_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#121417] px-8 text-lg font-medium text-white backdrop-blur-3xl gap-3 transition-colors group-hover:bg-[#111]">
                  Start with a conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
