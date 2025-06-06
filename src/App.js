import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WordChunkProvider } from './context/WordChunkContext';
import AppRoutes from './routes/AppRoutes';
import { SelectedWordsProvider } from './context/SelectedWordsContext'; // 🔧 ВОТ ТАК ПРАВИЛЬНО

function App() {
  return (
    <SelectedWordsProvider>
      <BrowserRouter>
        <WordChunkProvider>
          <AppRoutes />
        </WordChunkProvider>
      </BrowserRouter>
    </SelectedWordsProvider>
  );
}

export default App;
