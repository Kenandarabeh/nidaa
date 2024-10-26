import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set) => ({
  wstoken: null,
  sesskey: null,
  isAuth: false,

  initializeAuth: async () => {
    try {
      const wstoken = await AsyncStorage.getItem('wstoken');
      const sesskey = await AsyncStorage.getItem('sesskey');
      
      set({
        wstoken,
        sesskey,
        isAuth: !!(wstoken && sesskey),
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  },
  setAuth: async (wstoken, sesskey) => {
    try {
      await AsyncStorage.setItem('wstoken', wstoken);
      await AsyncStorage.setItem('sesskey', sesskey);
      set({ wstoken, sesskey, isAuth: true });
    } catch (error) {
      console.error('Error setting auth:', error);
    }
  },
  clearAuth: async () => {
    try {
      await AsyncStorage.removeItem('wstoken');
      await AsyncStorage.removeItem('sesskey');
      set({ wstoken: null, sesskey: null, isAuth: false });
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },
}));

export default useAuthStore;
