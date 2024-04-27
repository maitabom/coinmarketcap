import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Coin from "../../entities/coin";

import styles from "./detail.module.css";

function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<Coin>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoin() {
      try {
        fetch(`https://api.coincap.io/v2/assets/${cripto}`)
          .then((response) => response.json())
          .then((data) => {
            if ("error" in data) {
              navigate("/");
            } else {
              const coinsData = data.data;

              const resultData: Coin = {
                ...coinsData,
                rank: parseInt(coinsData.rank),
                marketCapUsd: parseFloat(coinsData.marketCapUsd),
                maxSupply: parseFloat(coinsData.maxSupply),
                priceUsd: parseFloat(coinsData.priceUsd),
                supply: parseFloat(coinsData.supply),
                volumeUsd24Hr: parseFloat(coinsData.volumeUsd24Hr),
                vwap24Hr: parseFloat(coinsData.vwap24Hr),
                changePercent24Hr: parseFloat(coinsData.changePercent24Hr),
              };

              setCoin(resultData);
            }
          });
      } catch (error) {
        navigate("/");
      }
    }

    getCoin();
    setLoading(false);
  }, []);

  if (loading || !coin) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando..</h4>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h1 className={styles.center}>
          {coin.name} ({coin.symbol})
        </h1>
        <section className={styles.content}>
          <h2>
            {coin.name} | {coin.symbol}
          </h2>
          <p>
            <strong>Preço:</strong>&nbsp;{coin.priceUsd.toLocaleString("pt-br", { style: "currency", currency: "USD" })}
          </p>
          <p>
            <strong>Mercado:</strong>&nbsp;{coin.marketCapUsd.toLocaleString("pt-br", { style: "currency", currency: "USD", notation: "compact" })}
          </p>
          <p>
            <strong>Volume:</strong>&nbsp;
            <span className={coin.changePercent24Hr > 0 ? styles.tdProfit : styles.tdLoss}>{coin.changePercent24Hr.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %</span>
          </p>
        </section>
      </div>
    );
  }
}

export default Detail;
