export const isPasswordConfirmed = (
  password?: string,
  confirmPassword?: string
) => {
  return (
    (confirmPassword || "").trim() === "" ||
    ((password || "").trim() !== "" && password === confirmPassword)
  );
};

export default isPasswordConfirmed;
