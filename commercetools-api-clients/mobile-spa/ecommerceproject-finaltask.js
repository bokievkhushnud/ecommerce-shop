
  import { createClient } from '@commercetools/sdk-client'
  import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
  import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

  const projectKey = 'ecommerceproject-finaltask'

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.us-central1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: 'XKRG-OiauQi_ViQtpKyAlUVM',
      clientSecret: 'jOZISyK0R6lZgzvJ3yGFAF2xQK1fn4ba',
    },
    scopes: ['manage_my_orders:ecommerceproject-finaltask manage_my_profile:ecommerceproject-finaltask view_published_products:ecommerceproject-finaltask view_categories:ecommerceproject-finaltask manage_my_quote_requests:ecommerceproject-finaltask manage_my_shopping_lists:ecommerceproject-finaltask manage_my_quotes:ecommerceproject-finaltask create_anonymous_token:ecommerceproject-finaltask manage_my_business_units:ecommerceproject-finaltask manage_my_payments:ecommerceproject-finaltask'],
  })
  const httpMiddleware = createHttpMiddleware({
    host: 'https://api.us-central1.gcp.commercetools.com',
  })
  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })
  