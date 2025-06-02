import React from 'react';
import ChunkSettings from '../components/ChunkSettings';
import WordList from '../components/WordList';

const MainPage = () => (
  <div style={{ padding: '1rem' }}>
    <h2>HSK Тренировка</h2>
    <ChunkSettings />
    <hr style={{ margin: '1rem 0' }} />
    <WordList />
  </div>
);

export default MainPage;
