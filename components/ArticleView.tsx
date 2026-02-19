
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
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">Protocol Summary</span>
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
      // SEO: Normal Browser Title
      document.title = `${fullArticle.title} | True Path Digital`;

      // SEO: Dynamic Meta Tags for traditional SERPs and AI Crawlers
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', fullArticle.excerpt || '');
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', fullArticle.title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', fullArticle.excerpt || '');

      // AI SEO: Inject JSON-LD Structured Data
      // This is the "God Mode" for AI crawlers (Perplexity, OpenAI, etc.)
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": fullArticle.title,
        "description": fullArticle.excerpt,
        "image": fullArticle.image,
        "datePublished": fullArticle.publishDate,
        "author": {
          "@type": "Person",
          "name": "Trevor Riggs",
          "jobTitle": "Founder & Architect",
          "url": SOCIAL_LINKS.linkedin
        },
        "publisher": {
          "@type": "Organization",
          "name": "True Path Digital",
          "logo": {
            "@type": "ImageObject",
            "url": "https://admin.truepath406.com/wp-content/uploads/2025/12/Gemini_Generated_Image_gqrc0ygqrc0ygqrc.jpg"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'article-structured-data';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        document.title = 'True Path Digital | Clear Thinking for Montana Business Owners';
        const scriptToRemove = document.getElementById('article-structured-data');
        if (scriptToRemove) scriptToRemove.remove();
      };
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
        <p className="text-secondary/40 font-mono text-[10px] tracking-widest uppercase animate-pulse">Loading Thinking...</p>
      </div>
    );
  }

  if (error || !fullArticle) {
    return (
      <div className="min-h-screen bg-[#121417] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500/50" />
        <h2 className="text-3xl font-bold text-white tracking-tight">Article Not Found</h2>
        <p className="text-secondary max-w-md leading-relaxed">{error || "The requested piece could not be found."}</p>
        <button onClick={onBack} className="mt-8 px-8 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors">Return to Vault</button>
      </div>
    );
  }

  return (
    <article className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#121417] text-ice' : 'bg-slate-50 text-slate-900'} selection:bg-primary/30 pb-20`}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />

      <button
        onClick={onToggleTheme}
        aria-label="Toggle Theme"
        className={`fixed bottom-28 right-8 z-[60] p-4 rounded-full border transition-all shadow-xl group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:border-primary/50' : 'bg-white border-slate-200 text-slate-900 hover:border-primary/50'
          }`}
      >
        <AnimatePresence mode="wait">
          <motion.div key={isDarkMode ? 'dark' : 'light'} initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2 }}>
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </button>

      <section className="relative pt-32 pb-16 md:pb-24 px-6 overflow-hidden">
        {/* Subtle background architecture */}
        <div className={`absolute top-0 left-0 w-full h-[600px] opacity-20 pointer-events-none ${isDarkMode ? 'bg-gradient-to-b from-primary/10 to-transparent' : 'bg-gradient-to-b from-primary/5 to-transparent'}`} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column: Intelligence Detail */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={onBack}
                className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] mb-10 group transition-colors ${isDarkMode ? 'text-primary hover:text-white' : 'text-primary hover:text-slate-900'}`}
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Return to Intelligence Vault
              </button>

              <div className="flex items-center gap-4 mb-8">
                <span className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-colors ${isDarkMode ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-primary/5 border-primary/10 text-primary'}`}>
                  {fullArticle.category}
                </span>
                <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors ${isDarkMode ? 'text-secondary/40' : 'text-slate-400'}`}>
                  <Clock className="w-3 h-3" /> {fullArticle.publishDate}
                </div>
              </div>

              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] mb-10 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {fullArticle.title}
              </h1>

              {fullArticle.excerpt && (
                <p className={`text-xl md:text-2xl font-light leading-relaxed transition-colors border-l-2 pl-8 ${isDarkMode ? 'text-secondary border-primary/30' : 'text-slate-600 border-primary/20'}`}>
                  {fullArticle.excerpt}
                </p>
              )}
            </motion.div>

            {/* Right Column: Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative aspect-[4/3] lg:aspect-auto lg:h-[550px]"
            >
              <div className={`absolute inset-0 rounded-[2rem] overflow-hidden border shadow-2xl transition-colors ${isDarkMode ? 'border-white/10 shadow-primary/5' : 'border-slate-200 shadow-slate-200/50'}`}>
                <img
                  src={fullArticle.image}
                  alt={fullArticle.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${isDarkMode ? 'grayscale-[0.2] contrast-[1.1]' : ''}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none`} />
              </div>

              {/* Decorative artifacts */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full" />
            </motion.div>
          </div>

          {/* AI Zone Transition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 lg:mt-20 max-w-5xl"
          >
            <AIScanZone data={fullArticle.aiData} isDarkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      <section className="pt-6 pb-20 px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16">
          <main className="lg:col-span-8">

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
          </main>

          <aside className="lg:col-span-4">
            <div className={`p-8 rounded-3xl border sticky top-32 transition-all relative overflow-hidden ${isDarkMode ? 'bg-[#121417]/80 backdrop-blur-md border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
              <div className={`absolute -top-10 -left-10 w-32 h-32 blur-[80px] rounded-full opacity-30 pointer-events-none ${isDarkMode ? 'bg-primary' : 'bg-primary/20'}`} />

              <h4 className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-8 transition-colors ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Published By</h4>

              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl overflow-hidden border p-0.5 transition-colors ${isDarkMode ? 'border-primary/40 bg-primary/10' : 'border-primary/20 bg-primary/5'}`}>
                  <img src="https://admin.truepath406.com/wp-content/uploads/2025/12/Gemini_Generated_Image_gqrc0ygqrc0ygqrc.jpg" className="w-full h-full object-cover rounded-[14px] filter grayscale group-hover:grayscale-0 transition-all" alt="Author" loading="lazy" />
                </div>
                <div>
                  <div className={`font-bold text-xl tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Trevor Riggs</div>
                  <div className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">Founder / Architect</div>
                </div>
              </div>

              <p className={`text-sm leading-relaxed mb-10 transition-colors font-light ${isDarkMode ? 'text-secondary/70' : 'text-slate-600'}`}>
                25+ years engineering high-conversion sales systems and strategic digital infrastructure for high-growth firms.
              </p>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 rounded-xl bg-primary text-white font-bold text-sm text-center transition-all hover:scale-[1.02] active:scale-98 shadow-[0_10px_30px_-5px_rgba(180,83,9,0.3)] hover:shadow-[0_15px_35px_-5px_rgba(180,83,9,0.4)]"
              >
                Connect on LinkedIn
              </a>
            </div>
          </aside>
        </div>
      </section>
    </article >
  );
};

export default ArticleView;
