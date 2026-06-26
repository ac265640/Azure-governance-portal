// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state in local storage.
 * @param {string} key Local storage key.
 * @param {any} initialValue Default value.
 * @returns {[any, Function]} State and setter.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
