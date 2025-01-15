import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.github.com/search/repositories?q=javascript&sort=stars&order=desc&page=1',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});
