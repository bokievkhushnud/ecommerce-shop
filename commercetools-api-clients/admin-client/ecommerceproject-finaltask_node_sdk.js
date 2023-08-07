
  const { createClient } = require('@commercetools/sdk-client')
  const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
  const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
  const fetch = require('node-fetch')

  const projectKey = 'ecommerceproject-finaltask'

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.us-central1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: 'QFRqEuFt545cZZ2AtDqq7cVZ',
      clientSecret: 'xYrphIUGUc7oO2vSCLcL3P-Ci28hgSz8',
    },
    scopes: ['manage_project:ecommerceproject-finaltask manage_api_clients:ecommerceproject-finaltask'],
    fetch,
  })
  const httpMiddleware = createHttpMiddleware({
    host: 'https://api.us-central1.gcp.commercetools.com',
    fetch,
  })
  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })
  