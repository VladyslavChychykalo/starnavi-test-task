import { useState, useEffect, useRef } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import styles from "./Select.module.css";

const Select = ({ currentOption, options, setCurrentOption, className }) => {
  const [isSelected, setSelect] = useState(false);

  const selectRef = useRef(null);
  const optionsContainerRef = useRef(null);

  const currentOptionId = currentOption?.id;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (e) => {
    setTimeout(() => {
      if (
        !selectRef.current?.contains(e.target) &&
        !optionsContainerRef.current?.contains(e.target)
      ) {
        setSelect(false);
      }
    }, 0);
  };

  const handleChangeOption = (newOption) => {
    setSelect(false);
    if (currentOption?.id === newOption?.id) return;

    setCurrentOption(newOption);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div
        className={styles.customSelectWrapper}
        ref={selectRef}
        onClick={() => setSelect((prev) => !prev)}
      >
        <p className={styles.selectOption}>{currentOption?.name}</p>

        <ArrowIcon
          className={`${
            isSelected ? styles.arrowIconLeft : styles.arrowIconRight
          }`}
          status={isSelected.toString()}
        />
      </div>
      {isSelected && (
        <ul className={styles.optionsContainerList} ref={optionsContainerRef}>
          {options.map((option) => {
            const optionId = option?.id;

            return (
              <li
                className={`${styles.optionsContainerItem} ${
                  currentOptionId === optionId && styles.actvieOption
                }`}
                key={optionId}
                onClick={() => handleChangeOption(option)}
              >
                <p className={styles.selectOption}>{option.name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
