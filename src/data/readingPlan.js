const NEW_TESTAMENT_BOOKS = [
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

const TOTAL_CHAPTERS = 260;

function countWeekdaysSinceJanuaryFirst(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  let weekdays = 0;

  for (const day = new Date(start); day <= current; day.setDate(day.getDate() + 1)) {
    if (day.getDay() !== 0 && day.getDay() !== 6) {
      weekdays += 1;
    }
  }

  return weekdays;
}

function getReadingIndex(date) {
  const weekdaysSinceJanuaryFirst = countWeekdaysSinceJanuaryFirst(date);
  const chapterIndex = Math.max(weekdaysSinceJanuaryFirst, 1) - 1;

  return Math.min(chapterIndex, TOTAL_CHAPTERS - 1);
}

function getChapterAtIndex(index) {
  let chaptersBeforeBook = 0;

  for (const book of NEW_TESTAMENT_BOOKS) {
    if (index < chaptersBeforeBook + book.chapters) {
      const chapter = index - chaptersBeforeBook + 1;

      return {
        id: `${book.slug}-${chapter}`,
        book: book.slug,
        chapter,
        label: `${book.name} ${chapter}`,
        detail: `Read ${book.name} chapter ${chapter}`,
      };
    }

    chaptersBeforeBook += book.chapters;
  }

  return null;
}

export function getAssignedReadings(date = new Date()) {
  return [getChapterAtIndex(getReadingIndex(date))].filter(Boolean);
}

export function getReadingDateKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const PLAN_OPTIONS = [
  { value: '5x5 Weekday Plan', label: '5x5 Weekday Plan' },
  { value: '90-Day Sprint', label: '90-Day Sprint (Coming soon)', disabled: true },
];
