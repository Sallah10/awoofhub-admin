export const AUTH_COOKIE = 'auth-token';

export const MOCK_AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

type MockUser = {
  id: number,
  email: string,
  password: string,
  username: string

};

export const mockUsers: MockUser[] = [
  {
    id: 1,
    email: 'user1@test.com',
    password: 'password',
    username: "alextest_24",
  },
];