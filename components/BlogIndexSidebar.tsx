import React from 'react';
import { Category } from '../types';
import { START_HERE_LINKS } from '../constants/curatedLinks';
import {
    Terminal,
    Zap,
    BarChart3,
    Layers,
    BookOpen,
    Lightbulb,
    FileText,
    ArrowRight,
    Bookmark
} from 'lucide-react';

interface BlogIndexSidebarProps {
    categories: Category[];
    isDarkMode: boolean;
    onCategoryClick: (slug: string) => void;
    selectedCategorySlug: string | null;
    onNavigate: (slug: string) => void;
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

const BlogIndexSidebar: React.FC<BlogIndexSidebarProps> = ({
    categories,
    isDarkMode,
    onCategoryClick,
    selectedCategorySlug,
    onNavigate
}) => {
    // Filter and sort categories: show 4-8 max, exclude Uncategorized
    const displayCategories = categories
        .filter(cat => cat.slug !== 'uncategorized' && cat.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

    return (
        <aside className="hidden lg:block w-72 shrink-0 space-y-16">
            {/* Topics Block */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h4 className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isDarkMode ? 'text-secondary/40' : 'text-slate-400'}`}>
                        Topics
                    </h4>
                    {selectedCategorySlug && (
                        <button
                            onClick={() => onCategoryClick(selectedCategorySlug)}
                            className="text-[10px] font-bold text-primary hover:underline underline-offset-4 uppercase tracking-widest"
                        >
                            Reset
                        </button>
                    )}
                </div>
                <nav className="flex flex-col gap-2">
                    {displayCategories.map(cat => {
                        const Icon = CATEGORY_ICON_MAP[cat.slug] || FileText;
                        const isActive = selectedCategorySlug === cat.slug;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryClick(cat.slug)}
                                className={`flex items-center justify-between group px-4 py-3 rounded-xl border transition-all ${isActive
                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                    : isDarkMode
                                        ? 'bg-white/[0.02] border-white/5 text-secondary hover:border-white/10 hover:bg-white/[0.04]'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-secondary/40 group-hover:text-primary transition-colors'}`} />
                                    <span className="text-xs font-medium">{cat.name}</span>
                                </div>
                                <span className={`text-[10px] font-mono ${isActive ? 'text-primary' : 'text-secondary/20'}`}>
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Start Here / Essentials Block */}
            <div className="space-y-8">
                <div className="space-y-2">
                    <h4 className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isDarkMode ? 'text-secondary/40' : 'text-slate-400'}`}>
                        Foundational Logic
                    </h4>
                    <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-secondary/20' : 'text-slate-400'}`}>
                        Core frameworks for navigating digital disruption.
                    </p>
                </div>
                <nav className="flex flex-col gap-5">
                    {START_HERE_LINKS.map((link, idx) => (
                        <button
                            key={idx}
                            onClick={() => onNavigate(link.href)}
                            className="group text-left"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${isDarkMode
                                    ? 'bg-white/[0.03] border-white/10 text-primary group-hover:border-primary/50'
                                    : 'bg-slate-50 border-slate-200 text-primary group-hover:border-primary'
                                    }`}>
                                    <Bookmark className="w-3.5 h-3.5" />
                                </div>
                                <div className="space-y-1.5">
                                    <span className={`block text-xs font-bold leading-tight transition-colors ${isDarkMode ? 'text-white group-hover:text-primary' : 'text-slate-900 group-hover:text-primary'
                                        }`}>
                                        {link.title}
                                    </span>
                                    {link.shortLabel && (
                                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-secondary/40' : 'text-slate-500'}`}>
                                            {link.shortLabel}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </nav>

                <div className={`mt-10 p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-primary/5 border-primary/20' : 'bg-orange-50 border-orange-100'
                    }`}>
                    <h5 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-primary`}>Newsletter</h5>
                    <p className={`text-[11px] leading-relaxed mb-4 ${isDarkMode ? 'text-secondary/60' : 'text-slate-600'}`}>
                        Direct, technical insights on AI & conversion strategy.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email..."
                            className={`flex-1 text-[11px] px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:border-primary/50 ${isDarkMode ? 'border-white/10 text-white placeholder:text-secondary/20' : 'border-slate-300 text-slate-900'
                                }`}
                        />
                        <button className="p-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default BlogIndexSidebar;
