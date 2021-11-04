export const isLoginValid = (nickname?: string, password?: string) => {
  return (nickname || "").trim() !== "" && (password || "").trim() !== "";
};

export default isLoginValid;
