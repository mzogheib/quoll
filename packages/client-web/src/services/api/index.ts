import { ApiService } from "@quoll/client-lib";

// TODO handle the potentially undefined env variable better
export const apiService = new ApiService(`${process.env.REACT_APP_API_URL}`);
