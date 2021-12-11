function jsonOptimizer(array) {
  const typeArray = [];
  const optimizedArr = [];

  // eslint-disable-next-line array-callback-return
  array.map(obj => {
    const { type } = obj;
    if(!typeArray.includes(type)) {
      typeArray.push(type);
      optimizedArr.push(obj);
    } else {
      const index = typeArray.indexOf(type);
      const repitableObj = optimizedArr[index];
      repitableObj.measureValue += obj.measureValue;
    }
  });

  return optimizedArr;
};

module.exports = jsonOptimizer;
