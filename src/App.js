import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WordChunkProvider } from './context/WordChunkContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <WordChunkProvider>
        <AppRoutes />
      </WordChunkProvider>
    </BrowserRouter>
  );
}

export default App;
