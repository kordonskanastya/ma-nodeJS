function jsonOptimizer(array) {
  const typeArray = [];
  const optimizedArr = [];

  // eslint-disable-next-line array-callback-return
  array.map(obj => {
    const { type } = obj;
    if(!typeArray.includes(type)) {
      typeArray.push(type);
      optimizedArr.push(obj);
      return;
    }
      const index = typeArray.indexOf(type);
      const repitableObj = optimizedArr[index];

      if (Object.hasOwn(repitableObj, 'measureValue')) {
        repitableObj.measureValue += obj.measureValue;
      } else {
        if (Object.hasOwn(repitableObj, 'weight')) {
          repitableObj.weight += obj.weight;
        }
        if (Object.hasOwn(repitableObj, 'quantity')) {
          repitableObj.quantity += obj.quantity;
        }
      }
  });

  return optimizedArr;
};

module.exports = jsonOptimizer;
