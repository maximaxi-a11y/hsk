import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWordChunk } from '../utils/getWords';

const WordChunkContext = createContext();

const STORAGE_KEY = 'currentWordChunkSettings';

export const WordChunkProvider = ({ children }) => {
  const [level, setLevel] = useState('HSK1');
  const [chunkSize, setChunkSize] = useState(5);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [chunk, setChunk] = useState([]);
  const [totalChunks, setTotalChunks] = useState(0);
  const [error, setError] = useState(null);

  // Загружаем настройки из localStorage один раз
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setLevel(saved.level || 'HSK1');
      setChunkSize(saved.chunkSize || 5);
      setChunkIndex(saved.chunkIndex || 0);
    }
  }, []);

  // Обновляем chunk при изменении параметров
  useEffect(() => {
    try {
      const { chunk, totalChunks } = getWordChunk(level, chunkSize, chunkIndex);
      setChunk(chunk);
      setTotalChunks(totalChunks);
      setError(null);
    } catch (err) {
      setChunk([]);
      setTotalChunks(0);
      setError(err.message);
    }
  }, [level, chunkSize, chunkIndex]);

  // Сохраняем настройки вручную по кнопке
  const saveSettings = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ level, chunkSize, chunkIndex })
    );
  };

  return (
    <WordChunkContext.Provider
      value={{
        level,
        chunkSize,
        chunkIndex,
        chunk,
        setChunk, // ✅ добавь это
        totalChunks,
        error,
        setLevel,
        setChunkSize,
        setChunkIndex,
        saveSettings,
      }}
    >

      {children}
    </WordChunkContext.Provider>
  );
};

export const useWordChunk = () => useContext(WordChunkContext);
