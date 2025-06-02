import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav style={{ marginBottom: '1rem' }}>
    <NavLink to="/" style={{ marginRight: '10px' }}>Настройки</NavLink>
    <NavLink to="/words" style={{ marginRight: '10px' }}>Слова</NavLink>
    <NavLink to="/quiz">Тренировка</NavLink>
  </nav>
);

export default Navigation;
