export type User = {
  id: number;
  user_id: string;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  password: string;
  account_type: 'User' | 'Admin' | 'Super Admin';
  created_at: string;
};
