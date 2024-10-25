// src/store/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    remotePeerId: null,
    // other state properties
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setRemotePeerId: (state, action) => {
      state.remotePeerId = action.payload;
    },
    // other reducers
  },
});

export const { addMessage, setRemotePeerId } = chatSlice.actions;
export const chatReducer = chatSlice.reducer; // Ensure this export