import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { CreateModerationData, Moderation } from "@/types/moderation";

async function create(payload: CreateModerationData): Promise<ApiResponse<Moderation>> {
  const res: ApiResponse<Moderation> = await apiClient.post('/moderation/', payload)

  return res;
}

async function history(id: string): Promise<ApiResponse<Moderation>> {
  const res: ApiResponse<Moderation> = await apiClient.get(`/moderation/history/${id}`)

  return res;
}

const ModerationService = {
  create,
  history,
};

export default ModerationService;