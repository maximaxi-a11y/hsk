import React from 'react';

const ChunkControls = ({ chunkSize, setChunkSize, chunkIndex, setChunkIndex }) => (
  <div>
    <label>
      Кол-во слов в кучке:
      <input
        type="number"
        value={chunkSize}
        onChange={e => setChunkSize(Number(e.target.value))}
        min={1}
      />
    </label>
    <label>
      Номер кучки (с 1):
      <input
        type="number"
        value={chunkIndex + 1}
        onChange={e => setChunkIndex(Number(e.target.value) - 1)}
        min={1}
      />
    </label>
  </div>
);

export default ChunkControls;
