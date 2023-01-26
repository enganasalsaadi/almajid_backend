const validateUser = (email: string, password: string) => {
  const validEmail = typeof email === "string" && email.trim() !== "";
  const validPassword =
    typeof password === "string" && password.trim().length >= 6;

  return validEmail && validPassword;
};

export { validateUser };
