import pool from "../config/connection";

const loginDb = async (email: string, password: string) => {
  const { rows: users } = await pool.query("select * from users");
  return users;
};

export { loginDb };
