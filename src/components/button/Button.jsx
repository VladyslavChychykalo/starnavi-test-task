import styles from "./Button.module.css";

const Button = (props) => {
  const { children } = props;

  return <button className={styles.btn}>{children}</button>;
};

export default Button;
