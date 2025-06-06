// components/CustomListSelector.jsx
import React from 'react';
import { useCustomLists } from '../hooks/useCustomLists';
import { useWordChunk } from '../context/WordChunkContext';

const CustomListSelector = () => {
  const { lists } = useCustomLists();
  const { setChunk } = useWordChunk();

  const handleSelect = (e) => {
    const selectedName = e.target.value;
    if (!selectedName) return;
    const selectedList = lists[selectedName];
    setChunk(selectedList); // загружаем в "кучку"
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <label>📂 Выбери свой список:&nbsp;</label>
      <select onChange={handleSelect} defaultValue="">
        <option value="" disabled>— выбрать —</option>
        {Object.keys(lists).map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </div>
  );
};

export default CustomListSelector;
