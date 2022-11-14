import axios from '@/network/axios';

const getCurrencyList = () => {
  return axios.get('/exchanger/currency/');
};

const getPairs = () => {
  return axios.get('/exchanger/pairs/');
};

const getPair = (id) => {
  return axios.get(`/exchanger/pairs/${id}/`);
};

const preCalculate = (params) => {
  return axios.get('/exchanger/pre_calculate/', {
    params,
  });
};

const transactionCryptoToFiat = (data) => {
  return axios.post('/exchanger/transaction_crypto_to_fiat_create/', data);
};

const transactionFiatToCrypto = (data) => {
  return axios.post('/exchanger/transaction_fiat_to_crypto_create/', data);
};

export default {
  getCurrencyList,
  getPairs,
  getPair,
  preCalculate,
  transactionCryptoToFiat,
  transactionFiatToCrypto,
};
