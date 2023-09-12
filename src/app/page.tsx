"use client";

import SearchBar from "@/components/SearchBar";
import styles from "../styles/Home.module.css";
import Find from "@/components/Find";

export default function Home() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <main>
      <div className={styles["welcome-container"]}>
        <h1 className={styles["welcome"]}>Found something interesting?</h1>
        <p className={styles["welcome-sub"]}>
          Take a picture, grab the coordinates
        </p>
        <p className={styles["welcome-sub"]}>And share with others :)</p>
        <hr />
      </div>
      <div>
        <SearchBar />
        <div className={styles["finds-container"]}>
          {arr.map((val) => (
            <Find key={val} />
          ))}
        </div>
      </div>
    </main>
  );
}
