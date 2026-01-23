
/**
 * Decodes common HTML entities into their plain-text equivalents.
 */
export const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&hellip;': '...',
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&#8217;': "'",
    '&#8211;': "–",
    '&#8212;': "—",
  };
  return text.replace(/&[a-z0-9#]+;/gi, (match) => entities[match] || match);
};

/**
 * Normalizes text for comparison (lowercase, trimmed, collapsed spaces).
 */
const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
};

/**
 * Strips HTML, removes plugin-injected junk, decodes entities, 
 * and handles title duplication for clean excerpts.
 */
export const cleanExcerpt = (raw: string, title: string = ''): string => {
  if (!raw) return 'Detailed protocol documentation pending final encryption.';

  let cleaned = raw
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/Successfully saved to Google Docs!/gi, "")
    .replace(/Continue reading.*/gi, "")
    .trim();

  cleaned = decodeHtmlEntities(cleaned);

  if (title && cleaned.toLowerCase().startsWith(title.toLowerCase())) {
    cleaned = cleaned.substring(title.length).trim();
  }

  cleaned = cleaned.replace(/^[.\-–—: ]+/, "").trim();
  return cleaned;
};

/**
 * Advanced WordPress HTML Content Cleaning:
 * 1. Uses DOMParser to walk nodes.
 * 2. Removes plugin junk.
 * 3. Removes duplicated title/excerpt at top.
 * 4. Detects and removes repeated block sequences (N >= 5) anywhere in the document.
 */
export const cleanWpHtml = (html: string, title: string, excerptPlain: string): string => {
  if (!html) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  const normTitle = normalizeText(title);
  const normExcerpt = normalizeText(excerptPlain.replace(/\.\.\.$/, ''));

  // 1. Initial cleanup: known junk and title/excerpt duplicates
  let children = Array.from(body.children);
  let titleRemoved = false;
  let excerptRemoved = false;

  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    const textContent = node.textContent || '';
    const normText = normalizeText(textContent);

    // Remove Google Docs / Plugin junk
    if (textContent.includes("Successfully saved to Google Docs!") ||
      textContent.includes("Continue reading")) {
      node.remove();
      continue;
    }

    // Remove leading Title if repeated as H1/H2
    if (!titleRemoved && (node.tagName === 'H1' || node.tagName === 'H2')) {
      if (normText === normTitle) {
        node.remove();
        titleRemoved = true;
        continue;
      }
    }

    // Remove leading Excerpt if repeated as first Paragraph
    if (!excerptRemoved && node.tagName === 'P') {
      if (normExcerpt && (normText.startsWith(normExcerpt) || normExcerpt.startsWith(normText))) {
        node.remove();
        excerptRemoved = true;
        continue;
      }
    }
  }

  // 2. Surgical Sequence De-duplication
  // Handles cases where sections or the whole article are repeated (even non-adjacently)
  children = Array.from(body.children);
  const signatures = children.map(node => normalizeText(node.textContent || ''));
  const toRemoveIndices = new Set<number>();

  const MIN_SEQUENCE_LENGTH = 5;

  for (let i = 0; i < signatures.length; i++) {
    // Skip already marked or very empty signatures
    if (toRemoveIndices.has(i) || signatures[i].length < 10) continue;

    for (let j = i + 1; j < signatures.length; j++) {
      if (toRemoveIndices.has(j)) continue;

      // If we find a block match, check if it's the start of a sequence
      if (signatures[i] === signatures[j]) {
        let matchCount = 1;
        while (
          i + matchCount < signatures.length &&
          j + matchCount < signatures.length &&
          signatures[i + matchCount] === signatures[j + matchCount]
        ) {
          matchCount++;
        }

        // If a significant sequence of blocks matches, mark the later ones for removal
        if (matchCount >= MIN_SEQUENCE_LENGTH) {
          for (let k = 0; k < matchCount; k++) {
            toRemoveIndices.add(j + k);
          }
          // Advance j past the sequence we just processed
          j += matchCount - 1;
        }
      }
    }
  }

  // Final removal pass (descending to preserve index mapping during live removals)
  const indices = Array.from(toRemoveIndices).sort((a, b) => b - a);
  indices.forEach(idx => {
    if (children[idx] && children[idx].parentNode) {
      children[idx].remove();
    }
  });

  return body.innerHTML;
};

import { NormalizedBlock } from '../types';

/**
 * Advanced Render-Layer Normalization Agent
 * Transforms potentially messy WordPress blocks into a canonical, professional structure.
 */
