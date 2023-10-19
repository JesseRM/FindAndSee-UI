"use client";

import Find from "@/components/Find";
import FindBasic from "@/interfaces/FindBasic";
import styles from "@/styles/MyLikes.module.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "authConfig";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import getAccessToken from "util/token";

const MyLikes = () => {
  const { instance, accounts } = useMsal();
  const [fetching, setFetching] = useState(true);
  const [likedFinds, setLikedFinds] = useState<FindBasic[]>([]);

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const fetchLikedfinds = useCallback(async () => {
    const accessToken = await getAccessToken(instance, accounts[0]);
    const url = process.env.NEXT_PUBLIC_API + "/finds/liked";
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    axios.get(url, config).then((response) => {
      setFetching(false);
      setLikedFinds(response.data);
    });
  }, [instance, accounts]);

  useEffect(() => {
    fetchLikedfinds();
  }, [accounts, instance, fetchLikedfinds]);

  return (
    <div>
      <AuthenticatedTemplate>
        <h1 className={styles["header"]}>My Likes</h1>
        <div className={styles["liked-finds-container"]}>
          {fetching && (
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {likedFinds &&
            likedFinds.map((find, index) => <Find key={index} find={find} />)}
          {!fetching && likedFinds.length === 0 && (
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
