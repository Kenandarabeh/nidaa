import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set) => ({
  wstoken: null,
  sesskey: null,
  userid: null,
  isAuth: false,

  initializeAuth: async () => {
    try {
      const wstoken = await AsyncStorage.getItem('wstoken');
      const sesskey = await AsyncStorage.getItem('sesskey');
      const userid = await AsyncStorage.getItem('userid');

      console.log('initializeAuth:', { wstoken, sesskey, userid });

      set({
        wstoken,
        sesskey,
        userid,
        isAuth: !!(wstoken && sesskey && userid),
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  },
  setAuth: async (wstoken, sesskey, userid) => {
    try {
      await AsyncStorage.setItem('wstoken', wstoken);
      await AsyncStorage.setItem('sesskey', sesskey);
      await AsyncStorage.setItem('userid', userid);

      console.log('setAuth:', { wstoken, sesskey, userid });

      set({ wstoken, sesskey, userid, isAuth: true });
    } catch (error) {
      console.error('Error setting auth:', error);
    }
  },
  clearAuth: async () => {
    try {
      await AsyncStorage.removeItem('wstoken');
      await AsyncStorage.removeItem('sesskey');
      await AsyncStorage.removeItem('userid');

      console.log('clearAuth');

      set({ wstoken: null, sesskey: null, userid: null, isAuth: false });
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },
}));

export default useAuthStore;