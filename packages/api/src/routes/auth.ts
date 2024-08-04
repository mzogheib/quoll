import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

const scopes = ["read:all_data"];

const checkScopes = requiredScopes(scopes);

export const authMiddleware = [checkJwt, checkScopes];
