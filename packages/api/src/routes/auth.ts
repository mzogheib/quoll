import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { getEnvVariable } from "../utils/env";

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: getEnvVariable("AUTH0_AUDIENCE"),
  issuerBaseURL: getEnvVariable("AUTH0_ISSUER_BASE_URL"),
  tokenSigningAlg: "RS256",
});

const scopes = ["read:all_data"];

const checkScopes = requiredScopes(scopes);

export const authMiddleware = [checkJwt, checkScopes];
