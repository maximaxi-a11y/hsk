import React, { createContext, useContext, useState } from 'react';

const SelectedWordsContext = createContext();

export const SelectedWordsProvider = ({ children }) => {
  const [selectedWords, setSelectedWords] = useState([]);

  const toggleWord = (word) => {
    setSelectedWords((prev) =>
      prev.some(w => w.id === word.id)
        ? prev.filter(w => w.id !== word.id)
        : [...prev, word]
    );
  };

  return (
    <SelectedWordsContext.Provider value={{ selectedWords, toggleWord }}>
      {children}
    </SelectedWordsContext.Provider>
  );
};

export const useSelectedWords = () => useContext(SelectedWordsContext);