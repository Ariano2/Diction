import { useState, useEffect } from 'react';

export default function useWordList() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('/words.txt')
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split(/\r?\n/).filter(Boolean);
        setWords(lines);
      })
      .catch((err) => console.error('Error loading word list:', err));
  }, []);

  return words;
}
