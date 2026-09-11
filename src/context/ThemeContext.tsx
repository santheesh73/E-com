import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'red-light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('satro-theme') as Theme | null;
    if (saved === 'red-light' || saved === 'dark' || saved === 'light') {
      return saved;
    }
    return 'light'; // Default to modern light theme
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'red-light');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'red-light') {
      root.classList.add('red-light');
    }
    localStorage.setItem('satro-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'light') return 'red-light';
      if (prev === 'red-light') return 'dark';
      return 'light';
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