export const normalizeBlogPost = (
  html: string,
  title: string,
  author: string = 'Trevor Riggs',
  date: string = 'Today'
): NormalizedBlock[] => {
  if (!html) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  // 1. Initial Block Extraction & Cleaning
  let rawBlocks: NormalizedBlock[] = Array.from(body.children).map(node => {
    const tagName = node.tagName.toLowerCase();
    const textContent = (node.textContent || '').trim();

    if (tagName.startsWith('h')) {
      return { type: 'heading', level: parseInt(tagName.substring(1)), content: textContent } as NormalizedBlock;
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items = Array.from(node.querySelectorAll('li')).map(li => (li.textContent || '').trim());
      return { type: 'list', content: items } as NormalizedBlock;
    } else if (tagName === 'blockquote') {
      return { type: 'quote', content: textContent } as NormalizedBlock;
    } else {
      return { type: 'paragraph', content: textContent } as NormalizedBlock;
    }
  }).filter(b => b.content.length > 0);

  // 2. Rule: Paragraph Length Control (Split > 350 chars)
  const normalizedBlocks: NormalizedBlock[] = [];
  rawBlocks.forEach(block => {
    if (block.type === 'paragraph' && typeof block.content === 'string' && block.content.length > 350) {
      const sentences = block.content.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [block.content];
      let currentChunk = "";
      sentences.forEach(s => {
        if ((currentChunk + s).length > 350) {
          if (currentChunk) normalizedBlocks.push({ type: 'paragraph', content: currentChunk.trim() } as NormalizedBlock);
          currentChunk = s;
        } else {
          currentChunk += s;
        }
      });
      if (currentChunk) normalizedBlocks.push({ type: 'paragraph', content: currentChunk.trim() } as NormalizedBlock);
    } else {
      normalizedBlocks.push(block);
    }
  });

  // 3. Rule: Emphasis Block Extraction
  const emphasisCandidates = normalizedBlocks.filter(b =>
    b.type === 'paragraph' &&
    typeof b.content === 'string' &&
    b.content.length > 20 &&
    b.content.length < 150 &&
    (b.content.includes('!') || b.content.toLowerCase().includes('must') || b.content.toLowerCase().includes('real'))
  );
  const emphasisBlock = emphasisCandidates.length > 0 ? emphasisCandidates[0] : null;

  // 4. Rule: Heading Normalization
  let headings = normalizedBlocks.filter(b => b.type === 'heading');
  if (headings.length === 0) {
    // Infer H2s from transitional phrases or long sections
    const transitionalIndex = normalizedBlocks.findIndex(b =>
      b.type === 'paragraph' &&
      typeof b.content === 'string' &&
      /^(the real issue|what most people miss|here's the problem|in fact|but here)/i.test(b.content)
    );
    if (transitionalIndex !== -1) {
      normalizedBlocks.splice(transitionalIndex, 0, { type: 'heading', level: 2, content: "The Core Mechanism" } as NormalizedBlock);
    }
  }

  // 5. Canonical Assembly
  const finalBlocks: NormalizedBlock[] = [];

  // 1. H1 Article Title
  finalBlocks.push({ type: 'heading', level: 1, content: title } as NormalizedBlock);

  // 2. Context Subhead (Inferred from first paragraph)
  const paragraphs = normalizedBlocks.filter(b => b.type === 'paragraph');
  const firstPara = paragraphs[0];
  let hookStartIndex = 0;

  if (firstPara && typeof firstPara.content === 'string' && firstPara.content.length < 250) {
    finalBlocks.push({ type: 'paragraph', content: firstPara.content } as NormalizedBlock);
    hookStartIndex = 1;
  }

  // 3. Meta Line
  const wordCount = body.textContent?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  finalBlocks.push({ type: 'paragraph', content: `By ${author} • ${date} • ${readTime} min read` } as NormalizedBlock);

  // 4. Opening Hook (next 2-4 paragraphs)
  const hookParagraphs = paragraphs.slice(hookStartIndex, hookStartIndex + 3);
  hookParagraphs.forEach(p => finalBlocks.push(p));

  // 5. H2 — Define the problem
  let problemH2 = normalizedBlocks.find(b => b.type === 'heading' && b.level === 2);
  finalBlocks.push({
    type: 'heading',
    level: 2,
    content: problemH2 ? (problemH2.content as string) : "The Problem with Conventional Approaches"
  } as NormalizedBlock);

  // 6. Problem Content
  const problemContent = normalizedBlocks
    .slice(5)
    .filter(b => b.type === 'paragraph' || b.type === 'list')
    .slice(0, 3);
  problemContent.forEach(p => finalBlocks.push(p));

  // 7. H2 — Explain the mechanism
  finalBlocks.push({ type: 'heading', level: 2, content: "The Underlying Logic" } as NormalizedBlock);

  // 8. Mechanism Content
  const mechanismContent = normalizedBlocks
    .slice(8)
    .filter(b => b.type === 'paragraph')
    .slice(0, 2);
  mechanismContent.forEach(p => finalBlocks.push(p));

  // 11. Emphasis Block
  if (emphasisBlock) {
    finalBlocks.push({ type: 'emphasis', content: emphasisBlock.content } as NormalizedBlock);
  }

  // 12. H2 — Practical guidance
  finalBlocks.push({ type: 'heading', level: 2, content: "The Strategic Implementation" } as NormalizedBlock);

  // 13. Practical Content
  const practicalContent = normalizedBlocks
    .slice(10)
    .filter(b => b.type === 'paragraph' || b.type === 'list')
    .slice(0, 4);
  practicalContent.forEach(p => finalBlocks.push(p));

  // 16. Soft Close
  finalBlocks.push({
    type: 'paragraph',
    content: "True scale isn't found in more activity. It's found in better logic. The path is clear for those willing to look at the data."
  });

  return finalBlocks;
};

/**
 * Parses a newline-separated string into a string array of takeaways.
 */
export const parseTakeaways = (text: string): string[] => {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map(line => line.replace(/^[•\-\s*]+/, '').trim())
    .filter(line => line.length > 0);
};

/**
 * Parses Q: / A: formatted blocks from a single string into FAQ objects.
 */
export const parseFaqs = (text: string): { question: string, answer: string }[] => {
  if (!text) return [];

  const blocks = text.split(/\n\s*\n/);
  const faqs: { question: string, answer: string }[] = [];

  blocks.forEach(block => {
    const lines = block.split(/\n/);
    let q = '', a = '';
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith('q:')) q = trimmed.replace(/^q:\s*/i, '');
      if (trimmed.toLowerCase().startsWith('a:')) a = trimmed.replace(/^a:\s*/i, '');
    });
    if (q && a) faqs.push({ question: q, answer: a });
  });

  return faqs;
};
