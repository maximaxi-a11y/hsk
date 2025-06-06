import React from 'react';
import { Link } from 'react-router-dom';
import ChunkSettings from '../components/ChunkSettings';
import WordList from '../components/WordList';
import CustomListSelector from '../components/CustomListSelector'; // ✅

const MainPage = () => (
  <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
    <h2>HSK Тренировка</h2>
    <ul>
      <li><Link to="/games/">К играм</Link></li>
      <li><Link to="/custom-lists">Мои списки слов</Link></li>
    </ul>

    <ChunkSettings />

    {/* ✅ ДОБАВЬ ВОТ ЭТО */}
    <CustomListSelector />

    <hr style={{ margin: '1rem 0' }} />
    <WordList />
  </div>
);

export default MainPage;
