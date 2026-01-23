import React from 'react';
import { Category } from '../types';
import { START_HERE_LINKS } from '../constants/curatedLinks';

interface BlogIndexSidebarProps {
    categories: Category[];
    isDarkMode: boolean;
    onCategoryClick: (slug: string) => void;
    selectedCategorySlug: string | null;
    onNavigate: (slug: string) => void;
}

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
        <aside className="hidden lg:block w-64 shrink-0 space-y-12">
            {/* Topics Block */}
            <div className="space-y-6">
                <h4 className={`text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                    Topics
                </h4>
                <nav className="flex flex-col gap-3">
                    {displayCategories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryClick(cat.slug)}
                            className={`text-sm text-left transition-all hover:underline underline-offset-4 ${selectedCategorySlug === cat.slug
                                    ? 'text-primary font-medium'
                                    : isDarkMode
                                        ? 'text-gray-500 hover:text-gray-300'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Start Here Block */}
            <div className="space-y-6">
                <div className="space-y-1">
                    <h4 className={`text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                        Start Here
                    </h4>
                    <p className={`text-[10px] leading-relaxed ${isDarkMode ? 'text-gray-600' : 'text-slate-400'
                        }`}>
                        Core frameworks for understanding the True Path digital philosophy.
                    </p>
                </div>
                <nav className="flex flex-col gap-4">
                    {START_HERE_LINKS.map((link, idx) => (
                        <button
                            key={idx}
                            onClick={() => onNavigate(link.href)}
                            className={`group text-left space-y-1.5`}
                        >
                            <span className={`block text-sm leading-tight transition-all group-hover:underline underline-offset-4 ${isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-slate-600 group-hover:text-slate-800'
                                }`}>
                                {link.title}
                            </span>
                            {link.shortLabel && (
                                <span className={`block text-[11px] leading-relaxed italic ${isDarkMode ? 'text-gray-700' : 'text-slate-400'
                                    }`}>
                                    {link.shortLabel}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default BlogIndexSidebar;
