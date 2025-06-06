import React, { useState } from 'react';
import { useCustomLists } from '../hooks/useCustomLists';
import { useSelectedWords } from '../context/SelectedWordsContext';

const CustomListManager = () => {
  const {
    lists,
    createList,
    deleteList,
    setAllLists,
    addSingleList // ✅ теперь будет работать
  } = useCustomLists();

  const { selectedWords } = useSelectedWords();
  const [listName, setListName] = useState('');

  const handleSave = () => {
    if (!listName.trim()) return;
    createList(listName.trim(), selectedWords);
    setListName('');
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(lists, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-hsk-word-lists.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);

        if (Array.isArray(parsed)) {
          const baseName = file.name.replace(/\.json$/, '');

          // ✅ ДОБАВИМ КАК СПИСОК
          addSingleList(baseName, parsed);

          alert(`Список "${baseName}" успешно добавлен!`);
        } else if (typeof parsed === 'object') {
          // множественная загрузка
          setAllLists(parsed);
          alert('Списки успешно загружены!');
        } else {
          alert('Неверный формат.');
        }
      } catch (err) {
        alert('Ошибка чтения файла.');
      }
    };

    reader.readAsText(file);
  };


  const handleDownloadSingle = (name) => {
    const list = lists[name];
    if (!list) return;

    const blob = new Blob([JSON.stringify(list, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
      <button onClick={handleSave}>💾 Сохранить в браузере</button>
      <button onClick={handleDownload} style={{ marginLeft: '0.5rem' }}>
        📁 Скачать JSON
      </button>
      <label style={{ marginLeft: '1rem' }}>
        <input
          type="file"
          accept=".json"
          onChange={handleUpload}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <button onClick={() => document.getElementById('fileInput').click()}>
          🔄 Загрузить JSON
        </button>
      </label>

      <ul style={{ marginTop: '1rem' }}>
        {Object.keys(lists).map((name) => (
          <li key={name}>
            <strong>{name}</strong> ({lists[name].length} слов)
            <button
              onClick={() => deleteList(name)}
              style={{ marginLeft: '0.5rem' }}
            >
              Удалить
            </button>
            <button
              onClick={() => handleDownloadSingle(name)}
              style={{ marginLeft: '0.5rem' }}
            >
              📥 Скачать
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default CustomListManager;
