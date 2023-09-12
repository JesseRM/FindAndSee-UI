/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import styles from "../styles/Find.module.css";

const Find = () => {
  return (
    <div className={styles["find"]}>
      <div className={styles["find-title"]}>Title of the card</div>
      <div className={styles["find-image-container"]}>
        <img
          className={styles["find-image"]}
          src="https://i.imgur.com/8W5XPMe.jpeg"
          alt="picture"
        />
      </div>
    </div>
  );
};

export default Find;
