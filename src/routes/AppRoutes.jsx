import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import GamesPage from '../pages/GamesPage';
import TranslateGamePage from '../pages/TranslateGamePage';
import PinyinGamePage from '../pages/PinyinGamePage';
import PinyinToCharacterGame from '../components/PinyinToCharacterGame';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/games" element={<GamesPage />} />
    <Route path="/games/translate" element={<TranslateGamePage />} />
    <Route path="/games/pinyin" element={<PinyinGamePage />} />
    <Route path="/games/pinyin-character" element={<PinyinToCharacterGame />} />
  </Routes>
);

export default AppRoutes;
