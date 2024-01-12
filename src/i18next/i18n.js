import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "kz",
    interpolation: {
        escapeValue: false // not needed for react as it escapes by default
    },
    lng: localStorage.getItem("language") || "kz",
    resources: {
        en: {
            translations: require("./locales/en/translation.json")
        },
        kz: {
            translations: require("./locales/KZ/translation.json")
        },
        ru: {
            translations: require("./locales/RU/translation.json")
        },


    },
    ns: ["translations"],
    defaultNS: "translations"
});

export default i18n;
