import React, { useState, useEffect } from 'react';
import { useWordChunk } from '../context/WordChunkContext';

// Utility to shuffle an array (returns a new array)
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const DictGame = () => {
    const { chunk } = useWordChunk();
    const [wordList, setWordList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [forgotten, setForgotten] = useState([]);
    const [mistaken, setMistaken] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [method, setMethod] = useState('по пининю');
    const [obj, setObj] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);

    const currentWord = wordList[currentIndex];
    
    // Инициализация при получении чанка
    useEffect(() => {
        if (chunk.length > 0) {
            setWordList(shuffle(chunk));
            setCurrentIndex(0);
            setForgotten([]);
            setMistaken([]);
            setIsFinished(false);
            setShowAnswer(false);
        }
    }, [chunk]);

    // Обновление obj при смене слова или метода
    useEffect(() => {
        if (!currentWord) return;

        if (method === 'по пининю') {
            setObj(currentWord.pinyin);
        } else if (method === 'по переводу') {
            setObj(currentWord.translation);
        } else {
            setObj('');
        }
    }, [currentWord, method]);

    const handleChoice = (type) => {
        if (!currentWord) return;

        if (type === 'forgotten') {
            setForgotten(prev => [...prev, currentWord]);
        } else if (type === 'mistaken') {
            setMistaken(prev => [...prev, currentWord]);
        }

        const nextIndex = currentIndex + 1;
        if (nextIndex < wordList.length) {
            setCurrentIndex(nextIndex);
            setShowAnswer(false);
        } else {
            setIsFinished(true);
        }
    };

    const downloadJSON = (data, filename) => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const setObjAndMethod = (met) => {
        setMethod(met);
        console.log(currentWord)
    };

    const buttonStyle = {
        padding: '0.5rem',
        fontSize: '1.5rem',
        borderRadius: '0.5rem',
        border: '1px solid #ccc',
        cursor: 'pointer',
        textAlign: 'center'
    };

    // Пока chunk не загрузился или слово не определено
    if (!chunk.length || !currentWord) return <div>Загрузка...</div>;

    // Конец игры
    if (isFinished) {
        return (
            <div>
                <h3>Игра окончена!</h3>
                <p>Ничего не помню: {forgotten.length} слов</p>
                <p>Ошибся в написании: {mistaken.length} слов</p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={() => downloadJSON(forgotten, 'forgotten.json')}>
                        Скачать забытые слова
                    </button>
                    <button onClick={() => downloadJSON(mistaken, 'mistaken.json')}>
                        Скачать ошибочные слова
                    </button>
                    <button onClick={() => downloadJSON([...forgotten, ...mistaken], 'all_words.json')}>
                        Скачать все слова
                    </button>
                </div>
            </div>
        );
    }
    const back = () => {
        if (currentIndex >= 1) {
            setCurrentIndex(currentIndex-1)
        }
    }
    return (
        <div>
            <select onChange={e => setObjAndMethod(e.target.value)} value={method}>
                <option value="">Выбери метод</option>
                <option value="по пининю">по пининю</option>
                <option value="по переводу">по переводу</option>
            </select>

            <h3 style={{ fontSize: '2rem' }}>{obj}</h3>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button style={buttonStyle} onClick={() => handleChoice('allright')}>
                    Помню
                </button>
                <button style={buttonStyle} onClick={() => handleChoice('forgotten')}>
                    Ничего не помню
                </button>
                <button style={buttonStyle} onClick={() => handleChoice('mistaken')}>
                    Ошибся в написании
                </button>
                <button style={buttonStyle} onClick={() => setShowAnswer(true)}>
                    Показать ответ
                </button>
                <button style={buttonStyle} onClick={() => back()}>
                    назад
                </button>
            </div>

            {showAnswer && (
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: "40px" }}><strong></strong> {currentWord.character}</p>
                    <p><strong>Перевод:</strong> {currentWord.translation}</p>
                    <button onClick={()=>{setShowAnswer(false)}}>скрыть</button>
                </div>
            )}

            <p style={{ marginTop: '1rem' }}>
                {currentIndex + 1} / {wordList.length}
            </p>
        </div>
    );
};

export default DictGame;
