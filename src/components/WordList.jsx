import React from 'react';
import { useWordChunk } from '../context/WordChunkContext';

const WordList = () => {
  const { chunk } = useWordChunk();

  return (
    <ul>
      {chunk.map(word => (
        <li key={word.id}>
          {word.character} ({word.pinyin}) — {word.translation}
        </li>
      ))}
    </ul>
  );
};

export default WordList;
