const axios = require("axios");
const { convertDate, float } = require("../utils/timeUtils");

class criptoApi {
  constructor(coin = undefined) {
    this._endpoint =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
    this._coin = "WOOF";
    this.coinData = "WOOF";
  }

  get endpoint() {
    return this._endpoint;
  }

  get coin() {
    return this._coin.toLowerCase();
  }

  set coin(newCoin) {
    this._coin = newCoin;
  }

  async getCoinData() {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list",
      {
        cache: {
          maxAge: 2 * 60 * 500,
        },
      }
    );
    return data.filter((filterCoin) => filterCoin.symbol === this.coin);
  }

  async requestTickerCoin() {
    try {
      const coinData = await this.getCoinData();
      this.coinData = coinData[0];
      const response = await axios.get(this.endpoint + this.coinData.id);
      return response.data;
    } catch (err) {
      console.log(err);

      return err;
    }
  }

  async renderCoin() {
    const data = await this.requestTickerCoin();
    let date = convertDate();
    const { high_24h, low_24h, market_cap, current_price, price_change_percentage_24h} = data[0];

    let textOperation = `
$WOOF | ${this.coinData.name} | ${date}\n
💰WOOF PRICE: <b>$${float(current_price)}/${float(price_change_percentage_24h.toFixed(2))}%</b>
📉Highest value in 24h: <b>${
      high_24h ? `U$${float(high_24h)}` : "Not defined, try again later"
    }</b>
📈Lowest price in 24h : <b>${
      low_24h ? `U$${float(low_24h)}` : "Not defined,  try again later"
    }</b>







`;

    return textOperation;
  }
}

module.exports = criptoApi;
