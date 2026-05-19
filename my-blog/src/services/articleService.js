import initialArticles from '../data/initialArticles';

const STORAGE_KEY = 'kws-phoenix-articles';

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function uniqueSlug(baseSlug, articles) {
  let slug = baseSlug;
  let n = 1;
  while (articles.some((a) => a.slug === slug)) {
    slug = `${baseSlug}-${n}`;
    n += 1;
  }
  return slug;
}

function normalize(articles) {
  return articles.map((a) => ({
    ...a,
    slug: a.slug || a.name,
    id: a.id || a.slug || a.name,
    author: a.author || 'KWS Phoenix',
    createdAt: a.createdAt || new Date().toISOString(),
    content: Array.isArray(a.content) ? a.content : [],
  }));
}

export function getArticles() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles));
    return [...initialArticles];
  }
  try {
    const stored = normalize(JSON.parse(raw));
    const slugs = new Set(stored.map((a) => a.slug));
    const merged = [...stored];
    for (const seed of initialArticles) {
      if (!slugs.has(seed.slug)) merged.push(seed);
    }
    if (merged.length !== stored.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles));
    return [...initialArticles];
  }
}

export function getArticleBySlug(slug) {
  return getArticles().find((a) => a.slug === slug);
}

export function addArticle({ title, body, author = 'Guest' }) {
  const articles = getArticles();
  const baseSlug = slugify(title) || `post-${Date.now()}`;
  const slug = uniqueSlug(baseSlug, articles);
  const content = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const article = {
    id: slug,
    slug,
    title: title.trim(),
    author,
    createdAt: new Date().toISOString(),
    content: content.length > 0 ? content : ['(No content yet.)'],
  };

  const next = [article, ...articles];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return article;
}

export function resetToSeed() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles));
  return [...initialArticles];
}
