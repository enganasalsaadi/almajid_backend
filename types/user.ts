/**
 * Custom User interface used in combination with Express Request / Response types
 */

interface User {
  user?: {
    user_id: number | undefined;
    fullname: string;
    email: string;
    type: string;
  };
}

export default User;
