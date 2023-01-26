import bcrypt from "bcryptjs";

const checkMatchPassword = async (
  enteredPassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

export default checkMatchPassword;
