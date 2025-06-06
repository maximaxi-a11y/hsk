import React, { useState } from 'react';
import { useSelectedWords } from '../context/SelectedWordsContext';

const WordSelector = ({ words }) => {
  const { selectedWords, toggleWord } = useSelectedWords();
  const [query, setQuery] = useState('');

  const filtered = words.filter(w =>
    w.character.includes(query) ||
    w.pinyin.toLowerCase().includes(query.toLowerCase()) ||
    w.translation.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Поиск слова"
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <ul>
        {filtered.map(word => (
          <li
            key={word.id}
            style={{
              padding: '0.5rem',
              cursor: 'pointer',
              background: selectedWords.some(w => w.id === word.id) ? '#def' : '#fff'
            }}
            onClick={() => toggleWord(word)}
          >
            {word.character} — {word.pinyin} — {word.translation}
          </li>
        ))}
      </ul>

      <p>Выбрано: {selectedWords.length}</p>
    </div>
  );
};

export default WordSelector;