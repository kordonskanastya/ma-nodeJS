function formatPriceToNumber(price) {
  return price.replace('$', '').replace(',', '.');
}

module.exports = {formatPriceToNumber};
