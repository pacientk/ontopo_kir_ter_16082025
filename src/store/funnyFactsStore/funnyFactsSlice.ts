import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FunnyFact } from '../../types';
import { generateFunnyFacts } from './funnyFactsActions';

interface FunnyFactsState {
  items: FunnyFact[];
  loading: boolean;
  error: string | null;
}

const initialState: FunnyFactsState = {
  items: [],
  loading: false,
  error: null,
};

const funnyFactsSlice = createSlice({
  name: 'funnyFacts',
  initialState,
  reducers: {
    clearFunnyFacts: state => {
      state.items = [];
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(generateFunnyFacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateFunnyFacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(generateFunnyFacts.rejected, (state, action) => {
        state.loading = false;
        state.items = [];

        if (action.payload) {
          state.error = action.payload.message;
        } else if (action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = 'Unknown error occurred while generating funny facts';
        }

        console.warn('Funny facts generation failed:', state.error);
      });
  },
});

export const { clearFunnyFacts, clearError, setError } = funnyFactsSlice.actions;
export { funnyFactsSlice };
