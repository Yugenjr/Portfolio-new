import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'yugen-theme';

export function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'dark';
}

export function applyDarkMode(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(getInitialDarkMode);

  useEffect(() => {
    applyDarkMode(isDark);
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggle };
}
