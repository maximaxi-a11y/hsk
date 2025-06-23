import React from 'react';
import { Link } from 'react-router-dom';

const GamesPage = () => (
  <div style={{ padding: '1rem' }}>
    <h2>Игры</h2>
    <ul>
      <li><Link to="/games/translate">Перевод слова</Link></li>
      <li><Link to="/games/pinyin/">Написание пиньиня</Link></li>
      <li><Link to="/games/pinyin-character">выбор hanzi</Link></li>
      <li><Link to="/games/translation-to-pinyin">Перевод → Пиньинь</Link></li>
      <li><Link to="/games/dict">Диктант</Link></li>
    </ul>
  </div>
);

export default GamesPage;
