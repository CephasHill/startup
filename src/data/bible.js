export const GOSPELS = [
  { name: 'Matthew', slug: 'matthew', chapters: 28 },
  { name: 'Mark', slug: 'mark', chapters: 16 },
  { name: 'Luke', slug: 'luke', chapters: 24 },
  { name: 'John', slug: 'john', chapters: 21 },
];

export async function loadGospel(book) {
  const response = await fetch(`/data/bible/${book}_bsb.json`);

  if (!response.ok) {
    throw new Error(`Unable to load the ${book} chapter data.`);
  }

  return response.json();
}
