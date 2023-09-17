import Find from "@/components/Find";
import styles from "@/styles/MyLikes.module.css";

const MyLikes = () => {
  const likedFinds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <h1 className={styles["header"]}>My Likes</h1>
      <div className={styles["liked-finds-container"]}>
        {likedFinds.map((val) => (
          <Find key={val} />
        ))}
      </div>
    </div>
  );
};

export default MyLikes;
