interface Coin {
  id: string;
  rank: number;
  maxSupply: number;
  marketCapUsd: number;
  name: string;
  symbol: string;
  priceUsd: number;
  vwap24Hr: number;
  volumeUsd24Hr: number;
  explorer: string;
  supply: number;
  changePercent24Hr: number;
}

export default Coin;
