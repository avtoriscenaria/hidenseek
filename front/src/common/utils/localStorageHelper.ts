const localStorageHelper = (action: string, alias: string, data?: any) => {
  switch (action) {
    case "set":
      const ls_data = JSON.stringify(data);
      localStorage.set(alias, ls_data);
      break;
    case "get":
      const itemJSON = localStorage.getItem(alias);
      if (itemJSON !== null) {
        return JSON.parse(itemJSON);
      }
      break;
    case "remove":
      localStorage.removeItem(alias);
      break;
    default:
      break;
  }
};

export default localStorageHelper;
