import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  ChevronRight,
  Clock,
  Zap,
  BarChart3,
  Terminal,
  Lightbulb,
  Layers,
  BookOpen,
  FileText,
  AlertCircle,
  Loader2,
  Sun,
  Moon
} from 'lucide-react';
import { Category, Article, ViewState } from '../types';
import SectionSeparator from './SectionSeparator';
import BlogIndexSidebar from './BlogIndexSidebar';

interface ResourcesPageProps {
  onNavigate: (view: ViewState, articleData?: Article) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  categories: Category[];
  posts: Article[];
  isLoading: boolean;
  error?: string | null;
}

const CATEGORY_ICON_MAP: Record<string, any> = {
  'growth-strategy': Lightbulb,
  'technical-logic': Terminal,
  'automation-lab': Zap,
  'algorithm-optimization': BarChart3,
  'conversion-design': Layers,
  'field-reports': BookOpen,
  'case-studies': BookOpen,
};

const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onNavigate,
  isDarkMode,
  onToggleTheme,
  categories,
  posts,
  isLoading,
  error
}) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [postsLoading, setPostsLoading] = useState(false); // Kept for transition effect if needed, but mostly unused now

  const articleSectionRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(prev => prev === slug ? null : slug);
    // Simulate a tiny loading state for UX (optional, can be removed for instant switch)
    setPostsLoading(true);
    setTimeout(() => {
      setPostsLoading(false);
      articleSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);

  };

  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by Category
    if (selectedCategorySlug) {
      result = result.filter(p =>
        p.categorySlug === selectedCategorySlug ||
        (p.allCategories && p.allCategories.includes(selectedCategorySlug))
      );
    }

    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, searchQuery, selectedCategorySlug]);

  const activeCategory = useMemo(() =>
    categories.find(c => c.slug === selectedCategorySlug),
    [selectedCategorySlug, categories]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center gap-6 transition-colors duration-500 ${isDarkMode ? 'bg-[#121417]' : 'bg-slate-50'}`}>
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase animate-pulse text-secondary">Loading Intelligence...</p>
      </div>
    );
  }

  return (
    <div className={`pt-32 pb-20 min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#121417]' : 'bg-slate-50'}`}>
      <button
        onClick={onToggleTheme}
        className={`fixed bottom-28 right-8 z-[60] p-4 rounded-full border transition-all shadow-xl group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:border-primary/50' : 'bg-white border-slate-200 text-slate-900 hover:border-primary/50 shadow-lg'
          }`}
      >
        <AnimatePresence mode="wait">
          <motion.div key={isDarkMode ? 'dark' : 'light'} initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2 }}>
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </button>

      <section className="relative px-6 overflow-hidden pt-12">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[150px] rounded-full pointer-events-none bg-primary/5`} />
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">The Intelligence Vault</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-8">
              Clear thinking for when the <br className="hidden md:block" />
              right move isn’t obvious.
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Notes, frameworks, and field-tested insights on making better marketing decisions — without chasing trends or tools.
            </p>
            <div className="max-w-xl mx-auto relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-white/20" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by question, not keyword…"
                className="w-full border border-white/5 rounded-full py-4 pl-12 pr-6 bg-white/[0.02] text-white focus:outline-none focus:border-white/10 transition-all placeholder:text-white/20 text-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div ref={articleSectionRef} className="scroll-mt-32">
        <AnimatePresence mode="wait">
          <motion.section
            key={selectedCategorySlug || 'latest'}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-12 px-6 relative z-10"
          >
            <div className="max-w-[1400px] mx-auto py-12 flex flex-col lg:flex-row gap-16">

              <div className="flex-1">
                <div className="flex flex-col gap-4 mb-12">
                  <div className="flex items-center gap-4">
                    {activeCategory ? (
                      <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                        {React.createElement(CATEGORY_ICON_MAP[activeCategory.slug] || FileText, { className: "w-6 h-6" })}
                      </div>
                    ) : (
                      <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                        <BarChart3 className="w-6 h-6" />
                      </div>
                    )}
                    <h2 className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {activeCategory ? activeCategory.name : 'Recent Thinking'}
                    </h2>
                  </div>
                  <p className="text-lg max-w-2xl leading-relaxed text-secondary">
                    {activeCategory?.description || "Observations, notes, and frameworks from the field."}
                  </p>
                </div>

                {postsLoading ? (
                  <div className={`py-20 flex flex-col items-center justify-center gap-4 border rounded-3xl ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-slate-200 bg-white shadow-sm'}`}>
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/40">Loading...</span>
                  </div>
                ) : error ? (
                  <div className={`py-20 flex flex-col items-center justify-center gap-4 border rounded-3xl text-center px-6 ${isDarkMode ? 'border-red-500/20 bg-red-500/5' : 'border-red-200 bg-red-50'}`}>
                    <AlertCircle className="w-10 h-10 text-red-500" />
                    <h3 className="text-xl font-bold text-red-500 tracking-tight">Sync Error</h3>
                    <p className={`text-sm max-w-md ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                      {error || "Failed to establish secure connection to the Intelligence Vault."}
                    </p>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className={`py-20 flex flex-col items-center justify-center gap-4 border rounded-3xl text-center px-6 ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-slate-200 bg-white shadow-sm'}`}>
                    <AlertCircle className="w-10 h-10 text-gray-700" />
                    <h3 className="text-xl font-bold text-secondary tracking-tight">No Matches Found</h3>
                    <p className="text-secondary/60 text-sm max-w-xs">No articles matched your search. Try a different query.</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredPosts.map((article, idx) => (
                      <motion.div
                        key={article.slug}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => onNavigate('article', article)}
                        className={`group border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all cursor-pointer ${isDarkMode
                          ? 'bg-[#121417] border-white/10 hover:border-primary/40 hover:bg-white/[0.02]'
                          : 'bg-white border-slate-200 hover:border-primary hover:shadow-lg shadow-sm'}`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[9px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20 tracking-widest uppercase">Premium Access</span>
                            <div className={`flex items-center gap-1.5 text-[11px] font-mono transition-colors ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}><Clock className="w-3.5 h-3.5" />{article.publishDate}</div>
                          </div>
                          <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-colors group-hover:text-primary ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{article.title}</h3>
                          <p className={`text-sm md:text-base leading-relaxed line-clamp-2 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{article.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors">
                            Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <BlogIndexSidebar
                categories={categories}
                isDarkMode={isDarkMode}
                onCategoryClick={handleCategoryClick}
                selectedCategorySlug={selectedCategorySlug}
                onNavigate={(slug) => {
                  const art = posts.find(p => p.slug === slug);
                  if (art) onNavigate('article', art);
                }}
              />
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
      <div className="h-20" />
    </div >
  );
};

export default ResourcesPage;
