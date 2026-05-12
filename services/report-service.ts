import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { UpdateReportStatusData } from "@/types/report";


async function reports(): Promise<ApiResponse<Report[]>> {
  const res: ApiResponse<Report[]> = await apiClient.get('/reports/')

  return res;
}

async function reportById(id: string): Promise<ApiResponse<Report>> {
  const res: ApiResponse<Report> = await apiClient.get(`/reports/${id}`)

  return res;
}


export async function updateStatus(id: string, payload: UpdateReportStatusData): Promise<ApiResponse<Report>> {
  const res: ApiResponse<Report> = await apiClient.post(`/reports/${id}/status`, payload)

  return res;
}

const ReportService = {
    reports,
    reportById, 
    updateStatus
};

export default ReportService;