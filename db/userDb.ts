import pool from "../config/connection";

const getUserByEmailDb = async (email: string, type: string) => {
  const { rows: user } = await pool.query(
    "select users.* from users where lower(email) = lower($1) and type=$2",
    [email, type]
  );
  return user[0];
};

const getUserByIDDb = async (id: number) => {
  const { rows: user } = await pool.query(
    "select users.* from users where user_id = $1",
    [id]
  );
  return user[0];
};

const getAllUsersDb = async () => {
  const { rows: users } = await pool.query(
    "select users.*, sum(times_spent.time_spent) as time_spent from users join  times_spent on  times_spent.user_id=users.user_id where users.type='user' GROUP BY  users.user_id "
  );
  return users;
};

const setTimeSpentDb = async (user_id: number, timeSpent: number) => {
  const { rows: times_spents } = await pool.query(
    "select * from times_spent where user_id=$1 and date=NOW()::date",
    [user_id]
  );

  if (times_spents.length == 0) {
    const { rows: times_spent } = await pool.query(
      'insert into public."times_spent" (user_id, date,time_spent) values ($1,NOW()::date,$2) returning times_spent',
      [user_id, timeSpent]
    );
  } else {
    let newTimeSpen = times_spents[0].time_spent + timeSpent;
    console.log(newTimeSpen);
    await pool.query(
      "update times_spent set time_spent = $1 where date=NOW()::date and user_id=$2",
      [newTimeSpen, user_id]
    );
  }
  return times_spents;
};
export { getAllUsersDb, getUserByEmailDb, getUserByIDDb, setTimeSpentDb };
