import { delay, http, HttpResponse } from 'msw';
import { AUTH_COOKIE, MOCK_AUTH_TOKEN, mockUsers } from '../utils';


export const loginHandler = http.post<any, { email: string; password: string }>(
  `http://localhost/api/v1/auth/login`,
  async ({ request }) => {
    const { email, password } = await request.json();


    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    await delay(300);


    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }


    const { password: _, ...safeUser } = user;

    return HttpResponse.json(
      { user: safeUser },
      {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=${MOCK_AUTH_TOKEN}; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );
  }
)

export const signupHandler = http.post<
  any,
  { email: string; password: string; name: string; username: string }
>(
  `http://localhost/api/v1/auth/registration`,
  async ({ request }) => {
    const { email, password, username } = await request.json();

    // Check if email or username already exists
    const existingUser = mockUsers.find(
      (u) => u.email === email || u.username === username
    );

    if (existingUser) {
      const message =
        existingUser.email === email
          ? 'Email already in use'
          : 'Username already in use';

      return HttpResponse.json(
        { message },
        { status: 409 } // Conflict
      );
    }

    // Simulate network/database delay
    await delay(300);

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      email,
      username, // keep username
      password, // store password in mock (never do this in real app)
    };

    // Add to mock users array
    mockUsers.push(newUser);

    // Return user data without password
    const { password: _, ...safeUser } = newUser;

    return HttpResponse.json(
      { user: safeUser },
      {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=${MOCK_AUTH_TOKEN}; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );
  }
);





export const authHandlers = [
  loginHandler,
  signupHandler
];