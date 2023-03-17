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
                  onMouseLeave={() => {
                    // maybe we need to add remove last element hovered when we return to element which has already existed
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
