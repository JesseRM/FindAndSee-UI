"use client";

import Find from "@/components/Find";
import SearchBar from "@/components/SearchBar";
import FindBasic from "@/interfaces/FindBasic";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Search({ params }: { params: { term: string } }) {
  const router = useRouter();
  const [finds, setFinds] = useState<FindBasic[]>([]);
  const [term, setTerm] = useState(params.term);
  const [fetching, setFetching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [serverError, setServerError] = useState(false);

  const fetchFindsWithTerm = () => {
    if (!term || term.trim().length === 0) return;

    const url = process.env.NEXT_PUBLIC_API + "/finds/search/" + term;

    setFetching(true);

    axios
      .get(url)
      .then((result) => {
        setFetching(false);
        setFinds(result.data);
      })
      .catch((error) => {
        if (error.response) {
          setFetching(false);

          if (error.response.status === 404) {
            setNoResults(true);
          } else if (error.response.status >= 500) {
            setServerError(true);
          }
        }
      });
  };

  function searchHandler(term: string) {
    if (!term || term.trim().length === 0) return;

    setTerm(term);
    setFinds([]);
    setFetching(true);

    //Update URL with new term
    router.push("/find/search/" + term);
  }

  useEffect(() => {
    fetchFindsWithTerm();
  }, []);

  return (
    <div>
      <h1 className="p-4 p-md-5">{params.term}</h1>
      <SearchBar searchHandler={searchHandler} />
      {fetching && <Spinner />}
      {noResults && (
        <div className="mt-5">
          <h2 className="text-center">Sorry, no results</h2>
        </div>
      )}
      {serverError && (
        <div className="mt-5">
          <h2 className="text-center">
            Sorry, something went wrong with your request
          </h2>
        </div>
      )}
      <div className={styles["finds-container"]}>
        {finds.length > 0 &&
          finds.map((find, index) => <Find key={index} find={find} />)}
      </div>
    </div>
  );
}
