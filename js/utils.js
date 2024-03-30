function round(value) {
  return Math.round(value * 100) / 100;
}

/**
 * @typedef {import('./types').StationFuelInfo} StationFuelInfo
 * 
 * @param {number} stationPrice
 * @param {number} mostExpensivePrice
 */
export function computeExtraMilesStats(stationPrice, mostExpensivePrice) {
  const most_expensive_tank_cost = 60 * mostExpensivePrice;

  const price_per_litre = stationPrice;
  const tank_cost = 60 * price_per_litre;
  const savings_per_tank = most_expensive_tank_cost - tank_cost;
  const distance = (savings_per_tank / price_per_litre / 4.546) * 42;
  const fifty_pound_distance = (50 / price_per_litre / 4.546) * 42;

  return {
    sixty_litre_tank_cost: round(tank_cost, 2),
    savings_per_tank: round(savings_per_tank, 2),
    distance: round(distance, 2),
    fifty_pound_distance: round(fifty_pound_distance, 0),
  }
}