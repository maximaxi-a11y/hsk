import React, { useState, useEffect } from 'react';
import { useWordChunk } from '../context/WordChunkContext';

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const PinyinToCharacterGame = () => {
  const { chunk } = useWordChunk();
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (chunk.length > 0) generateNewRound();
  }, [chunk]);

  const generateNewRound = () => {
    const word = chunk[Math.floor(Math.random() * chunk.length)];
    const wrongOptions = shuffle(chunk.filter(w => w.character !== word.character)).slice(0, 3);
    const mixed = shuffle([...wrongOptions, word]);

    setCurrentWord(word);
    setOptions(mixed);
    setSelectedIds([]);
    setIsCorrect(false);
  };

  const handleSelect = (option) => {
    if (isCorrect || selectedIds.includes(option.id)) return;

    if (option.character === currentWord.character) {
      setIsCorrect(true);
    } else {
      setSelectedIds(prev => [...prev, option.id]);
    }
  };

  const getStyle = (option) => {
    const isSelectedWrong = selectedIds.includes(option.id);
    const isRight = option.character === currentWord.character;

    if (isCorrect && isRight) return { backgroundColor: 'green', color: 'white' };
    if (isSelectedWrong) return { backgroundColor: 'red', color: 'white' };
    return {};
  };

  const isDisabled = (option) => {
    if (isCorrect) return true;
    return selectedIds.includes(option.id);
  };

  const getLabel = (option) => {
    if (isCorrect) {
      return `${option.character} (${option.pinyin}, ${option.translation})`;
    }
    return option.character;
  };

  return (
    <div>
      {currentWord && (
        <>
          <h3 style={{ fontSize: '2rem' }}>{currentWord.pinyin}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                disabled={isDisabled(option)}
                style={{
                  padding: '0.5rem',
                  fontSize: '1.5rem',
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
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}
            >
              Следующий
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PinyinToCharacterGame;
