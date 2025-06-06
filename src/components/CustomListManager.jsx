import React, { useState } from 'react';
import { useCustomLists } from '../hooks/useCustomLists';
import { useSelectedWords } from '../context/SelectedWordsContext';

const CustomListManager = () => {
  const { lists, createList, deleteList } = useCustomLists();
  const { selectedWords } = useSelectedWords();
  const [listName, setListName] = useState('');

  const handleSave = () => {
    if (!listName.trim()) return;
    createList(listName.trim(), selectedWords);
    setListName('');
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Мои списки слов</h3>

      <input
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Название нового списка"
        style={{ marginRight: '0.5rem' }}
      />
      <button onClick={handleSave}>Сохранить текущий выбор</button>

      <ul style={{ marginTop: '1rem' }}>
        {Object.keys(lists).map(name => (
          <li key={name}>
            <strong>{name}</strong> ({lists[name].length} слов)
            <button onClick={() => deleteList(name)} style={{ marginLeft: '0.5rem' }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomListManager;