export interface EmailData {
  email: string;
};

export interface ResetPasswordData {
  token: string;
  password: string;
};

export interface LoginData {
  email: string;
  password: string;
};
