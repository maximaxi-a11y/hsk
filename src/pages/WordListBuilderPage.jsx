import React from 'react';
import WordSelector from '../components/WordSelector';
import CustomListManager from '../components/CustomListManager';
import allWords from '../data/words.json';

const WordListBuilderPage = () => (
  <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
    <h2>Создание своих списков слов</h2>
    <WordSelector words={allWords} />
    <CustomListManager />
  </div>
);

export default WordListBuilderPage;