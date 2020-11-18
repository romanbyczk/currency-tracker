const NBPService = {
  getCurrencies: () => fetch('http://api.nbp.pl/api/exchangerates/tables/A')
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    }),

  getCurrencyDetails: (code) => fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${code}/today/`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    }),
};

export default NBPService;
