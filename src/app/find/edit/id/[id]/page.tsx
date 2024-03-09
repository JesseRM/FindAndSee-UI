"use client";

import { FieldValues, useForm } from "react-hook-form";
import styles from "@/styles/EditFind.module.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import axios from "axios";
import { loginRequest } from "authConfig";
import getAccessToken from "util/token";
import Find from "@/interfaces/Find";
import { useEffect, useState } from "react";

const EditFind = ({ params }: { params: { id: string } }) => {
  const { instance, accounts } = useMsal();
  const [find, setFind] = useState<Find | null>(null);
  const [notFound, setNotFound] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const accessToken = await getAccessToken(instance, accounts[0]);
      accounts[0].idTokenClaims?.oid;

      const url = process.env.NEXT_PUBLIC_API + "/finds";
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("longitude", data.longitude);
      formData.append("latitude", data.latitude);
      formData.append("description", data.description);
      formData.append("authorObjectId", accounts[0].idTokenClaims?.oid as any);
      formData.append("findId", params.id);

      await axios.put(url, formData, config);

      alert("Successfully edited");

      reset(undefined, { keepValues: true });
    } catch (error) {
      alert("Something went wrong, try again later");

      reset();
    }
  };

  function handleLoginRedirect() {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  }

  const fetchFindDetails = (findId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API + "/finds/id/" + findId;

    axios
      .get(apiUrl)
      .then((response) => {
        const find: Find = response.data;

        setFind(find);
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

  useEffect(() => {
    fetchFindDetails(params.id);
  }, [params.id]);

  return (
    <div>
      <h1 className={styles["header"]}>Edit Find</h1>
      <AuthenticatedTemplate>
        {find && (
          <>
            <div className={styles["image-container"]}>
              <img
                className={styles["image"]}
                src={find.image.url}
                alt="Find image"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
              <div className="form-group my-4">
                <label htmlFor="title">Title</label>
                <input
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 100,
                      message: "Title cannot be more than 100 characters",
                    },
                  })}
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Enter title"
                  defaultValue={find.title}
                />
                {errors.title && (
                  <p className="text-danger">
                    {errors.title.message?.toString()}
                  </p>
                )}
              </div>
              <div className="form-group my-4">
                <label htmlFor="longitude">Longitude</label>
                <input
                  {...register("longitude", {
                    required: "Longitude is required",
                    min: {
                      value: -180,
                      message: "Longitude cannot be less than -180",
                    },
                    max: {
                      value: 180,
                      message: "Longitude cannot be more than 180",
                    },
                  })}
                  type="number"
                  step="any"
                  className="form-control"
                  id="longitude"
                  aria-describedby="longitude"
                  placeholder="Enter longitude"
                  defaultValue={find.longitude}
                />
                {errors.longitude && (
                  <p className="text-danger">
                    {errors.longitude.message?.toString()}
                  </p>
                )}
              </div>
              <div className="form-group my-4">
                <label htmlFor="latitude">Latitude</label>
                <input
                  {...register("latitude", {
                    required: "Latitude is required",
                    min: {
                      value: -90,
                      message: "Latitude cannot be less than -90",
                    },
                    max: {
                      value: 90,
                      message: "Latitude cannot be more than 90",
                    },
                  })}
                  type="number"
                  step="any"
                  className="form-control"
                  id="latitude"
                  aria-describedby="latitude"
                  placeholder="Enter latitude"
                  defaultValue={find.latitude}
                />
                {errors.latitude && (
                  <p className="text-danger">
                    {errors.latitude.message?.toString()}
                  </p>
                )}
              </div>
              <div className="form-group my-4">
                <label htmlFor="description">Description</label>
                <input
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 500,
                      message: "Description cannot be more than 500 characters",
                    },
                  })}
                  type="text"
                  className="form-control"
                  id="description"
                  aria-describedby="description"
                  placeholder="Enter description"
                  defaultValue={find.description}
                />
                {errors.description && (
                  <p className="text-danger">
                    {errors.description.message?.toString()}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {!isSubmitting && "Submit"}
                {isSubmitting && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
              </button>
            </form>
          </>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
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

export default EditFind;
