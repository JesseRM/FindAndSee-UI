import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";

const getAccessToken = async (
  msalInstance: IPublicClientApplication,
  account: AccountInfo,
) => {
  let accessToken: string | null = null;

  await msalInstance.initialize();

  await msalInstance
    .acquireTokenSilent({
      scopes: [
        "https://renewareauth.onmicrosoft.com/findandsee-api/finds.write",
      ],
      account,
    })
    .then((response) => {
      if (response.accessToken) {
        accessToken = response.accessToken;
      }
    });

  return accessToken;
};

export default getAccessToken;
