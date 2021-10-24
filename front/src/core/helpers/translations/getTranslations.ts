import translations from "./translations";

const getTranslations = (language?: string) => {
  const DEAFULT_LANGUAGE = "ru";
  return translations[language || DEAFULT_LANGUAGE];
};

export default getTranslations;
