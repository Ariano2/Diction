import { configureStore } from '@reduxjs/toolkit';
import wordMeaningSliceReducer from './utils/wordMeaningSlice';

const appStore = configureStore({
  reducer: {
    wordMeaning: wordMeaningSliceReducer,
  },
});

export default appStore;
