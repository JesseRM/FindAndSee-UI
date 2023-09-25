/* eslint-disable @next/next/no-img-element */
"use client";

import FindBasic from "@/interfaces/FindBasic";
import styles from "@/styles/Find.module.css";
import Link from "next/link";

interface FindProps {
  find: FindBasic;
}
const Find = ({ find }: FindProps) => {
  return (
    <div className={styles["find"]}>
      <div className={styles["find-title"]}>{find.title}</div>
      <Link href={"/find/details/id/" + find.findId}>
        <div className={styles["find-image-container"]}>
          <img
            className={styles["find-image"]}
            src={find.imageUrl}
            alt="Find image"
          />
        </div>
      </Link>
    </div>
  );
};

export default Find;
