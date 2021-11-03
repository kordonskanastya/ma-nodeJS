const addKeyPrice = (data) => {
  const addStringPrice = (obj) => {
    const price = obj[Object.keys(obj)[3]]
        .replace(/,/gi, '.').slice(1)
      *
      obj[Object.keys(obj)[2]];
    obj.price = price;
    return obj;
  };
  return data.map(addStringPrice);
};


module.exports = addKeyPrice;
