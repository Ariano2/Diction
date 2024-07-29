import { createSlice } from '@reduxjs/toolkit';

const wordMeaningSlice = createSlice({
  name: 'wordMeaning',
  initialState: {
    data: null,
  },
  reducers: {
    addWordData: (state, action) => {
      state.data = action.payload;
    },
    removeWordData: (state) => {
      state.data = null;
    },
  },
});

export const { addWordData, removeWordData } = wordMeaningSlice.actions;
export default wordMeaningSlice.reducer;
