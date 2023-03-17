import { useState, useEffect, useMemo } from "react";
import Button from "./components/button/Button";
import Select from "./components/select/Select";
import GridBlock from "./components/gridBlock/GridBlock";
import InfoBlock from "./components/infoBlock/InfoBlock";
import useFetch from "./utils/useFetch";

import styles from "./App.module.css";

function App() {
  const [currentLevel, setLevel] = useState(null);
  const [currentOption, setCurrentOption] = useState(null);
  const [hoveredElements, setHoveredElements] = useState([]);

  const { data, loading } = useFetch({
    link: "https://60816d9073292b0017cdd833.mockapi.io/modes",
  });

  useEffect(() => {
    if (data?.[0]) {
      setLevel(data[0]);
      setCurrentOption(data[0]);
    }
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
    // setHoveredElements([]);
    setCurrentOption(data);
  };

  return (
    <>
      {loading ? (
        <h3 className={styles.loadingStatus}>Please wait loading ...</h3>
      ) : (
        <div className={styles.wrapper}>
          <div>
            <div className={styles.headerBlock}>
              <Select
                options={data}
                currentOption={currentOption}
                setCurrentOption={handleChangeLevel}
                className={styles.selectWrapper}
              />
              <Button
                onClick={() => {
                  setLevel(currentOption);
                  setHoveredElements([]);
                }}
              >
                Start
              </Button>
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
      )}
    </>
  );
}

export default App;
