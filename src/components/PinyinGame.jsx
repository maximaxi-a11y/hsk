import React, { useEffect, useState, useCallback } from 'react';
import { useWordChunk } from '../context/WordChunkContext';

// разбиваем eng_pyn на слоги: буквы + цифра
const splitEngPinyin = (str) => {
  const result = [];
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    const next = str[i + 1];

    if (/[1234]/.test(next)) {
      result.push(char + next);
      i += 2;
    } else {
      result.push(char);
      i += 1;
    }
  }
  return result;
};

const PinyinGame = () => {
  const { chunk } = useWordChunk();
  const [currentWord, setCurrentWord] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null); // null | true | false
  const [solutionChunks, setSolutionChunks] = useState([]);

  useEffect(() => {
    if (chunk.length > 0) generateNewWord();
  }, [chunk]);

  const generateNewWord = useCallback(() => {
    const word = chunk[Math.floor(Math.random() * chunk.length)];
    const chunks = splitEngPinyin(word.eng_pyn || '');

    setCurrentWord(word);
    setSolutionChunks(chunks);
    setInputs(Array(chunks.length).fill(''));
    setIsCorrect(null);
  }, [chunk]);

  useEffect(() => {
    if (chunk.length > 0) generateNewWord();
  }, [chunk, generateNewWord]);
  const handleChange = (index, value) => {
    const clean = value.slice(-2); // максимум 2 символа
    const updated = [...inputs];
    updated[index] = clean;
    setInputs(updated);
  };

  const checkAnswer = () => {
    const userAnswer = inputs.join('');
    const correct = solutionChunks.join('');
    setIsCorrect(userAnswer === correct);
  };

  const renderInputs = () => {
    return inputs.map((val, index) => {
      const expected = solutionChunks[index];
      const isWrong =
        isCorrect === false && val.toLowerCase() !== expected.toLowerCase();

      return (
        <input
          key={index}
          value={val}
          maxLength={2}
          onChange={(e) => handleChange(index, e.target.value)}
          style={{
            width: '2.5rem',
            height: '2.5rem',
            fontSize: '1.5rem',
            textAlign: 'center',
            borderRadius: '0.3rem',
            border: '1px solid #ccc',
            margin: '0.2rem',
            backgroundColor: isWrong ? '#fdd' : undefined,
          }}
        />
      );
    });
  };

  return (
    <div>
      {currentWord && (
        <>
          <h2 style={{ fontSize: '2rem' }}>{currentWord.character}</h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            {renderInputs()}
          </div>

          {isCorrect === null && (
            <div>
            <button onClick={checkAnswer} style={buttonStyle('#007bff')}>
              Проверить
            </button>
              <button onClick={generateNewWord} style={buttonStyle('teal','10px')}>
              Пропустить
          </button>
            </div>

          )}

          {isCorrect === false && (
            <button onClick={() => setIsCorrect(null)} style={buttonStyle('red')}>
              Повторить
            </button>
          )}

          {isCorrect === true && (
            <>
              <div style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                <p><strong>Пиньинь:</strong> {currentWord.pinyin}</p>
                <p><strong>Перевод:</strong> {currentWord.translation}</p>
              </div>

              <button onClick={generateNewWord} style={buttonStyle('green')}>
                Следующий
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

const buttonStyle = (color,margin) => ({
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  margin:margin
});

export default PinyinGame;
