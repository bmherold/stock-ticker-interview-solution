import "./styles.css";
import StockTicker from "./ticker.js";

const app = document.getElementById("app");
const ticker = new StockTicker();
const stonks = {};
ticker.addListener(({ symbol, price: newPrice }) => {
  let stonk = stonks[symbol];
  let currentPrice = stonk ? stonk.price : 0;
  stonks[symbol] = {
    name: symbol,
    price: newPrice,
    change: currentPrice ? newPrice - currentPrice : 0
  };

  let displayStocks = document.createElement("ul");
  for (let [key, value] of Object.entries(stonks)) {
    // console.log(key, value);
    let li = document.createElement("li");
    let priceClass = "";
    if (value.change !== 0) {
      priceClass = value.change > 0 ? "up" : "down";
    }
    let changeSymbol = value.change > 0 ? "+" : "";
    li.setAttribute("class", `stonk ${priceClass}`);
    li.innerHTML = `
      <h4>${value.name}</h4> ${value.price} <span class="price">${changeSymbol}${value.change}</span>
    `;
    displayStocks.appendChild(li);
  }

  // console.log("Stonks", stonks);
  // console.log("Display", displayStocks);

  app.innerHTML = displayStocks.outerHTML;
});
