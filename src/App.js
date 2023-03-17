import { useState, useEffect, useMemo } from "react";
import Button from "./components/button/Button";
import Select from "./components/select/Select";
import GridBlock from "./components/gridBlock/GridBlock";
import InfoBlock from "./components/infoBlock/InfoBlock";
import useFetch from "./utils/useFetch";

import styles from "./App.module.css";

function App() {
  const [currentLevel, setLevel] = useState({});
  const [hoveredElements, setHoveredElements] = useState([]);

  const { data } = useFetch({
    link: "https://60816d9073292b0017cdd833.mockapi.io/modes",
  });

  useEffect(() => {
    if (data?.[0]) return setLevel(data[0]);
  }, [data]);

  const arrayOfBlocks = useMemo(() => {
    if (currentLevel?.field) {
      const arrayOfNumbers = Array.from({ length: currentLevel?.field }, () =>
        Array.from({ length: currentLevel?.field }, (_, i) => i + 1)
      );
      return arrayOfNumbers;
    }

    return [];
  }, [currentLevel]);

  const handleChangeLevel = (data) => {
    setHoveredElements([]);
    setLevel(data);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.headerBlock}>
          <Select
            options={data}
            currentOption={currentLevel}
            setCurrentOption={handleChangeLevel}
            className={styles.selectWrapper}
          />
          <Button>Start</Button>
        </div>
        <GridBlock
          hoveredElements={hoveredElements}
          onHover={setHoveredElements}
          arrayOfBlocks={arrayOfBlocks}
        />
      </div>
      <div>
        {!!hoveredElements.length && (
          <InfoBlock hoveredElements={hoveredElements} />
        )}
      </div>
    </div>
  );
}

export default App;
