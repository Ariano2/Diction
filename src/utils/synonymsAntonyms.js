import { createSlice } from '@reduxjs/toolkit';

const synonymsAntonyms = createSlice({
  name: 'synonymsAntonyms',
  initialState: {
    synonyms: [],
    antonyms: [],
    exampleSentences: [],
  },
  reducers: {
    addSynonyms: (state, action) => {
      state.synonyms.push(...action.payload);
    },
    addAntonyms: (state, action) => {
      state.antonyms.push(...action.payload);
    },
    addExampleSentences: (state, action) => {
      state.exampleSentences.push(action.payload);
    },
    clearSynonymsAntonymsData: (state) => {
      state.synonyms.length = 0;
      state.antonyms.length = 0;
      state.exampleSentences.length = 0;
    },
  },
});

export default synonymsAntonyms.reducer;
export const {
  addSynonyms,
  addAntonyms,
  clearSynonymsAntonymsData,
  addExampleSentences,
} = synonymsAntonyms.actions;
