import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { EmailData, LoginData, ResetPasswordData } from "@/types/auth";
import { User } from "@/types/user";

// Login
export async function loginService(payload: LoginData): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.post('/auth/login/', payload)

  return res;
}

export async function forgotPasswordService(payload: EmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/forgot-password/', payload)
  
  return res;
}

export async function resetPasswordService(payload: ResetPasswordData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/reset-password/', payload)
  
  return res;
}

export async function refreshTokenService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/refresh/')
  
  return res;
}

// Logout
export async function logoutService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/logout/')
  
  return res;
}
