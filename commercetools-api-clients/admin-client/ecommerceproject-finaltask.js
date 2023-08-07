
  import { createClient } from '@commercetools/sdk-client'
  import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
  import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

  const projectKey = 'ecommerceproject-finaltask'

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.us-central1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: 'QFRqEuFt545cZZ2AtDqq7cVZ',
      clientSecret: 'xYrphIUGUc7oO2vSCLcL3P-Ci28hgSz8',
    },
    scopes: ['manage_project:ecommerceproject-finaltask manage_api_clients:ecommerceproject-finaltask'],
  })
  const httpMiddleware = createHttpMiddleware({
    host: 'https://api.us-central1.gcp.commercetools.com',
  })
  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })
  