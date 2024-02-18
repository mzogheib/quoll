import { API_URL } from "@env";
import { ApiService } from "@quoll/client-lib";

export const apiService = new ApiService(API_URL);
