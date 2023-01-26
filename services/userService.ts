import { getAllUsersDb, getUserByIDDb, setTimeSpentDb } from "../db/userDb";
const getAllUsers = async () => {
  try {
    return await getAllUsersDb();
  } catch (error) {
    console.log(error);
  }
};

const getUserByID = async (user_id: number) => {
  try {
    return await getUserByIDDb(user_id);
  } catch (error) {
    console.log(error);
  }
};

const setTimeSpent = async (user_id: number, timeSpent: number) => {
  return await setTimeSpentDb(user_id, timeSpent);
};

export { getAllUsers, getUserByID, setTimeSpent };
