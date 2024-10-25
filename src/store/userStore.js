import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_token } from '../config/api_token';

function useUserToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem(api_token);
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  const set = useCallback(async (value) => {
    if (value) {
      await AsyncStorage.setItem(api_token, value);
    } else {
      await AsyncStorage.removeItem(api_token);
    }
    setToken(value);
  }, []);

  const clear = useCallback(async () => {
    await AsyncStorage.removeItem(api_token);
    setToken(null);
  }, []);

  return {
    token,
    set,
    clear,
  };
}

export const useIsAuthenticated = () => {
  const { token } = useUserToken();
  return !!token;
};

export default useUserToken;