import { useState } from "react";

import translations from "constants/translations";

import { DEAFULT_LANGUAGE } from "../../constants";

const useTranslations = () => {
  const [language] = useState(DEAFULT_LANGUAGE);

  return translations[language];
};

export default useTranslations;
