import fetch from 'node-fetch';
  import {
    ClientBuilder,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
  } from '@commercetools/sdk-client-v2';
  
  // Configure authMiddlewareOptions
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.us-central1.gcp.commercetools.com',
    projectKey: 'ecommerceproject-finaltask',
    credentials: {
      clientId: "QFRqEuFt545cZZ2AtDqq7cVZ",
      clientSecret: "xYrphIUGUc7oO2vSCLcL3P-Ci28hgSz8",
    },
    scopes: ['manage_project:ecommerceproject-finaltask manage_api_clients:ecommerceproject-finaltask'],
    fetch,
  };
  
  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.us-central1.gcp.commercetools.com',
    fetch,
  };
  
  // Export the ClientBuilder
  export const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();