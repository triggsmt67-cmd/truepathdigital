
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  Zap,
  Bookmark,
  Sun,
  Moon,
  CheckCircle2,
  HelpCircle,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { Article } from '../types';
import { SOCIAL_LINKS } from '../constants/links';
import { wpQuery } from '../lib/gql';
import { cleanExcerpt, cleanWpHtml, parseTakeaways, parseFaqs, normalizeBlogPost } from '../lib/utils';


interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const GET_POST_DETAIL = `
  query GetPostDetail($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content(format: RENDERED)
      excerpt(format: RENDERED)
      date
      featuredImage {
        node {
          sourceUrl(size: LARGE)
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      aiOverviews {
        ai_overviews {
          ai_quick_answer
          ai_takeaways
          ai_faqs
        }
      }
    }
  }
`;

const AIScanZone: React.FC<{ data?: Article['aiData'], isDarkMode: boolean }> = ({ data, isDarkMode }) => {
  if (!data || (!data.aiQuickAnswer && !data.aiTakeaways?.length && !data.aiFaqs?.length)) return null;

  return (
    <div className={`mb-10 rounded-3xl border overflow-hidden transition-all ${isDarkMode
      ? 'bg-primary/5 border-primary/20'
      : 'bg-orange-50/50 border-orange-100/60 shadow-sm'
      }`}>
      <div className={`px-6 py-3 border-b flex items-center gap-2 ${isDarkMode ? 'bg-primary/10 border-primary/10' : 'bg-orange-100/50 border-orange-100'}`}>
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">Protocol Summary (AI Generated)</span>
      </div>

      <div className="p-8 space-y-8">
        {data.aiQuickAnswer && (
          <div className="space-y-3">
            <h4 className={`text-sm font-bold uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Executive Summary</h4>
            <p className={`text-lg italic leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              "{data.aiQuickAnswer}"
            </p>
          </div>
        )}

        {data.aiTakeaways && data.aiTakeaways.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {data.aiTakeaways.map((takeaway, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{takeaway}</span>
              </div>
            ))}
          </div>
        )}

        {data.aiFaqs && data.aiFaqs.length > 0 && (
          <div className={`pt-6 border-t ${isDarkMode ? 'border-white/5' : 'border-orange-100'}`}>
            <h4 className={`text-sm font-bold uppercase tracking-tighter mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <HelpCircle className="w-4 h-4 text-primary" />
              Quick Intelligence
            </h4>
            <div className="space-y-4">
              {data.aiFaqs.map((faq, i) => (
                <div key={i} className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-white border border-slate-100'}`}>
                  <div className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{faq.question}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack, isDarkMode, onToggleTheme }) => {
  const [fullArticle, setFullArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (fullArticle) {
      document.title = `${fullArticle.title} | True Path Digital`;
      return () => { document.title = 'True Path Digital | Stop Guessing. Start Arriving.'; };
    }
  }, [fullArticle]);

  useEffect(() => {
    setShareUrl(window.location.href);

    async function fetchDetail() {
      try {
        setLoading(true);
        const data = await wpQuery<{ post: any }>(GET_POST_DETAIL, { slug: article.slug });

        if (!data?.post) {
          setError("The requested blueprint could not be located in the vault.");
          setLoading(false);
          return;
        }

        const p = data.post;
        const title = p.title || 'Untitled Protocol';
        const rawAi = p.aiOverviews?.ai_overviews;

        // Find the most relevant Overview if it's an array (ACF can sometimes be messy)
        let aiDataRaw = Array.isArray(rawAi) ? rawAi[0] : rawAi;
        if (Array.isArray(rawAi) && rawAi.length > 1) {
          const titleWords = title.toLowerCase().split(' ').filter(w => w.length > 3);
          const match = rawAi.find(item =>
            titleWords.some(word => item.ai_quick_answer?.toLowerCase().includes(word))
          );
          if (match) aiDataRaw = match;
        }

        const dateStr = p.date ? new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date';

        // Extract full first paragraph for hero lead instead of truncated excerpt
        // We look for the first non-empty paragraph tag in the content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = p.content || '';

        let firstP = '';
        const paragraphs = tempDiv.querySelectorAll('p');
        for (let i = 0; i < paragraphs.length; i++) {
          const text = paragraphs[i].textContent || '';
          // Ensure it's substantial enough to be a lead (avoiding empty spacers)
          if (text.trim().length > 40) {
            firstP = text.trim();
            break;
          }
        }

        // If no valid first paragraph found in content, fallback to cleaned excerpt
        const cleanEx = firstP || cleanExcerpt(p.excerpt || '', title);

        // Advanced Normalization for Canonical Structure
        // PASS cleanEx explicitly so normalizeBlogPost can remove it from validity blocks
        const normalizedBlocks = normalizeBlogPost(p.content || '', title, cleanEx, 'Trevor Riggs', dateStr);

        setFullArticle({
          slug: article.slug,
          title: title,
          excerpt: cleanEx,
          blocks: normalizedBlocks,
          image: p.featuredImage?.node?.sourceUrl || article.image,
          category: p.categories?.nodes[0]?.name || 'Uncategorized',
          categorySlug: p.categories?.nodes[0]?.slug || 'uncategorized',
          readTime: '12 min',
          publishDate: dateStr,
          aiData: aiDataRaw ? {
            aiQuickAnswer: aiDataRaw.ai_quick_answer || '',
            aiTakeaways: parseTakeaways(aiDataRaw.ai_takeaways || ''),
            aiFaqs: parseFaqs(aiDataRaw.ai_faqs || '')
          } : undefined
        });

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchDetail();
  }, [article.slug, article.image]);

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'heading':
        if (block.level === 1) return null; // Already shown in hero
        const Tag = (block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4') as 'h2' | 'h3' | 'h4';
        const baseClass = `font-semibold tracking-tight ${index === 0 ? 'mt-0' : 'mt-12'} mb-6 transition-colors`;
        const levelClass = block.level === 2 ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl";
        const colorClass = isDarkMode ? "text-white" : "text-slate-900";
        return <Tag key={index} className={`${baseClass} ${levelClass} ${colorClass}`}>{block.content}</Tag>;

      case 'paragraph':
        return (
          <p key={index} className={`text-lg md:text-xl leading-relaxed mb-8 transition-colors ${isDarkMode ? "text-gray-300" : "text-slate-700"
            }`}>
            {block.content}
          </p>
        );

      case 'list':
        return (
          <ul key={index} className="space-y-4 mb-8">
            {(block.content as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-3" />
                <span className={`text-lg md:text-xl leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        );

      case 'emphasis':
        return (
          <div key={index} className={`my-12 p-8 border-l-4 border-primary italic rounded-r-2xl transition-all ${isDarkMode ? "bg-white/[0.03] text-white" : "bg-primary/[0.05] text-slate-900"
            }`}>
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              "{block.content}"
            </p>
          </div>
        );

      case 'quote':
        return (
          <blockquote key={index} className={`my-12 p-8 border-l-4 border-gray-500 italic rounded-r-2xl bg-white/[0.05] ${isDarkMode ? "text-gray-400" : "text-slate-500"
            }`}>
            <p className="text-xl leading-relaxed">
              {block.content}
            </p>
          </blockquote>
        );

      default:
        return null;
    }
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'email' | 'copy') => {
    // ... existing handleShare ...
    const text = `Check out this technical blueprint: ${fullArticle?.title || article.title}`;
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(fullArticle?.title || article.title)}&body=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121417] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-mono text-sm tracking-widest uppercase animate-pulse">Decrypting Protocol Alpha...</p>
      </div>
    );
  }

  if (error || !fullArticle) {
    return (
      <div className="min-h-screen bg-[#121417] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500/50" />
        <h2 className="text-3xl font-bold text-white tracking-tight">Access Denied</h2>
        <p className="text-gray-500 max-w-md leading-relaxed">{error || "System could not initialize requested protocol."}</p>
        <button onClick={onBack} className="mt-8 px-8 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors">Return to Vault</button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#121417] text-ice' : 'bg-slate-50 text-slate-900'} selection:bg-primary/30 pb-20`}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />

      <button
        onClick={onToggleTheme}
        className={`fixed bottom-28 right-8 z-[60] p-4 rounded-full border transition-all shadow-xl group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:border-primary/50' : 'bg-white border-slate-200 text-slate-900 hover:border-primary/50'
          }`}
      >
        <AnimatePresence mode="wait">
          <motion.div key={isDarkMode ? 'dark' : 'light'} initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2 }}>
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </button>

      <section className="relative min-h-[50vh] md:min-h-[55vh] pt-32 w-full overflow-hidden flex items-end pb-8">
        <div className="absolute inset-0 z-0">
          <img src={fullArticle.image} alt={fullArticle.title} className={`w-full h-full object-cover transition-all duration-700 ${isDarkMode ? 'grayscale opacity-60' : 'opacity-80'}`} />
          <div className={`absolute inset-0 transition-colors duration-500 bg-gradient-to-t ${isDarkMode ? 'from-[#121417] via-[#121417]/60 to-transparent' : 'from-slate-50 via-slate-50/40 to-transparent'}`} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <button onClick={onBack} className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-8 group transition-colors ${isDarkMode ? 'text-primary hover:text-white' : 'text-primary hover:text-slate-900'}`}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return to Insights
            </button>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-colors ${isDarkMode ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                {fullArticle.category}
              </span>
              <div className={`flex items-center gap-1.5 text-xs font-mono transition-colors ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}><Clock className="w-3.5 h-3.5" /> {fullArticle.publishDate}</div>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 max-w-4xl transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{fullArticle.title}</h1>

            <div className="max-w-4xl mb-12">
              <AIScanZone data={fullArticle.aiData} isDarkMode={isDarkMode} />
            </div>

            {fullArticle.excerpt && (
              <p className={`text-lg md:text-xl font-normal leading-relaxed transition-colors max-w-3xl ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                {fullArticle.excerpt}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="pt-6 pb-20 px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">

            <div className={`prose prose-lg md:prose-xl max-w-none transition-all duration-300 ${isDarkMode
              ? 'prose-invert prose-orange text-gray-300'
              : 'prose-slate text-slate-800'
              }`}>
              {fullArticle.blocks?.map((block, idx) => renderBlock(block as any, idx))}
            </div>

            <div className={`mt-20 pt-12 border-t flex flex-col md:flex-row items-center justify-between gap-8 transition-colors ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <button onClick={onBack} className={`px-8 py-4 rounded-full border font-bold transition-all flex items-center gap-3 ${isDarkMode ? 'bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.08] hover:border-primary/30' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-primary/30 shadow-sm'}`}>
                <ArrowLeft className="w-5 h-5" /> Back to Insights
              </button>
              <div className="flex items-center gap-3">
                {[
                  { id: 'twitter', icon: Twitter },
                  { id: 'linkedin', icon: Linkedin },
                  { id: 'email', icon: Mail },
                  { id: 'copy', icon: LinkIcon }
                ].map((item) => (
                  <button key={item.id} onClick={() => handleShare(item.id as any)} className={`p-3.5 rounded-full border transition-all group ${isDarkMode ? 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-primary/50' : 'bg-white border-slate-200 text-slate-500 hover:text-primary hover:border-primary/50'}`}>
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                ))}
                <div className={`w-px h-6 mx-2 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                <button className={`p-3.5 rounded-full border transition-all group ${isDarkMode ? 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-primary hover:border-primary/50' : 'bg-white border-slate-200 text-slate-500 hover:text-primary hover:border-primary/50'}`}>
                  <Bookmark className="w-4 h-4 group-hover:fill-primary transition-all" />
                </button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className={`p-8 rounded-3xl border sticky top-32 transition-all ${isDarkMode ? 'bg-[#121417] border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
              <h4 className={`text-xs font-mono tracking-widest uppercase mb-6 ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Published By</h4>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full overflow-hidden border ${isDarkMode ? 'border-primary/40' : 'border-primary/20'}`}>
                  <img src="https://admin.truepath406.com/wp-content/uploads/2025/12/Gemini_Generated_Image_gqrc0ygqrc0ygqrc.jpg" className="w-full h-full object-cover filter grayscale" alt="Author" />
                </div>
                <div>
                  <div className={`font-bold text-lg transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Trevor Riggs</div>
                  <div className="text-primary text-xs font-mono uppercase tracking-widest">Founder / Architect</div>
                </div>
              </div>
              <p className={`text-sm leading-relaxed mb-6 transition-colors ${isDarkMode ? 'text-gray-500' : 'text-slate-600'}`}>25+ years engineering high-conversion sales systems and digital infrastructure.</p>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-xl bg-primary text-white font-bold text-sm text-center transition-transform hover:scale-105 shadow-[0_10px_20px_-5px_rgba(255,107,0,0.3)]">Connect on LinkedIn</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ArticleView;
