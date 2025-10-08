#! /bin/bash
# Run jwt-keygen and capture the output
JWT_OUTPUT=$(jwt-keygen)

# Split the output into two variables
# The first line will be assigned to JWT_VERIFICATION_KEY
# The second line will be assigned to JWT_SIGNING_KEY
JWT_PRIVATE_KEY=$(echo "$JWT_OUTPUT" | sed -n '1p')
JWKS=$(echo "$JWT_OUTPUT" | sed -n '2p')

npx convex env set JWT_PRIVATE_KEY -- "$JWT_PRIVATE_KEY"
npx convex env set JWKS "$JWKS"

npx convex env set SITE_URL http://localhost:5173