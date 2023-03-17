import styles from "./InforBlok.module.css";

const InfoBlock = ({ hoveredElements }) => {
  return (
    <>
      <h2 className={styles.titleInfo}>Hover squars</h2>
      <ul className={styles.infoList}>
        {hoveredElements.map((el) => {
          const [row, column] = el.split("-");

          return (
            <li key={el} className={styles.infoItem}>
              <p>{`row ${row} column ${column}`}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default InfoBlock;
