import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import GamesPage from '../pages/GamesPage';
import TranslateGamePage from '../pages/TranslateGamePage';
import PinyinGamePage from '../pages/PinyinGamePage';
import PinyinToCharacterGame from '../components/PinyinToCharacterGame';
import WordListBuilderPage from '../pages/WordListBuilderPage';
import TranslationToPinyinGame from '../components/TranslationToPinyinGame';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/games" element={<GamesPage />} />
    <Route path="/games/translate" element={<TranslateGamePage />} />
    <Route path="/games/pinyin" element={<PinyinGamePage />} />
    <Route path="/games/pinyin-character" element={<PinyinToCharacterGame />} />
    <Route path="/custom-lists" element={<WordListBuilderPage />} />
    <Route path="/games/translation-to-pinyin" element={<TranslationToPinyinGame />} />
  </Routes>
);

export default AppRoutes;
