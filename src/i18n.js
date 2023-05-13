// This is the localization main file ;
// This is the localization file ;
import React from "react";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next"
import translationES from "./locales/English/translation.json"
import translationAR from "./locales/Arabic/translation.json"
import translationHN from "./locales/Hindi/translation.json"


const resources = {
    en : {
        translation : translationES
    } ,
    ar : {
        translation : translationAR
    },
    hn : {
        translation : translationHN
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources ,
        lng: "en" ,
        keySeparator : false,
        interpolation : {
            escapeValue : false
        }
    });

export default i18n ;