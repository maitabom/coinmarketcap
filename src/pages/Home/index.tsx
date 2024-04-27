import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import Coin from "../../entities/coin";

import styles from "./home.module.css";

function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
          const coinsData = data.data;
          const result = coinsData.map((item) => {
            const formatado: Coin = {
              ...item,
              rank: parseInt(item.rank),
              marketCapUsd: parseFloat(item.marketCapUsd),
              maxSupply: parseFloat(item.maxSupply),
              priceUsd: parseFloat(item.priceUsd),
              supply: parseFloat(item.supply),
              volumeUsd24Hr: parseFloat(item.volumeUsd24Hr),
              vwap24Hr: parseFloat(item.vwap24Hr),
              changePercent24Hr: parseFloat(item.changePercent24Hr),
            };

            return formatado;
          });

          const pivot = [...coins, ...result];
          setCoins(pivot);
        });
    }

    getData();
  }, [offset]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (input !== "") {
      navigate(`/detail/${input}`);
    }
  }

  function handleGetMore() {
    if (offset === 0) {
      setOffset(10);
    } else {
      setOffset(offset + 10);
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="search" placeholder="Digite o nome da moeda" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">
          <BsSearch size={30} color="#fff" />
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor do mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança (24 h)</th>
          </tr>
        </thead>
        <tbody>
          {coins.length > 0 &&
            coins.map((item) => (
              <tr className={styles.tr} key={item.id}>
                <td className={styles.tdLabel} data-label="Moeda">
                  <div className={styles.name}>
                    <Link to={`/detail/${item.id}`}>
                      <span>{item.name}</span> | {item.symbol}
                    </Link>
                  </div>
                </td>
                <td className={styles.tdLabel} data-label="Valor do mercado">
                  {item.marketCapUsd.toLocaleString("pt-br", { style: "currency", currency: "USD", notation: "compact" })}
                </td>
                <td className={styles.tdLabel} data-label="Preço">
                  {item.priceUsd.toLocaleString("pt-br", { style: "currency", currency: "USD" })}
                </td>
                <td className={styles.tdLabel} data-label="Volume">
                  {item.volumeUsd24Hr.toLocaleString("pt-br", { style: "currency", currency: "USD", notation: "compact" })}
                </td>
                <td className={item.changePercent24Hr > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança (24 h)">
                  <span>{item.changePercent24Hr.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className={styles.buttonMore} onClick={handleGetMore}>
        Mais itens
      </button>
    </main>
  );
}

export default Home;
