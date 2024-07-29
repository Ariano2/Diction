import { useEffect } from 'react';
const useEnglishWordList = (setWords) => {
  useEffect(() => {
    const fetchWords = async () => {
      const words = await import('an-array-of-english-words');
      await setWords(words?.default);
    };
    fetchWords();
  }, []);
};

export default useEnglishWordList;
