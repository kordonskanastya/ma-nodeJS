function jsonOptimizer(array) {
  const optimizedArr = [];

  array.forEach(obj => {
    let flag = true;
    if (optimizedArr.length === 0) {
      optimizedArr.push(obj);
      return;
    }
    const priceObj = obj.priceValue;
    optimizedArr.forEach((optimizedElem) => {
      const priceOptimizedElem = optimizedElem.priceValue;
      if (optimizedElem.type === obj.type && priceObj === priceOptimizedElem) {
          // eslint-disable-next-line no-param-reassign
          optimizedElem.measureValue += Number(obj.measureValue);
          flag = false;
      }
    });
    if (flag) {
      optimizedArr.push(obj);
    }
  });

  return optimizedArr;
};

module.exports = jsonOptimizer;
