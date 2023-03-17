import styles from "./GridBlock.module.css";

const GridBlock = (props) => {
  const { arrayOfBlocks, onHover, hoveredElements } = props;

  return (
    <div className={styles.wrapper}>
      {arrayOfBlocks.map((rowItem, rowIndex) => {
        return (
          <div key={rowIndex} className={styles.rowItem}>
            {rowItem.map((_, rowElementIndex) => {
              const id = `${rowIndex + 1}-${rowElementIndex + 1}`;
              const isHovered = hoveredElements.includes(id);
              //   const prevEl =
              //     hoveredElements[hoveredElements.length - 1] ===
              //       rowElementIndex && hoveredElements[hoveredElements.length];

              return (
                <div
                  className={`${styles.block} ${isHovered && styles.active}`}
                  onMouseEnter={() => {
                    if (!isHovered) {
                      return onHover((prev) => [...prev, id]);
                    }

                    return onHover((prev) => {
                      return prev.filter((el) => el !== id);
                    });
                  }}
                  key={id}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridBlock;
