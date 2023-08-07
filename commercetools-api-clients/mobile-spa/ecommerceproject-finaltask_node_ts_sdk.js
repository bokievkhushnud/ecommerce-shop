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
      clientId: "XKRG-OiauQi_ViQtpKyAlUVM",
      clientSecret: "jOZISyK0R6lZgzvJ3yGFAF2xQK1fn4ba",
    },
    scopes: ['manage_my_orders:ecommerceproject-finaltask manage_my_profile:ecommerceproject-finaltask view_published_products:ecommerceproject-finaltask view_categories:ecommerceproject-finaltask manage_my_quote_requests:ecommerceproject-finaltask manage_my_shopping_lists:ecommerceproject-finaltask manage_my_quotes:ecommerceproject-finaltask create_anonymous_token:ecommerceproject-finaltask manage_my_business_units:ecommerceproject-finaltask manage_my_payments:ecommerceproject-finaltask'],
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