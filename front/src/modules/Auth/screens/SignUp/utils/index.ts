export const isSignUpValid = (
  nickname?: string,
  password?: string,
  confirmPassword?: string
) => {
  return (
    (nickname || "").trim() !== "" &&
    (password || "").trim() !== "" &&
    (confirmPassword || "").trim() !== "" &&
    password === confirmPassword
  );
};

export const isPasswordConfirmed = (
  password?: string,
  confirmPassword?: string
) => {
  return (
    (confirmPassword || "").trim() === "" ||
    ((password || "").trim() !== "" && password === confirmPassword)
  );
};
