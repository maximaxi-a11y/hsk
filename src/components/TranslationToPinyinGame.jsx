import React, { useState, useEffect } from 'react';
import { useWordChunk } from '../context/WordChunkContext';

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const TranslationToPinyinGame = () => {
  const { chunk } = useWordChunk();
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (chunk.length > 0) {
      generateNewRound();
    }
  }, [chunk]);

  const generateNewRound = () => {
    const word = chunk[Math.floor(Math.random() * chunk.length)];
    const wrongOptions = shuffle(chunk.filter(w => w.id !== word.id)).slice(0, 3);
    const mixed = shuffle([...wrongOptions, word]);

    setCurrentWord(word);
    setOptions(mixed);
    setSelectedIds([]);
    setIsCorrect(false);
  };

  const handleSelect = (option) => {
    if (isCorrect || selectedIds.includes(option.id)) return;

    if (option.id === currentWord.id) {
      setIsCorrect(true);
    } else {
      setSelectedIds(prev => [...prev, option.id]);
    }
  };

  const getStyle = (option) => {
    const isSelectedWrong = selectedIds.includes(option.id);
    const isRight = option.id === currentWord.id;

    if (isCorrect && isRight) return { backgroundColor: 'green', color: 'white' };
    if (isSelectedWrong) return { backgroundColor: 'red', color: 'white' };

    return {};
  };

  const getLabel = (option) => {
    if (isCorrect) {
      return `${option.pinyin} (${option.character})`;
    }
    return option.pinyin;
  };

  const isDisabled = (option) => {
    if (isCorrect) return true;
    return selectedIds.includes(option.id);
  };

  if (!currentWord) return <p>Загружаем...</p>;

  return (
    <div>
      <h3 style={{ fontSize: '1.8rem' }}>{currentWord.translation}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            disabled={isDisabled(option)}
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              cursor: isDisabled(option) ? 'default' : 'pointer',
              textAlign: 'left',
              ...getStyle(option)
            }}
          >
            {getLabel(option)}
          </button>
        ))}
      </div>

      {isCorrect && (
        <button
          onClick={generateNewRound}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Следующий
        </button>
      )}
    </div>
  );
};

export default TranslationToPinyinGame;
