import { useState, useEffect } from "react";

export const useCustomLists = () => {
  const [lists, setLists] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('customWordLists');
    if (saved) setLists(JSON.parse(saved));
  }, []);

  const saveLists = (newLists) => {
    setLists(newLists);
    localStorage.setItem('customWordLists', JSON.stringify(newLists));
  };

  const createList = (name, words) => {
    const newLists = { ...lists, [name]: words };
    saveLists(newLists);
  };

  const deleteList = (name) => {
    const newLists = { ...lists };
    delete newLists[name];
    saveLists(newLists);
  };

  const updateList = (name, words) => {
    const newLists = { ...lists, [name]: words };
    saveLists(newLists);
  };

  const getListByName = (name) => lists[name] || [];

  // ✅ Исправлено: теперь правильное определение функции
  const setAllLists = (newLists) => {
    if (typeof newLists === 'object' && !Array.isArray(newLists)) {
      saveLists(newLists);
    }
  };

  const addSingleList = (name, words) => {
    const newLists = { ...lists, [name]: words };
    saveLists(newLists);
  };

  return {
    lists,
    createList,
    deleteList,
    updateList,
    getListByName,
    setAllLists,
    addSingleList // ← теперь точно экспортируется
  };
};
