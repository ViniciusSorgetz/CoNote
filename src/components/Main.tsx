"use client";

import { marked } from "marked";
import { useEffect, useRef } from "react";
//import "highlight.js/styles/github.css";
import hljs from "highlight.js";

export default function Main() {
  const noteContentRef = useRef<HTMLDivElement>(null);

  const note = {
    content: `# Olá, mundo!

Este é um pequeno **exemplo** de texto em _Markdown_.

## Lista

- Item 1
- Item 2
- Item 3

\`\`\`java
function saudacao(nome) {
  return \`Olá, \${nome}! a aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\`;
}

console.log(saudacao("Mundo"));
\`\`\`

[Visite o site do GitHub](https://github.com)

## Lista

- Item 1
- Item 2
- Item 3

`,
  };

  async function insertNote() {
    setTimeout(async () => {
      if (noteContentRef.current) {
        noteContentRef.current.innerHTML = await marked.parse(note.content);
      }
    });
  }

  useEffect(() => {
    insertNote();
    hljs.highlightAll();
  }, []);

  return (
    <div className="py-4 px-6 overflow-y-auto w-[100%]">
      <div
        className="note-content disabled no-tailwind prose figtree"
        ref={noteContentRef}
      ></div>
    </div>
  );
}
