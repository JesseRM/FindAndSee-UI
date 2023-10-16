"use client";

import Find from "@/components/Find";
import FindBasic from "@/interfaces/FindBasic";
import styles from "@/styles/MyLikes.module.css";
import { InteractionStatus } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "authConfig";
import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";

const MyLikes = () => {
  const { instance, accounts } = useMsal();
  const [likedFinds, setLikedFinds] = useState<FindBasic[]>([]);

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
          fetchLikedfinds(response.accessToken);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accounts, instance]);

  function handleLoginRedirect() {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  }

  function fetchLikedfinds(accessToken: string) {
    const url = process.env.NEXT_PUBLIC_API + "/finds/liked";
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Access-Control-Allow-Origin": true,
      },
    };

    axios.get(url, config).then((response) => {
      setLikedFinds(response.data);
    });
  }

  return (
    <div>
      <AuthenticatedTemplate>
        <h1 className={styles["header"]}>My Likes</h1>
        <div className={styles["liked-finds-container"]}>
          {likedFinds &&
            likedFinds.map((find, index) => <Find key={index} find={find} />)}
          {likedFinds.length === 0 && (
            <h3 className="text-center my-4">
              You have not liked any finds yet...
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

export default MyLikes;
