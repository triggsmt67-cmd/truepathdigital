
import { LucideIcon } from 'lucide-react';

export type ViewState = 'landing' | 'resources' | 'article';

export interface NavLink {
  label: string;
  href: string;
}

export interface TrailStep {
  letter: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface ClientSuccess {
  name: string;
  result: string;
  metric: string;
}

export interface Category {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string | null;
  count: number;
}

export interface NormalizedBlock {
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'emphasis';
  level?: number;
  content: string | string[];
}

export interface Article {
  slug: string;
  databaseId?: number;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  categorySlug: string;
  image: string;
  publishDate?: string;
  content?: string;
  blocks?: NormalizedBlock[];
  aiData?: {
    aiQuickAnswer?: string;
    aiTakeaways?: string[];
    aiFaqs?: { question: string; answer: string }[];
  };
  allCategories?: string[];
}
