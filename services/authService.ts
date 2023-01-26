import { getUserByEmailDb } from "../db/userDb";

const loginAction = async (email: string, type: string) => {
  return await getUserByEmailDb(email, type);
};

export { loginAction };
