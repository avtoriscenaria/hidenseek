import translations from "../../constants/translations";

const useTranslations = (language?: string) => {
  const DEAFULT_LANGUAGE = "ru";
  return translations[language || DEAFULT_LANGUAGE];
};

export default useTranslations;
