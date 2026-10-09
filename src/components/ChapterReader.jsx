import React from 'react';

function renderText(text) {
  const parts = text.split(/(\^\[[^\]]+\]\^)/g);

  return parts.map((part, index) => {
    const footnote = part.match(/^\^\[([^\]]+)\]\^$/);

    if (footnote) {
      return <sup key={index}>{footnote[1]}</sup>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export function ChapterReader({ chapter }) {
  return (
    <article className="container page-shell chapter-copy bg-white p-4 p-md-5">
      <h1>{chapter.book}</h1>
      <h2 className="text-secondary">Chapter {chapter.chapter}</h2>

      {chapter.content.map((block, index) => {
        if (block.type === 'heading') {
          return <h3 key={index}>{block.text}</h3>;
        }

        if (block.type === 'verse') {
          return (
            <p key={index} id={`${chapter.book}-${chapter.chapter}-${block.number}`}>
              <strong>{block.number}</strong>{' '}
              {block.lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {lineIndex > 0 && <br />}
                  {renderText(line.text)}
                </React.Fragment>
              ))}
            </p>
          );
        }

        return null;
      })}
    </article>
  );
}