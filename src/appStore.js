import { configureStore } from '@reduxjs/toolkit';
import wordMeaningSliceReducer from './utils/wordMeaningSlice';
import synonymsAntonymsReducer from './utils/synonymsAntonyms';

const appStore = configureStore({
  reducer: {
    wordMeaning: wordMeaningSliceReducer,
    synonymsAntonyms: synonymsAntonymsReducer,
  },
});

export default appStore;
