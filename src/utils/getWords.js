import words from '../data/words.json';

/**
 * Возвращает слова, разбитые на кучки
 * @param {string} level
 * @param {number} chunkSize
 * @param {number} chunkIndex - начиная с 0
 * @returns {{ chunk: Array<Object>, totalChunks: number }}
 */
export const getWordChunk = (level, chunkSize, chunkIndex) => {
  const filtered = level ? words.filter(w => w.level === level) : words;

  const totalChunks = Math.ceil(filtered.length / chunkSize);

  if (chunkIndex < 0 || chunkIndex >= totalChunks) {
    throw new Error(`Неверный номер кучки. Всего доступно: ${totalChunks}`);
  }

  const start = chunkIndex * chunkSize;
  const end = start + chunkSize;
  const chunk = filtered.slice(start, end);

  return { chunk, totalChunks };
};
