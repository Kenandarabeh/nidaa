// src/store/selectors/chatSelectors.js
import { createSelector } from 'reselect';

const selectChat = state => state.chat; // Remove default value to avoid creating new object

export const selectMessages = createSelector(
  [selectChat],
  chat => chat ? chat.messages : [] // Add default value in the output selector
);

export const selectRemotePeerId = createSelector(
  [selectChat],
  chat => chat ? chat.remotePeerId : null // Add default value in the output selector
);