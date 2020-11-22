import EventBus from '@/event-bus';

const BASE_URL = 'http://api.nbp.pl/api/exchangerates';

const NBPService = {
  getCurrencies: (table) => fetch(`${BASE_URL}/tables/${table}`)
    .then((res) => res.json())
    .catch(() => {
      EventBus.$emit('showError');
    }),
};

export default NBPService;
