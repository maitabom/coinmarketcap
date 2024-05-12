import { Link } from "react-router-dom";

import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <strong className={styles.logo}>
          Coin<span>MarketCap</span>
        </strong>
      </Link>
    </header>
  );
}

export default Header;
