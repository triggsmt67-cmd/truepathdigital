
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureSplit from './components/FeatureSplit';
import MissionSection from './components/MissionSection';
import Solutions from './components/Solutions';
import TrailGrid from './components/TrailGrid';
import AboutSection from './components/AboutSection';
import StakesSection from './components/StakesSection';
import Footer from './components/Footer';
import SectionSeparator from './components/SectionSeparator';
import ResourcesPage from './components/ResourcesPage';
import ArticleView from './components/ArticleView';
import ComparisonSection from './components/ComparisonSection';
import QuoteSection from './components/QuoteSection';
import SuccessStories from './components/SuccessStories';
import ScrollTopProgress from './components/ScrollTopProgress';
import { Compass } from 'lucide-react';
import { ViewState, Article } from './types';

const WipeOverlay = ({ isWiping }: { isWiping: boolean }) => {
  return (
    <AnimatePresence>
      {isWiping && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[100] bg-primary flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/10 mix-blend-overlay"
          />
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,20,23,0)_50%,rgba(18,20,23,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02),rgba(255,255,255,0.05))] bg-[length:100%_4px,6px_100%]" />
          <div className="flex flex-col items-center gap-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-center gap-3"
            >
              <Compass className="w-12 h-12 text-white" />
              <span className="text-2xl font-bold text-white tracking-tighter">TRUE PATH</span>
            </motion.div>
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-full bg-white shadow-[0_0_15px_#fff]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isWiping, setIsWiping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Transition Guard
  useEffect(() => {
    if (isWiping) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isWiping]);

  const navigateWithWipe = useCallback((view: ViewState, articleData?: Article) => {
    if (isWiping) return; // Guard against rapid clicks
    if (view === currentView && !articleData && window.scrollY < 100) return;

    setIsWiping(true);

    // Core view flip at the mid-point of the wipe
    const timer = setTimeout(() => {
      setCurrentView(view);
      if (articleData) setSelectedArticle(articleData);
      window.scrollTo(0, 0);
    }, 400);

    const cleanup = setTimeout(() => {
      setIsWiping(false);
    }, 850);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, [isWiping, currentView]);

  const handleBackToTop = () => {
    if (isWiping) return;
    if (window.scrollY < 200) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsWiping(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 400);
    setTimeout(() => {
      setIsWiping(false);
    }, 850);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'resources':
        return <ResourcesPage onNavigate={navigateWithWipe} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />;
      case 'article':
        return selectedArticle ? (
          <ArticleView article={selectedArticle} onBack={() => navigateWithWipe('resources')} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
        ) : <ResourcesPage onNavigate={navigateWithWipe} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />;
      default:
        return (
          <>
            <Hero />
            <SectionSeparator number="01" title="REALITY CHECK" />
            <ComparisonSection />

            <SectionSeparator number="02" title="GROWTH ENGINE" />
            <FeatureSplit />
            <QuoteSection />

            <SectionSeparator number="03" title="THE MISSION" />
            <MissionSection />

            <SectionSeparator number="04" title="INFRASTRUCTURE" />
            <Solutions />

            <SectionSeparator number="05" title="THE PROTOCOL" />
            <TrailGrid />

            <SectionSeparator number="06" title="THE CHOICE" />
            <StakesSection />

            <SectionSeparator number="07" title="THE ARCHITECT" />
            <AboutSection />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-primary selection:text-white relative overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-background text-ice' : 'bg-slate-50 text-slate-900'}`}>
      <WipeOverlay isWiping={isWiping} />
      <ScrollTopProgress onBackToTop={handleBackToTop} />

      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
        <div className="w-full max-w-[1400px] h-full border-l border-white/[0.03] border-r border-white/[0.03] flex justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full w-px bg-white/[0.03]"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Navbar currentView={currentView} onNavigate={(view) => navigateWithWipe(view)} />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView === 'article' ? `article-${selectedArticle?.slug}` : currentView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
