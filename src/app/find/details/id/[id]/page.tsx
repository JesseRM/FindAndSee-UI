import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import styles from "@/styles/FindDetails.module.css";

const FindDetails = () => {
  const find = {
    title: "Beautiful forest",
    imageUrl: "https://i.imgur.com/8W5XPMe.jpeg",
    authorUsername: "John_Doe",
    longitude: 24.0023,
    latitude: -32.2323,
    date_created: "2023-09-01",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=-32.2323,24.0023",
    description:
      "Found this amazing spot one day while doing a jog. If you want a nice peaceful place check it out.",
  };

  const userPageUrl = "/user/32r23r322234";

  return (
    <>
      <div className={styles["header"]}>
        <h1 className={styles["find-title"]}>{find.title}</h1>
        <div>
          <Link style={{ textDecoration: "none" }} href={userPageUrl}>
            {find.authorUsername}
          </Link>
        </div>
        <div>{find.date_created}</div>
      </div>

      <div className={styles["find-image-container"]}>
        <img
          className={styles["find-image"]}
          src={find.imageUrl}
          alt="Find image"
        />
      </div>
      <div className={styles["find-body-container"]}>
        <p>
          <b>Longitude: </b>
          {find.longitude}
        </p>
        <p>
          <b>Latitude: </b>
          {find.latitude}
        </p>
        <p>
          <b>Google Maps Link</b>{" "}
          <Link href={find.googleMapsUrl}>
            <BiLinkExternal />
          </Link>
        </p>
        <br />
        <h4>Description</h4>
        <p>{find.description}</p>
      </div>
    </>
  );
};

export default FindDetails;
