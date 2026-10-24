import axios from 'axios';

const LOCAL_API = /^https?:\/\/(127\.0\.0\.1|localhost):8000/;

function fixConfig(config) {
  if (typeof config.url === 'string') {
    config.url = config.url.replace(LOCAL_API, '');
  }
  if (typeof config.baseURL === 'string') {
    config.baseURL = config.baseURL.replace(LOCAL_API, '');
  }
  return config;
}

if (import.meta.env.PROD) {

  axios.interceptors.request.use(fixConfig);

  const originalCreate = axios.create.bind(axios);
  axios.create = (config = {}) => {
    const instance = originalCreate(config);
    instance.interceptors.request.use(fixConfig);
    return instance;
  };
}