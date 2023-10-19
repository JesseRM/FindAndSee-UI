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
import { useCallback, useEffect, useState } from "react";
import getAccessToken from "util/token";

const MyFinds = () => {
  const { instance, accounts } = useMsal();
  const [fetching, setFetching] = useState(true);
  const [myFinds, setMyFinds] = useState<FindBasic[]>([]);

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const fetchMyfinds = useCallback(async () => {
    const accessToken = await getAccessToken(instance, accounts[0]);
    const url = process.env.NEXT_PUBLIC_API + "/finds/user";
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    axios.get(url, config).then((response) => {
      setFetching(false);
      setMyFinds(response.data);
    });
  }, [instance, accounts]);

  useEffect(() => {
    fetchMyfinds();
  }, [accounts, instance, fetchMyfinds]);

  return (
    <div>
      <AuthenticatedTemplate>
        <h1 className={styles["header"]}>My Finds</h1>
        <div className={styles["my-finds-container"]}>
          {fetching && (
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {myFinds &&
            myFinds.map((find, index) => <Find key={index} find={find} />)}
          {!fetching && myFinds.length === 0 && (
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
