"use client";

import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsQuestionSquare } from "react-icons/bs";
import styles from "@/styles/FindDetails.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Find from "@/interfaces/Find";
import getAccessToken from "util/token";
import { useMsal } from "@azure/msal-react";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

const FindDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { instance, accounts } = useMsal();
  const [find, setFind] = useState<Find | null>(null);
  const [liked, setLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const fetchFindDetails = (findId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API + "/finds/id/" + findId;

    axios
      .get(apiUrl)
      .then((response) => {
        const find: Find = response.data;

        setFind(find);
        checkIfLiked(find.findId);
      })
      .catch((error) => {
        const NOT_FOUND = 404;

        if (error.response.status === NOT_FOUND) {
          setNotFound(true);
        } else {
          alert("Something went wrong with your request");
        }
      });
  };

  const checkIfLiked = async (findId: string) => {
    const accessToken = await getAccessToken(instance, accounts[0]);

    if (accessToken) {
      const apiUrl = process.env.NEXT_PUBLIC_API + "/likes/liked/" + findId;
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      axios
        .get(apiUrl, config)
        .then((response) => {
          if (response.data === true) {
            setLiked(true);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.log("Not liked.");
          } else {
            console.log("Error processing request.");
          }
        });
    }
  };

  const Like = async (findId: string) => {
    const accessToken = await getAccessToken(instance, accounts[0]);

    if (accessToken) {
      const apiUrl = process.env.NEXT_PUBLIC_API + "/likes";
      const body = {
        findId,
      };
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      setIsSubmitting(true);

      await axios
        .post(apiUrl, body, config)
        .then((response) => {
          setIsSubmitting(false);
          setLiked(true);
        })
        .catch((error) => {
          setIsSubmitting(false);
          alert("Oops, something went wrong");
        });
    }
  };

  const UnLike = async (findId: string) => {
    const accessToken = await getAccessToken(instance, accounts[0]);

    if (accessToken) {
      const apiUrl = process.env.NEXT_PUBLIC_API + "/likes/delete/" + findId;
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      setIsSubmitting(true);

      await axios
        .delete(apiUrl, config)
        .then((response) => {
          setIsSubmitting(false);
          setLiked(false);
        })
        .catch((error) => {
          setIsSubmitting(false);
          alert("Oops, something went wrong");
        });
    }
  };

  const handleEditClick = () => {
    const url = "/find/edit/id/" + params.id;

    router.push(url);
  };

  function createGoogleMapsLink(longitude: number, latitude: number) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  useEffect(() => {
    fetchFindDetails(params.id);
  }, [params.id]);

  return (
    <>
      {notFound && (
        <div className="d-flex flex-row justify-content-center">
          <div className="text-center my-5">
            <BsQuestionSquare style={{ fontSize: "3rem", margin: "2rem 0" }} />
            <p className="px-3">
              Sorry, what you are looking for does not exist...
            </p>
          </div>
        </div>
      )}
      {find && (
        <>
          <div className={styles["heading-container"]}>
            <h1 className={styles["title"]}>{find.title}</h1>
            <div className={styles["display-name-container"]}>
              <Link
                style={{ textDecoration: "none" }}
                href={"/user/" + find.user.displayName}
              >
                {find.user.displayName}
              </Link>
            </div>
            <div className={styles["date-container"]}>
              {new Date(find.dateCreated).toLocaleDateString(
                "en-US",
                dateOptions,
              )}
            </div>
            <div style={{ height: "3rem" }}>
              {isSubmitting && (
                <div
                  className="spinner-grow spinner-grow-sm text-danger mt-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {liked && !isSubmitting && (
                <AiFillHeart
                  className="fs-2 mt-2"
                  role="button"
                  style={{ color: "red" }}
                  onClick={() => UnLike(find.findId)}
                />
              )}
              {!liked && !isSubmitting && (
                <AiOutlineHeart
                  className="fs-2 mt-2"
                  role="button"
                  onClick={() => Like(find.findId)}
                />
              )}
              <MdEdit
                className="fs-3 mt-1 ms-2"
                role="button"
                onClick={() => handleEditClick()}
              />
            </div>
          </div>
          <div className={styles["image-container"]}>
            <img
              className={styles["image"]}
              src={find.image.url}
              alt="Find image"
            />
          </div>
          <div className={styles["body-container"]}>
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
              <Link
                href={createGoogleMapsLink(find.longitude, find.latitude)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiLinkExternal />
              </Link>
            </p>
            <br />
            <h4>Description</h4>
            <p>{find.description}</p>
          </div>
        </>
      )}
    </>
  );
};

export default FindDetails;
