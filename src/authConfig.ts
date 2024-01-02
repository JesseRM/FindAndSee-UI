import { Configuration } from "@azure/msal-browser";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_susi",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://renewareauth.b2clogin.com/renewareauth.onmicrosoft.com/B2C_1_susi",
    },
  },
  authorityDomain: "renewareauth.b2clogin.com",
};

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
  },
  // More configuration here
};

export const protectedResources = {
  apiFindAndSee: {
    endpoint: "https://fandandsee-api.onrender.com/api",
    scopes: {
      read: ["https://renewareauth.onmicrosoft.com/findandsee-api/finds.read"],
      write: [
        "https://renewareauth.onmicrosoft.com/findandsee-api/finds.write",
      ],
    },
  },
};

export const loginRequest = {
  scopes: [
    ...protectedResources.apiFindAndSee.scopes.read,
    ...protectedResources.apiFindAndSee.scopes.write,
  ],
};
