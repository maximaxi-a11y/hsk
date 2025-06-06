import { useState,useEffect } from "react";
// hooks/useCustomLists.js
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

  return { lists, createList, deleteList, updateList, getListByName };
};
