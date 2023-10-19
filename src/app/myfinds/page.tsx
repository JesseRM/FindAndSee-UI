"use client";

import Find from "@/components/Find";
import FindBasic from "@/interfaces/FindBasic";
import styles from "@/styles/MyFinds.module.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "authConfig";
import axios from "axios";
import { useEffect, useState } from "react";

const MyFinds = () => {
  const { instance, accounts } = useMsal();
  const [myFinds, setMyFinds] = useState<FindBasic[]>([]);

  useEffect(() => {
    instance.initialize();

    instance
      .acquireTokenSilent({
        scopes: [
          "https://renewareauth.onmicrosoft.com/findandsee-api/finds.read",
        ],
        account: accounts[0],
      })
      .then((response) => {
        if (response.accessToken) {
          fetchMyfinds(response.accessToken);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accounts, instance]);

  function handleLoginRedirect() {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  }

  function fetchMyfinds(accessToken: string) {
    const url = process.env.NEXT_PUBLIC_API + "/finds/user";
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    axios.get(url, config).then((response) => {
      setMyFinds(response.data);
    });
  }

  return (
    <div>
      <AuthenticatedTemplate>
        <h1 className={styles["header"]}>My Finds</h1>
        <div className={styles["my-finds-container"]}>
          {myFinds &&
            myFinds.map((find, index) => <Find key={index} find={find} />)}
          {myFinds.length === 0 && (
            <h3 className="text-center my-4">
              You have not submitted any finds yet...
            </h3>
          )}
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1 className={styles["header"]}>My Likes</h1>
        <div className="row">
          <div className="card border-secondary col-8 col-md-4 mx-auto">
            <div className="card-body">
              <h2 className="text-center">Please login</h2>
              <div className="text-center">
                <button
                  onClick={handleLoginRedirect}
                  type="button"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default MyFinds;
