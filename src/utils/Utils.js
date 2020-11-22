const Utils = {
  containsCurrency: (currencies, currency) => {
    if (!currencies || currencies.length === 0 || !currency) {
      return false;
    }

    return currencies.filter((v) => v.code === currency.code).length > 0;
  },
};

export default Utils;
