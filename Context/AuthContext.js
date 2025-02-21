import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService } from '../Services/Auth/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Function to store data in AsyncStorage
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
    }
  };

  // Function to retrieve data from AsyncStorage
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
    }
  };

  // Function to remove data from AsyncStorage
  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);

      if (!data || !data.data || !data.access_token) {
        throw new Error("Invalid response from server");
      }

      const userData = { email, role: data.data.role, id: data.data.id };
      setUser(userData);
      setToken(data.access_token);
      console.log(userData);

      // Store user data and token
      await storeData('loggedIn', userData);
      console.log("after storage");

      await storeData('token', data.access_token);
    } catch (error) {
      console.error("Login Error:", error);
      // Uncomment if you want to show a toast message on error
      // Toast.show({
      //   text1: "Login Error",
      //   text2: error?.message || "Something went wrong",
      //   type: 'error',
      // });
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    setToken(null);
    await removeData('loggedIn');
    await removeData('token');
  };

  // Load stored user data and token on app start
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await getData('loggedIn');
      const storedToken = await getData('token');
      if (storedUser) setUser(storedUser);
      if (storedToken) setToken(storedToken);
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
