import { stringify, parseUrl } from 'query-string';
import { limit } from '@/helpers/variables';
import moment from 'moment';

export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const classToggle = (el, ...cls) =>
  cls.map((cl) => el.classList.toggle(cl));

export const changeOffset = (page) => {
  return page * limit - limit;
};

export const parseUrlByLimitAndOffset = (apiUrl, page) => {
  const parsedUrl = parseUrl(apiUrl);
  const stringifiedParams = stringify({
    limit,
    offset: changeOffset(page),
    ...parsedUrl.query,
  });
  return `${parsedUrl.url}?${stringifiedParams}`;
};

export const defaultDateFormat = (value) => {
  return moment(value).format('DD.MM.YYYY');
};

export const strip = (number, precision = 3) => {
  return parseFloat(number).toPrecision(precision);
};

export const copyURL = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch ($e) {
    console.log('Cannot copy');
  }
};

export const roundUp = (value, fixed = 2) => {
  return Number(value) % 1 !== 0 ? Number(value).toFixed(fixed) : Number(value);
};
