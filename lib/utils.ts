
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
    '&#8216;': "'",
    '&#8217;': "'",
    '&#8218;': "'",
    '&#8219;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8222;': '"',
    '&#8223;': '"',
    '&#8211;': "–",
    '&#8212;': "—",
    '&ndash;': "–",
    '&mdash;': "—",
    '&amp;': "&",
    '&lt;': "<",
    '&gt;': ">",
    '&#8230;': "...",
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
 * Transforms WordPress HTML into a clean, canonical block structure.
 * Preserves original flow while cleaning junk and improving readability.
 */
export const normalizeBlogPost = (
  html: string,
  title: string,
  excerpt: string = '',
  author: string = 'Trevor Riggs',
  date: string = 'Today'
): NormalizedBlock[] => {
  if (!html) return [];

  // 1. Initial Cleaning (Remove Title/Excerpt duplicates from the start)
  const cleanedHtml = cleanWpHtml(html, title, excerpt);

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanedHtml, 'text/html');
  const body = doc.body;

  // 2. Initial Block Extraction & Cleaning
  let rawBlocks: NormalizedBlock[] = Array.from(body.children).map(node => {
    const tagName = node.tagName.toLowerCase();
    const textContent = decodeHtmlEntities((node.textContent || '').trim());

    if (tagName.startsWith('h')) {
      return {
        type: 'heading',
        level: parseInt(tagName.substring(1)) || 2,
        content: textContent
      } as NormalizedBlock;
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items = Array.from(node.querySelectorAll('li')).map(li =>
        decodeHtmlEntities((li.textContent || '').trim())
      );
      return { type: 'list', content: items } as NormalizedBlock;
    } else if (tagName === 'blockquote') {
      return { type: 'quote', content: textContent } as NormalizedBlock;
    } else {
      // Default to paragraph, but check for emphasis markers
      const isEmphasis = textContent.length > 20 &&
        textContent.length < 200 &&
        (textContent.includes('!') || textContent.toLowerCase().includes('must') || textContent.toLowerCase().includes('crucial'));

      return {
        type: isEmphasis ? 'emphasis' : 'paragraph',
        content: textContent
      } as NormalizedBlock;
    }
  }).filter(b => {
    if (Array.isArray(b.content)) return b.content.length > 0;
    return b.content && b.content.length > 0;
  });

  // 2.5 Deduplication: Remove blocks that match title or excerpt within the first 3 blocks
  const normTitle = normalizeText(title);
  const normExcerpt = normalizeText(excerpt.replace(/\.\.\.$/, ''));

  // Look at first 3 blocks to find duplicates of Title or Excerpt
  for (let i = 0; i < Math.min(3, rawBlocks.length); i++) {
    const blockText = normalizeText(typeof rawBlocks[i].content === 'string' ? (rawBlocks[i].content as string) : '');

    if (
      blockText === normTitle ||
      blockText.length < 5 ||
      (normExcerpt && (blockText.startsWith(normExcerpt) || normExcerpt.startsWith(blockText)))
    ) {
      rawBlocks.splice(i, 1);
      i--; // Adjust index after removal
    }
  }

  // 3. Paragraph Length Control (Split > 450 chars for better readability)
  const finalBlocks: NormalizedBlock[] = [];
  rawBlocks.forEach(block => {
    if (block.type === 'paragraph' && typeof block.content === 'string' && block.content.length > 450) {
      const sentences = block.content.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [block.content];
      let currentChunk = "";
      sentences.forEach(s => {
        if ((currentChunk + s).length > 450) {
          if (currentChunk) finalBlocks.push({ type: 'paragraph', content: currentChunk.trim() } as NormalizedBlock);
          currentChunk = s;
        } else {
          currentChunk += s;
        }
      });
      if (currentChunk) finalBlocks.push({ type: 'paragraph', content: currentChunk.trim() } as NormalizedBlock);
    } else {
      finalBlocks.push(block);
    }
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
