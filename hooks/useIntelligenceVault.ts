import { useState, useEffect, useCallback } from 'react';
import { wpQuery } from '../lib/gql';
import { cleanExcerpt, parseTakeaways, parseFaqs } from '../lib/utils';
import { Category, Article } from '../types';

const GET_CATEGORIES = `
  query GetCategories {
    categories(first: 20, where: { hideEmpty: true }) {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
      }
    }
  }
`;

const GET_ALL_POSTS = `
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        id
        databaseId
        slug
        title
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
  }
`;

export const useIntelligenceVault = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapWpPostsToArticles = useCallback((wpNodes: any[]): Article[] => {
    return wpNodes.map(node => {
      const primaryCategory = node.categories?.nodes[0];
      const title = node.title || 'Untitled Protocol';
      const rawAi = node.aiOverviews?.ai_overviews;

      return {
        slug: node.slug,
        databaseId: node.databaseId,
        title: title,
        excerpt: cleanExcerpt(node.excerpt || '', title),
        readTime: '8 min',
        category: primaryCategory?.name || 'Protocol',
        categorySlug: primaryCategory?.slug || 'uncategorized',
        // Preserve all categories for client-side filtering if needed, 
        // though the interface only asks for primary category currently.
        // We might want to extend Article type if we need multi-category filtering, 
        // but typically primary is enough for display. 
        // For filtering, we might need to check the raw node or map all slugs.
        image: node.featuredImage?.node?.sourceUrl || '/images/blog-fallback.jpg',
        publishDate: new Date(node.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        aiData: rawAi ? {
          aiQuickAnswer: rawAi.ai_quick_answer || '',
          aiTakeaways: parseTakeaways(rawAi.ai_takeaways || ''),
          aiFaqs: parseFaqs(rawAi.ai_faqs || '')
        } : undefined,
        // Helper for filtering
        allCategories: node.categories?.nodes?.map((n: any) => n.slug) || []
      };
    });
  }, []);

  const initVault = useCallback(async () => {
    try {
      setLoading(true);
      const [catData, postData] = await Promise.all([
        wpQuery<{ categories: { nodes: Category[] } }>(GET_CATEGORIES),
        wpQuery<{ posts: { nodes: any[] } }>(GET_ALL_POSTS)
      ]);

      setCategories(catData.categories.nodes);
      setPosts(mapWpPostsToArticles(postData.posts.nodes));
      setLoading(false);
    } catch (err: any) {
      console.error("Vault Initialization Error:", err);
      setError(err.message || "Failed to establish connection to the Intelligence Vault.");
      setLoading(false);
    }
  }, [mapWpPostsToArticles]);

  useEffect(() => {
    initVault();
  }, [initVault]);

  return {
    categories,
    posts,
    loading,
    error,
    refresh: initVault
  };
};
