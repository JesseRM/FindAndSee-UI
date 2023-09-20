import styles from "@/styles/SubmitFind.module.css";

const SubmitFind = () => {
  return (
    <div>
      <h1 className={styles["header"]}>Submit Find</h1>
      <form className={styles["form"]}>
        <div className="form-group my-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="image">Image</label>
          <input type="file" className="form-control" id="image" />
        </div>
        <div className="form-group my-4">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            className="form-control"
            id="longitude"
            aria-describedby="longitude"
            placeholder="Enter longitude"
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            className="form-control"
            id="latitude"
            aria-describedby="latitude"
            placeholder="Enter latitude"
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            aria-describedby="description"
            placeholder="Enter description"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitFind;
