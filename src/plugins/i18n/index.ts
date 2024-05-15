import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt_BR from "./lang/pt_BR.json";

i18n.use(initReactI18next).init({
  resources: {
    pt_BR: pt_BR,
  },
  interpolation: { escapeValue: false },
  lng: "pt_BR",
});
