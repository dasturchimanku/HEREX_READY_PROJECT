import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../lang/en.json";
import uz from "../lang/uz.json";
import ru from "../lang/ru.json";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem("lang") || "uz");
    const [strings, setStrings] = useState(uz);

    useEffect(() => {
        let selected;
        switch (lang) {
            case "en":
                selected = en;
                break;
            case "ru":
                selected = ru;
                break;
            default:
                selected = uz;
        }
        setStrings(selected);
        localStorage.setItem("lang", lang);
    }, [lang]);

    // 🟢 Agar strings hali yuklanmagan bo‘lsa — fallback bo‘lishi kerak
    if (!strings) {
        return (
            <div className="text-center text-gray-500 mt-10">Loading...</div>
        );
    }

    return (
        <LangContext.Provider value={{ lang, setLang, strings }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => useContext(LangContext);
