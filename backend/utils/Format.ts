export function getApiResponse(
  success: boolean,
  data: any,
  message: string | null
) {
  return { success, data, message };
}
