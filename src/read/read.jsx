import React from 'react';

export function Read() {
  return (
    <main className="container page-shell reader-main">
      <iframe
        src="/john01.html"
        title="John chapter 1"
        className="reader-frame w-100 border-0 bg-white rounded shadow-sm"
      ></iframe>
    </main>
  );
}
