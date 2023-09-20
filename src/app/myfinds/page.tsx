import Find from "@/components/Find";
import styles from "@/styles/MyFinds.module.css";

const MyFinds = () => {
  const myFinds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <h1 className={styles["header"]}>My Finds</h1>
      <div className={styles["my-finds-container"]}>
        {myFinds.map((val) => (
          <Find key={val} />
        ))}
      </div>
    </div>
  );
};

export default MyFinds;
