import React from 'react';
import { useWordChunk } from '../context/WordChunkContext';
import LevelSelect from './LevelSelect';

const ChunkSettings = () => {
  const {
    level,
    setLevel,
    chunkSize,
    setChunkSize,
    chunkIndex,
    setChunkIndex,
    saveSettings,
    totalChunks,
    error,
  } = useWordChunk();

  return (
    <div>
      <LevelSelect selectedLevel={level} onChange={setLevel} />

      <label>
        Кол-во слов в кучке:
        <input
          type="number"
          min={1}
          value={chunkSize}
          onChange={e => setChunkSize(Number(e.target.value))}
        />
      </label>

      <label>
        Номер кучки (с 1):
        <input
          type="number"
          min={1}
          value={chunkIndex + 1}
          onChange={e => setChunkIndex(Number(e.target.value) - 1)}
        />
      </label>

      <button onClick={saveSettings}>Сохранить настройки</button>

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Кучка {chunkIndex + 1} из {totalChunks}</p>
      )}
    </div>
  );
};

export default ChunkSettings;
