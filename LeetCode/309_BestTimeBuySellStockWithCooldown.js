// Say you have an array for which the ith element is the price of a given 
// stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many 
// transactions as you like (ie, buy one and sell one share of the stock 
// multiple times) with the following restrictions:

// You may not engage in multiple transactions at the same time 
// (ie, you must sell the stock before you buy again).
// After you sell your stock, you cannot buy stock on next day. 
// (ie, cooldown 1 day)


// I cheated and translated this C++ solution to JS and went crazy with reduce
// https://leetcode.com/discuss/87346/c-greedy-solution-o-n-time-%26-o-1-space
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  return prices.reduce(function(accum, price, index){
    // if this is one of the first three prices
    if (index < 3){
      // set the buy price to be the lowest of the first three prices
      accum.buy = Math.min(price, accum.buy)
    } else {
      // do we want to buy at this price? 
      // with the prevous(because cooldown) profit in mind
      // (because making a profit effectively lowers out buy price), 
      // compare buying at this price with the current buy price.
      // buy at lowest price
      accum.buy = Math.min(price - accum.prev_profit, accum.buy);
    }
    // assign the previous profit to the current profit
    accum.prev_profit = accum.profit;
    // if selling today means we make more money than if we sold yesterday
    accum.profit = Math.max(accum.profit, price - accum.buy);
    return accum;
  }, {
    buy: Infinity, // the price of the stock when we bought it
    profit: 0, // the profit we will make $$$$
    prev_profit: 0 // the previous profit
  }).profit;
};
// Example
// prices = [1, 2, 3, 0, 2]
// maxProfit = 3
// transactions = [buy, sell, cooldown, buy, sell]
console.assert(maxProfit([1, 2, 3, 0, 2]) === 3, 'expect [1, 2, 3, 0, 2] to have max profit 3');
console.assert(maxProfit([-1, 2, -2, -2, 2, 50, 20, 30, 60, 100, 30]) === 125, 'expect [-1, 2, -2, -2, 2, 50, 20, 30, 60, 100, 30] to have max profit 125');
