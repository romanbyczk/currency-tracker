const BASE_URL = 'http://api.nbp.pl/api/exchangerates';

const NBPService = {
  getCurrencies: (table) => fetch(`${BASE_URL}/tables/${table}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    }),

  getCurrencyDetails: (code) => fetch(`${BASE_URL}/rates/A/${code}/today/`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    }),
};

export default NBPService;
