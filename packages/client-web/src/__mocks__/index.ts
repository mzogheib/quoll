import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const initMocks = async () => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const worker = setupWorker(...handlers);

  return await worker.start();
};
