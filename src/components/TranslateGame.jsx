import React, { useState, useEffect } from 'react';
import { useWordChunk } from '../context/WordChunkContext';

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const TranslateGame = () => {
  const { chunk } = useWordChunk();
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);

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
    setSelected(null);
    setShowNext(false);
  };

  const handleSelect = (option) => {
    console.log('👈 Выбран вариант:', option);
    if (selected) return;
    setSelected(option);

    if (option.id === currentWord.id) {
      console.log('✅ Правильный вариант!');
      setShowNext(true);
    } else {
      console.log('❌ Неправильный вариант');
    }
  };

  const getStyle = (option) => {
    if (!selected) return {};
    const isCorrect = option.id === currentWord.id;
    const isClicked = option.id === selected.id;

    if (isCorrect) return { backgroundColor: 'green', color: 'white' };
    if (isClicked) return { backgroundColor: 'red', color: 'white' };
    return {};
  };

  const getLabel = (option) => {
    console.log('🔤 Отрисовка кнопки:', option);
    if (showNext) {
      return `${option.translation} (${option.character}, ${option.pinyin})`;
    }
    return option.translation;
  };


  if (!currentWord) return <p>Загружаем...</p>;
  return (
    <div>
      <h3 style={{ fontSize: '2rem' }}>{currentWord.character} ПИЗДА</h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '1rem'
      }}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            disabled={!!selected}
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              cursor: selected ? 'default' : 'pointer',
              textAlign: 'left',
              ...getStyle(option)
            }}
          >
            {getLabel(option)}
          </button>
        ))}
      </div>

      {showNext && (
        <>
          <div style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
            <p><strong>Пиньинь:</strong> {currentWord.pinyin}</p>
            <p><strong>Перевод:</strong> {currentWord.translation}</p>
          </div>

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
            Продолжить
          </button>
        </>
      )}
    </div>
  );

};

export default TranslateGame;
