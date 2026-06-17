import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        console.log("TOGGLE CALLED, current theme:", theme);
        setTheme(prev => {
            const next = prev === 'light' ? 'dark' : 'light';
            console.log("SETTING THEME TO:", next);
            return next;
        });
    };

    useEffect(() => {
        console.log("EFFECT RUNNING, theme:", theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        console.log("HTML classes:", document.documentElement.className);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    console.log("useTheme called, context:", context);
    return context;
};