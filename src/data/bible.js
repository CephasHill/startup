export const NEW_TESTAMENT_BOOKS = [
  { name: 'Matthew', slug: 'matthew', chapters: 28 },
  { name: 'Mark', slug: 'mark', chapters: 16 },
  { name: 'Luke', slug: 'luke', chapters: 24 },
  { name: 'John', slug: 'john', chapters: 21 },
  { name: 'Acts', slug: 'acts', chapters: 28 },
  { name: 'Romans', slug: 'romans', chapters: 16 },
  { name: '1 Corinthians', slug: '1_corinthians', chapters: 16 },
  { name: '2 Corinthians', slug: '2_corinthians', chapters: 13 },
  { name: 'Galatians', slug: 'galatians', chapters: 6 },
  { name: 'Ephesians', slug: 'ephesians', chapters: 6 },
  { name: 'Philippians', slug: 'philippians', chapters: 4 },
  { name: 'Colossians', slug: 'colossians', chapters: 4 },
  { name: '1 Thessalonians', slug: '1_thessalonians', chapters: 5 },
  { name: '2 Thessalonians', slug: '2_thessalonians', chapters: 3 },
  { name: '1 Timothy', slug: '1_timothy', chapters: 6 },
  { name: '2 Timothy', slug: '2_timothy', chapters: 4 },
  { name: 'Titus', slug: 'titus', chapters: 3 },
  { name: 'Philemon', slug: 'philemon', chapters: 1 },
  { name: 'Hebrews', slug: 'hebrews', chapters: 13 },
  { name: 'James', slug: 'james', chapters: 5 },
  { name: '1 Peter', slug: '1_peter', chapters: 5 },
  { name: '2 Peter', slug: '2_peter', chapters: 3 },
  { name: '1 John', slug: '1_john', chapters: 5 },
  { name: '2 John', slug: '2_john', chapters: 1 },
  { name: '3 John', slug: '3_john', chapters: 1 },
  { name: 'Jude', slug: 'jude', chapters: 1 },
  { name: 'Revelation', slug: 'revelation', chapters: 22 },
];

export const GOSPELS = NEW_TESTAMENT_BOOKS.slice(0, 4);

export async function loadGospel(book) {
  const response = await fetch(`/data/bible/${book}_bsb.json`);

  if (!response.ok) {
    throw new Error(`Unable to load the ${book} chapter data.`);
  }

  return response.json();
}
