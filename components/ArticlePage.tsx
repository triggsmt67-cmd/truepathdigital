
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleView from './ArticleView';
import { useIntelligenceVault } from '../hooks/useIntelligenceVault';
import { Loader2, AlertCircle } from 'lucide-react';

interface ArticlePageProps {
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ isDarkMode, onToggleTheme }) => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { posts, loading, error } = useIntelligenceVault();

    // Find the article
    const article = posts.find(p => p.slug === slug);

    // Handle case where article is not found but we are loading
    if (loading) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center gap-6 transition-colors duration-500 ${isDarkMode ? 'bg-[#121417]' : 'bg-slate-50'}`}>
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className={`font-mono text-sm tracking-widest uppercase animate-pulse ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Locating Protocol...</p>
            </div>
        );
    }

    // Handle error or not found
    if (error || !article) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center gap-6 transition-colors duration-500 ${isDarkMode ? 'bg-[#121417]' : 'bg-slate-50'}`}>
                <AlertCircle className="w-16 h-16 text-red-500" />
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{error ? 'Connection Error' : 'Protocol Not Found'}</h1>
                <p className={`text-center max-w-md ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    {error || `The requested intelligence protocol "${slug}" could not be retrieved from the vault.`}
                </p>
                <button
                    onClick={() => navigate('/blog')}
                    className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                    Return to Vault
                </button>
            </div>
        );
    }

    return (
        <ArticleView
            article={article}
            onBack={() => navigate('/blog')}
            isDarkMode={isDarkMode}
            onToggleTheme={onToggleTheme}
        />
    );
};

export default ArticlePage;
