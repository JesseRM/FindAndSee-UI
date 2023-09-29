"use client";

import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import styles from "@/styles/FindDetails.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import FindDetails from "@/interfaces/FindDetails";
import { create } from "domain";

const FindDetails = ({ params }: { params: { id: string } }) => {
  const [findDetails, setFindDetails] = useState<FindDetails | null>(null);
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  useEffect(() => {
    fetchFindDetails(params.id);
  }, [params.id]);

  function fetchFindDetails(findId: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API + "/finds/id/" + findId;

    axios.get(apiUrl).then((response) => {
      setFindDetails(response.data);
    });
  }

  function createGoogleMapsLink(longitude: number, latitude: number) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  return (
    <>
      {findDetails && (
        <>
          <div className={styles["heading-container"]}>
            <h1 className={styles["title"]}>{findDetails.title}</h1>
            <div className={styles["display-name-container"]}>
              <Link
                style={{ textDecoration: "none" }}
                href={"/user/" + findDetails.displayName}
              >
                {findDetails.displayName}
              </Link>
            </div>
            <div className={styles["date-container"]}>
              {new Date(findDetails.dateCreated).toLocaleDateString(
                "en-US",
                dateOptions,
              )}
            </div>
          </div>

          <div className={styles["image-container"]}>
            <img
              className={styles["image"]}
              src={findDetails.imageUrl}
              alt="Find image"
            />
          </div>
          <div className={styles["body-container"]}>
            <p>
              <b>Longitude: </b>
              {findDetails.longitude}
            </p>
            <p>
              <b>Latitude: </b>
              {findDetails.latitude}
            </p>
            <p>
              <b>Google Maps Link</b>{" "}
              <Link
                href={createGoogleMapsLink(
                  findDetails.longitude,
                  findDetails.latitude,
                )}
              >
                <BiLinkExternal />
              </Link>
            </p>
            <br />
            <h4>Description</h4>
            <p>{findDetails.description}</p>
          </div>
        </>
      )}
    </>
  );
};

export default FindDetails;
