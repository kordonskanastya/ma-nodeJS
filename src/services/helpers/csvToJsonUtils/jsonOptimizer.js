function jsonOptimizer(array) {
  const optimizedArr = [];

  array.forEach(obj => {
    let flag = true;
    if (optimizedArr.length === 0) {
      optimizedArr.push(obj);
      return;
    }
    const priceObj = obj.pricePerKilo || obj.pricePerItem;
    optimizedArr.forEach((optimizedElem) => {
      const priceOptimizedElem = optimizedElem.pricePerKilo
        ||
        optimizedElem.pricePerItem;
      if (optimizedElem.type === obj.type && priceObj === priceOptimizedElem) {
        if (optimizedElem.weight !== undefined) {
          // eslint-disable-next-line no-param-reassign
          optimizedElem.weight += (obj.weight);
          flag = false;
        }
        if (optimizedElem.quantity !== undefined) {
          // eslint-disable-next-line no-param-reassign
          optimizedElem.quantity += obj.quantity;
          flag = false;
        }
      }
    });
    if (flag) {
      optimizedArr.push(obj);
    }
  });

  return optimizedArr;
};

module.exports = jsonOptimizer;
