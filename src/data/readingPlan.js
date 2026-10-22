import { NEW_TESTAMENT_BOOKS } from './bible';

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
