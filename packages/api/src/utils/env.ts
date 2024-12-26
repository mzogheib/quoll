import dotenv from "dotenv";

dotenv.config();

/**
 * Get an environment variable. Throws an error if the variable is not found.
 */
export const getEnvVariable = (name: string): string => {
  const value = process.env[name];

  if (value === undefined) {
    throw new Error(`Environment variable not found: ${name}`);
  }

  return value;
};
