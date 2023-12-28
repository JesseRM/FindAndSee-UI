"use client";

import SearchBar from "@/components/SearchBar";
import styles from "../styles/Home.module.css";
import Find from "@/components/Find";
import { useEffect, useState } from "react";
import FindBasic from "@/interfaces/FindBasic";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [recentFinds, setRecentFinds] = useState<FindBasic[]>([]);
  const getRecentFindsUrl = process.env.NEXT_PUBLIC_API + "/finds/recent";

  useEffect(() => {
    fetchRecentFinds();
  }, []);

  function fetchRecentFinds() {
    axios
      .get(getRecentFindsUrl)
      .then((response) => {
        console.log(response.data);
        setRecentFinds(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
        }
      });
  }

  function searchHandler(term: string) {
    if (!term || term.trim().length === 0) return;

    const url = "/find/search/" + term;
    router.push(url);
  }

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
        <SearchBar searchHandler={searchHandler} />
        <h2 className="my-5 px-5">Recent finds</h2>
        <div className={styles["finds-container"]}>
          {recentFinds.length > 0 &&
            recentFinds.map((find, index) => <Find key={index} find={find} />)}
        </div>
      </div>
    </main>
  );
}
