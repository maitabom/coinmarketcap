import { Link } from "react-router-dom";

import styles from "./header.module.css";
import logo from "../../assets/logo.svg";


function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <img src={logo} alt="DevCurrency" />
      </Link>
    </header>
  );
}

export default Header;
