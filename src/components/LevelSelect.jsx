import React from 'react';

const levels = ['HSK1', 'HSK2', 'HSK3','HSK4','HSK5','HSK6','Графемы'];

const LevelSelect = ({ selectedLevel, onChange }) => {
  return (
    <select value={selectedLevel} onChange={e => onChange(e.target.value)}>
      <option value="">Все уровни</option>
      {levels.map(level => (
        <option key={level} value={level}>
          {level}
        </option>
      ))}
    </select>
  );
};

export default LevelSelect;
