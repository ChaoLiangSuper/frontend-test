import axios from 'axios';
import { apiToken, apiUrl, cardsPerPage } from '../config';

const apiInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    apiToken,
  },
});

export const fetchPage = (page: number) =>
  apiInstance.get('/tickets', {
    params: {
      page: page - 1,
      perPage: cardsPerPage,
      sortDirection: 'DESC',
      ticketType: 'incident',
    },
  });
